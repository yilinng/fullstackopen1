const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')
const { GraphQLError } = require('graphql')
const { ObjectId } = require('mongodb')
const { PubSub } = require('graphql-subscriptions')
const jwt = require('jsonwebtoken')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let books = await Book.find().populate('author')

      if ('author' in args && 'genres' in args) {
        return books.filter(
          (book) =>
            book.author.name === args.author &&
            book.genres.some((genre) => args.genres.includes(genre))
        )
      }

      if ('author' in args || 'genres' in args) {
        //  console.log('allbook args root', root, args)

        return books.filter(
          (book) =>
            book.author.name === args.author ||
            book.genres.includes(args.genres)
        )
      }
      return books
    },
    findBooks: async (root, args) => {
      let books = await Book.find().populate('author')

      if ('author' in args && 'genres' in args) {
        return books.filter(
          (book) =>
            book.author.name === args.author &&
            book.genres.some((genre) => args.genres.includes(genre))
        )
      }

      if ('author' in args || 'genres' in args) {
        //  console.log('allbook args root', root, args)

        return books.filter(
          (book) =>
            book.author.name === args.author ||
            book.genres.includes(args.genres)
        )
      }
      return books
    },
    /*
      books.filter((p) => {
        if ('author' in args || 'genres' in args) {
          return p.author.name === args.author || p.genres.includes(args.genres)
        }
        return p
      })*/
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Author: {
    name: (root) => root.name,
    id: (root) => root.id,
    born: (root) => root.born,
    bookCount: async (root) => {
      // console.log('root', root)
      let count = 0
      const books = await Book.find({})
      //http://mongodb.github.io/node-mongodb-native/api-bson-generated/objectid.html#equals
      books.map((book) => {
        // console.log('book.author == root._id', book.author.equals(root._id))
        if (book.author.equals(root._id)) {
          count = count + 1
        }
      })

      return count
    },
  },
  //https://www.apollographql.com/docs/apollo-server/data/resolvers/
  //https://stackoverflow.com/questions/7713363/mongodb-select-where-in-array-of-id
  //https://github.com/dotansimha/graphql-code-generator/issues/6830
  User: {
    favoriteBook: async (root) => {
      // console.log('favoriteBook', root)
      const books = await Book.find({
        _id: {
          $in: root.favoriteBook,
        },
      }).populate('author')
      return books
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      //  console.log('args addBook', args)
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      let book = { ...args }
      try {
        const findAuthor = await Author.findOne({ name: book.author })
        //  console.log('addBook findAuthor', findAuthor)
        if (!findAuthor) {
          let author = new Author({ name: book.author, born: null })
          //   console.log('init new author !findAuthor', author)
          await author.save()
          //   console.log('new author !findAuthor', author)
          book = new Book({ ...book, author })
          //   console.log('new book !findAuthor', book)
        } else {
          book = new Book({ ...book, author: findAuthor })
          //  console.log('new book ', book)
        }
        await book.save()

        currentUser.favoriteGenre = currentUser.favoriteGenre.concat(book)
        await currentUser.save()
      } catch (error) {
        console.log('save book fail', error)
        throw new GraphQLError(error, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },
    editAuthor: async (root, args) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo
      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError('Editing Author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })

      return user.save().catch((error) => {
        throw new GraphQLError(error, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error,
          },
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
    addBookToFavorite: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const book = await Book.findById(args.id)

      //  console.log('add book', book)

      if (!book) {
        throw new GraphQLError('wrong book id', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      try {
        currentUser.favoriteBook = currentUser.favoriteBook.concat(book)
        await currentUser.save()
      } catch (error) {
        throw new GraphQLError(error, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.id,
            error,
          },
        })
      }
      return currentUser
    },
    removeBookFromFavorite: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const book = await Book.findById(args.id)

      console.log('add book', book.id.toString())

      if (!book) {
        throw new GraphQLError('wrong book id', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      console.log(
        ' currentUser.favoriteBook',
        currentUser.favoriteBook[0].toString() === args.id
      )

      try {
        const filtered = currentUser.favoriteBook.filter(
          (item) => item.toString() !== args.id
        )
        console.log('filtered', filtered)
        currentUser.favoriteBook = filtered
        await currentUser.save()
      } catch (error) {
        throw new GraphQLError(error, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.id,
            error,
          },
        })
      }
      return currentUser
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
}

module.exports = resolvers

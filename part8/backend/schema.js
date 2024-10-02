const typeDefs = `
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount:Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: [String!]
    favoriteBook: [Book!]!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Subscription {
    bookAdded: Book!
  } 


  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genres: String): [Book!]!
    findBooks(author: String, genres: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres:[String!]!
    ): Book!

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: [String!]
    ): User

    login(
      username: String!
      password: String!
    ): Token

    addBookToFavorite(
      id: String!
    ): User

    removeBookFromFavorite(
      id: String!
    ): User
  }
`
module.exports = typeDefs

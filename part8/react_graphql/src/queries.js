import { gql } from '@apollo/client'

const Book_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    genres
    id
    author {
      name
      id
      born
      bookCount
    }
  }
`

export const ALL_RESULTS = gql`
  query {
    allAuthors {
      name
      id
      born
      bookCount
    }

    allBooks {
      title
      published
      genres
      id
      author {
        name
        id
        born
        bookCount
      }
    }
  }
`

export const ADD_BOOK = gql`
  mutation createBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      published
      author {
        name
        id
        born
        bookCount
      }
      genres
    }
  }
`
export const FIND_BOOK = gql`
  query findBookByGenresOrAuthor($author: String, $genres: String) {
    findBooks(author: $author, genres: $genres) {
      title
      published
      genres
      id
      author {
        name
        id
        born
        bookCount
      }
    }
  }
`

export const UPDATE_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
    }
  }
`

export const ADD_BOOK_TO_FAVORITE = gql`
  mutation addBookToFavorite($id: String!) {
    addBookToFavorite(id: $id) {
      username
      favoriteGenre
      favoriteBook {
        title
        published
        genres
        id
        author {
          name
          id
          born
          bookCount
        }
      }
    }
  }
`

export const REMOVE_BOOK_FROM_FAVORITE = gql`
  mutation removeBookFromFavorite($id: String!) {
    removeBookFromFavorite(id: $id) {
      username
      favoriteGenre
      favoriteBook {
        title
        published
        genres
        id
        author {
          name
          id
          born
          bookCount
        }
      }
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const USER = gql`
  query {
    me {
      username
      favoriteGenre
      favoriteBook {
        title
        published
        genres
        id
        author {
          name
          id
          born
          bookCount
        }
      }
    }
  }
`
export const BOOK_ADD = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${Book_DETAILS}
`

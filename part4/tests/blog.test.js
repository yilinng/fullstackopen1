const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = [
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    },
  ]

  const result = listHelper.dummy(blogs)
  expect(result.length).toEqual(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toEqual(5)
  })
})

describe('favorite blogs', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    },
  ]

  test('when list is not epmty, equals the most likes of that', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)

    listHelper.mostBlogs(listWithOneBlog)
    listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual([listWithOneBlog[1]])
  })
})

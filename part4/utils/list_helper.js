const dummy = (blogs) => {
  return blogs
}

const totalLikes = (blogs) => {
  let total = 0
  blogs.map((blog) => (total += blog.likes))
  console.log('total', total)
  return total
}

const favoriteBlog = (blogs) => {
  let arr = []
  if (blogs.length < 1) return arr

  let mostLikeBlog = blogs[0]

  blogs.map((blog) => {
    if (mostLikeBlog.likes < blog.likes) {
      mostLikeBlog = blog
    }
  })

  blogs.map((blog) => {
    if (mostLikeBlog.likes === blog.likes) {
      arr.push(blog)
    }
  })

  return arr
}

const mostBlogs = (blogs) => {
  const obj = {}
  blogs.map((blog) => {
    if (blog.author in obj) {
      obj[blog.author] += 1
    } else {
      obj[blog.author] = 1
    }
  })

  let mostB = {}

  for (const item in obj) {
    if (isEmpty(mostB)) {
      mostB = {
        author: item,
        blogs: obj[item],
      }
    }

    if (mostB['blogs'] < obj[item]) {
      mostB = {
        author: item,
        blogs: obj[item],
      }
    }
  }

  //console.log('obj', obj)
  //console.log('mostB', mostB)

  return mostB
}

const mostLikes = (blogs) => {
  const obj = {}
  blogs.map((blog) => {
    if (blog.author in obj) {
      obj[blog.author] += blog.likes
    } else {
      obj[blog.author] = blog.likes
    }
  })

  let mostB = {}

  for (const item in obj) {
    if (isEmpty(mostB)) {
      mostB = {
        author: item,
        likes: obj[item],
      }
    }

    if (mostB['likes'] < obj[item]) {
      mostB = {
        author: item,
        likes: obj[item],
      }
    }
  }

  // console.log('obj', obj)
  // console.log('mostB', mostB)

  return mostB
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}

const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((total, blog) => total + blog.likes, 0)

const favoriteBlog = (blogs) => blogs.reduce((favBlog, blog) => (favBlog.likes > blog.likes ? favBlog : blog), { likes: 0 })

const mostBlogs = (blogs) => {
  const temps = blogs.reduce((tempAns, blog) => {
    const index = tempAns.findIndex((result) => result.author === blog.author)
    if (index === -1) {
      tempAns.push({
        author: blog.author,
        blogs: 1,
      })
    }
    else {
      tempAns[index].blogs = tempAns[index].blogs + 1
    }
    return tempAns
  }, [])

  return temps.reduce((ans, temp) => (ans.blogs > temp.blogs ? ans : temp), { blogs: 0 })
}

const mostLikes = (blogs) => {
  const temps = blogs.reduce((tempAns, blog) => {
    const index = tempAns.findIndex((result) => result.author === blog.author)
    if (index === -1) {
      tempAns.push({
        author: blog.author,
        likes: blog.likes,
      })
    }
    else {
      tempAns[index].likes = tempAns[index].likes + blog.likes
    }
    return tempAns
  }, [])

  return temps.reduce((ans, temp) => (ans.likes > temp.likes ? ans : temp), { likes: 0 })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}

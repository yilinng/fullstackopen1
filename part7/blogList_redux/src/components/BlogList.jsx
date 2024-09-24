import React from 'react'
import Blog from './Blog'
import { useSelector, useDispatch } from 'react-redux'
import {
    setSuccessNotification,
    setFailsNotification,
} from '../reducers/notificationReducer'

import { deleteAction, updateBlog } from '../reducers/blogReducer'

export default function BlogList() {
    const dispatch = useDispatch()
    const blogs = useSelector((state) => state.blogs)

    const handleUpdate = async (id, blogObject) => {
        try {
            console.log('handleUpdate')
            dispatch(updateBlog(id, blogObject))

            /*
            let updateBlog = await blogService.update(id, blogObject)

            console.log('updateblog', updateBlog)
            //update blogs
            let updatedBlogs = blogs.map((blog) => {
                if (blog.id === id) {
                    return updateBlog
                } else {
                    return blog
                }
            })
              */
            // setBlogs(sortBlogs(updatedBlogs))

            dispatch(
                setSuccessNotification(
                    `a blog ${blogObject.title} by ${blogObject.author} updated`,
                    100,
                ),
            )
        } catch (exception) {
            console.log('expection', exception)
            dispatch(setFailsNotification(exception.response.data.error, 100))
            // setErrorMessage(exception.response.data.error)
        }
    }

    const handleDelete = async (blog) => {
        if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            try {
                console.log('handleDelete')

                dispatch(deleteAction(blog.id))

                //    await blogService.deleteItem(blog.id)

                //    let filteredBlogs = blogs.filter((item) => item.id !== blog.id)

                //  setBlogs(sortBlogs(filteredBlogs))

                //setMessage(`a blog ${blog.title} by ${blog.author} is deleted`)
                dispatch(
                    setSuccessNotification(
                        `a blog ${blog.title} by ${blog.author} is deleted`,
                        100,
                    ),
                )
            } catch (exception) {
                console.log('expection', exception)
                dispatch(
                    setFailsNotification(exception.response.data.error, 100),
                )
                // setErrorMessage(exception.response.data.error)
            }
        }
    }

    return (
        <div>
            {blogs.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    updateBlog={handleUpdate}
                    deleteItem={handleDelete}
                />
            ))}
        </div>
    )
}

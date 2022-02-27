import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import usersService from '../services/users'

const User = () => {
  const [user, setUser] = useState(null)

  const id = useParams().id

  useEffect(() => {
    const getUser = async () => {
      const allUsers = await usersService.getAll()
      setUser(allUsers.reduce((result, current) => current.id === id ? current : result), null)
    }
    getUser()
  }, [])

  return (
    <div>
      <h1>users</h1>
      {user &&
        <div>
          <h2>{user.name}</h2>
          <h5>added blogs</h5>
          {user.blogs.length > 0
            ?
              <ul>
                {user.blogs.map(blog => 
                  <li key={blog.id}>{blog.title}</li>
                )}
              </ul>
            :
              <p>no blogs added yet</p>
          }
        </div>
      }
    </div>
  )
}

export default User

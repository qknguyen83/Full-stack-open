import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import usersService from '../services/users'
import { Table } from 'react-bootstrap'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      setUsers(await usersService.getAll())
    }
    getUsers()
  }, [])

  return (
    <div>
      <h1>users</h1>
      <Table>
        <thead>
          <tr>
            <th>author</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <tr key={user.username}>
                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default Users

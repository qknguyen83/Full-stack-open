import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const UpdateForm = ({ show, authors }) => {
  const [name, setName] = useState(authors[0].name || '')
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR)

  const submit = (event) => {
    event.preventDefault()

    editAuthor({ variables: { name: name, setBornTo: born } })

    setName('')
    setBorn('')
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <select onChange={({ target }) => setName(target.value)}>
          {authors.map((a, id) =>
            <option key={id} value={a.name}>{a.name}</option>
          )}
        </select> <br/>
        born <input value={born} type='number' onChange={({ target }) => setBorn(parseInt(target.value))}/> <br/>
        <button>update author</button>
      </form>
    </div>
  )
}

const Authors = (props) => {
  const response = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })

  if (!props.show || response.loading) {
    return null
  }

  const authors = response.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <UpdateForm show={props.updateForm} authors={authors}/>
    </div>
  )
}

export default Authors

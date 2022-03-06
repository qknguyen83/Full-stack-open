import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from '../queries'

const Books = (props) => {
  const [filter, setFilter] = useState('all genres')

  const stResponse = useQuery(ALL_BOOKS, {
    variables: filter !== 'all genres' ? { genre: filter } : null,
    pollInterval: 2000
  })

  const ndResponse = useQuery(ALL_GENRES, {
    pollInterval: 2000
  })

  if (!props.show || stResponse.loading || ndResponse.loading) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {stResponse.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {[...ndResponse.data.allGenres].map(genre =>
        <button key={genre} onClick={() => setFilter(genre)}>{genre}</button>
      )}
    </div>
  )
}

export default Books

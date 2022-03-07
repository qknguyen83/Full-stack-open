import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ABOUT_ME } from '../queries'

const Recommend = ({ show }) => {
  const stResponse = useQuery(ABOUT_ME)

  const ndResponse = useQuery(ALL_BOOKS, {
    variables: stResponse.data ? { genre: stResponse.data.me.favoriteGenre } : null,
    pollInterval: 2000
  })

  if (!show || stResponse.loading || ndResponse.loading) {
    return null
  }

  return (
    <div>
      <p>books in your favorite genre <b>{stResponse.data.me.favoriteGenre}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {ndResponse.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend

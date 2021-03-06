import { useState, useEffect } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { BOOK_ADDED } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')

  const client = useApolloClient()

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      setToken(savedToken)
    }
  }, [])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const newBook = subscriptionData.data.bookAdded
      window.alert(`${newBook.title} added`)
    }
  })

  const handleLogout = () => {
    setToken(null)
    localStorage.removeItem('token')
    client.clearStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token
          ?
            <>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => setPage('recommend')}>recommend</button>
              <button onClick={handleLogout}>logout</button>
            </>
          :
            <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Authors show={page === 'authors'} updateForm={token ? true : false}/>

      <Books show={page === 'books'}/>

      <NewBook show={page === 'add'}/>

      <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage}/>

      {token && <Recommend show={page ==='recommend'}/>}
    </div>
  )
}

export default App

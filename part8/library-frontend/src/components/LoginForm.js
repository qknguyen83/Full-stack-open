import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN)

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('token', token)
      setPage('authors')
    }
  }, [result.data]) //eslint-disable-line

  const submit = (event) => {
    event.preventDefault()

    login({ variables: { username, password } })

    setUsername('')
    setPassword('')
  }

  if (!show) {
    return null
  }

  return (
    <form onSubmit={submit}>
      username <input value={username} onChange={({ target }) => setUsername(target.value)}></input> <br/>
      password <input value={password} onChange={({ target }) => setPassword(target.value)}></input> <br/>
      <button>login</button>
    </form>
  )
}

export default LoginForm

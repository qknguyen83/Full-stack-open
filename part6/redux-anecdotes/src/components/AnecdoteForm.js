import { useDispatch } from "react-redux"
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createHandler = async (event) => {
    event.preventDefault()

    dispatch(createAnecdote(event.target.anecdote.value))

    dispatch(setNotification(`you created '${event.target.anecdote.value}'`, 5))

    event.target.anecdote.value = null
  }

  return (
    <div>
      <form onSubmit={createHandler}>
        <input name='anecdote'/>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

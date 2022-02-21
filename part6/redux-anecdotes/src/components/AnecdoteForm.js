import { connect } from "react-redux"
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const createHandler = async (event) => {
    event.preventDefault()

    props.createAnecdote(event.target.anecdote.value)

    props.setNotification(`you created '${event.target.anecdote.value}'`, 5)

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

const mapDispatchToProps = {
  createAnecdote,
  setNotification
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)

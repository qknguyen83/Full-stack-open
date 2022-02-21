import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload

      return state.map(anecdote => {
        if (anecdote.id === id) {
          return { ...anecdote, votes: anecdote.votes + 1 }
        }
        return anecdote
      }).sort((a, b) => (a.votes <= b.votes) ? 1 : -1)
    },
    create(state, action) {
      const newAnecdote = action.payload
      return state.concat(newAnecdote).sort((a, b) => (a.votes <= b.votes) ? 1 : -1)
    },
    setAnecdotes(state, action) {
      return action.payload.sort((a, b) => (a.votes <= b.votes) ? 1 : -1)
    }
  }
})

export const { vote, create, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(create(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.updateVotes(anecdote)
    dispatch(vote(updatedAnecdote.id))
  }
}

export default anecdoteSlice.reducer

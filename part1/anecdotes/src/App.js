import React, { useState } from 'react'

const Content = ({heading, anecdote, counter}) => {
  return (
    <>
      <h1>{heading}</h1>
      <p>
        {anecdote}<br/>
        has {counter} votes
      </p>
    </>
  )
}

const Button = ({text, handler}) => {
  return (
    <>
      <button onClick={handler}>
        {text}
      </button>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [counter, setCounter] = useState(new Uint8Array(anecdotes.length))

  const handleCounter = () => {
    const newCounter = [...counter]
    newCounter[selected] += 1
    setCounter(newCounter)
  }

  const handleSelected = () => {
    let newSelected = Math.floor(Math.random() * anecdotes.length)
    while (newSelected === selected) {
      newSelected = Math.floor(Math.random() * anecdotes.length)
    }
    setSelected(newSelected)
  }

  let maxIndex = 0
  for(let i = 0; i < anecdotes.length; i++) {
    if (counter[maxIndex] < counter[i]) {
      maxIndex = i
    }
  }

  return (
    <div>
      <Content heading='Anecdote of the day' anecdote={anecdotes[selected]} counter={counter[selected]}/>
      <p>
        <Button text='vote' handler={handleCounter}/>
        <Button text='next anecdote' handler={handleSelected}/>
      </p>
      <Content heading='Anecdote with most votes' anecdote={anecdotes[maxIndex]} counter={counter[maxIndex]}/>
    </div>
  )
}

export default App
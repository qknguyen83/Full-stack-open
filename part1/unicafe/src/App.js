import React, { useState } from 'react'

const StatisticLine = ({text, value}) => {
  if (text === 'positive') {
    return (
      <>
        <td>{text}</td>
        <td>{value} %</td>
      </>
    )
  }
  else {
    return (
      <>
        <td>{text}</td>
        <td>{value}</td>
      </>
    )
  }
}

const Statistics = ({good, neutral, bad}) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <>
        No feedback given
      </>
    )
  }
  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <tr><StatisticLine text='good' value={good}/></tr>
          <tr><StatisticLine text='neutral' value={neutral}/></tr>
          <tr><StatisticLine text='bad' value={bad}/></tr>
          <tr><StatisticLine text='all' value={good + neutral + bad}/></tr>
          <tr><StatisticLine text='average' value={((good - bad) / (good + neutral + bad)).toFixed(1)}/></tr>
          <tr><StatisticLine text='positive' value={(100 * good / (good + neutral + bad)).toFixed(1)}/></tr>
        </tbody>
      </table>
    </>
  )
}

const Button = ({text, set}) => {
  return (
    <>
      <button onClick={set}>
        {text}
      </button>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <p>
        <Button text='good' set={() => setGood(good+1)}/>
        <Button text='neutral' set={() => setNeutral(neutral+1)}/>
        <Button text='bad' set={() => setBad(bad+1)}/>
      </p>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
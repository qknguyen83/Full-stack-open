import { useDispatch } from 'react-redux'

const GiveFeedback = () => {
  const dispatch = useDispatch()

  const handleGood = () => {
    console.log('Good')
    dispatch({ type: 'GOOD' })
  }

  const handleNeutral = () => {
    console.log('ok')
    dispatch({ type: 'OK' })
  }

  const handleBad = () => {
    console.log('Bad')
    dispatch({ type: 'BAD' })
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>ok</button>
      <button onClick={handleBad}>bad</button>
    </div>
  )
}

export default GiveFeedback

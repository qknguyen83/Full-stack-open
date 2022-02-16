import { useSelector } from "react-redux"

const Statistics = () => {
  const {good, ok, bad} = useSelector(state => state)
  
  return (
    <div>
      <h1>statistics</h1>
        <table>
          <tbody>
            <tr>
              <td>good</td>
              <td>{good}</td>
            </tr>
            <tr>
              <td>ok</td>
              <td>{ok}</td>
            </tr>
            <tr>
              <td>bad</td>
              <td>{bad}</td>
            </tr>
            <tr>
              <td>all</td>
              <td>{good + ok + bad}</td>
            </tr>
            <tr>
              <td>average</td>
              <td>{((good - bad) / (good + ok + bad)).toFixed(1)}</td>
            </tr>
            <tr>
              <td>positive</td>
              <td>{(100 * good / (good + ok + bad)).toFixed(1)}</td>
            </tr>
          </tbody>
        </table>
    </div>
  )
}

export default Statistics

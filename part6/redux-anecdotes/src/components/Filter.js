import { useDispatch } from 'react-redux'
import { set } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleFilter = (event) => {
    dispatch(set(event.target.value))
  }
  
  return (
    <div>
      filter <input onChange={handleFilter}/>
    </div>
  )
}

export default Filter

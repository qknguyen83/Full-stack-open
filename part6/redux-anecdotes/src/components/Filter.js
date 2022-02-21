import { connect } from 'react-redux'
import { set } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleFilter = (event) => {
    props.set(event.target.value)
  }
  
  return (
    <div>
      filter <input onChange={handleFilter}/>
    </div>
  )
}

const mapDispatchToProps = {
  set
}

export default connect(
  null,
  mapDispatchToProps
)(Filter)

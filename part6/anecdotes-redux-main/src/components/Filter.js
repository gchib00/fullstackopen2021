import React from 'react'
import { connect } from 'react-redux'
import { addToFilter } from '../reducers/filterReducer'


const Filter = (props) => {
  const handleChange = (event) => {
    props.addToFilter(event.target.value)
  }
  const style = {
    margin: 10
  }
  return (
    <div style={style}>
      filter <input onChange={(handleChange)} />
    </div>
  )
}

const mapDispatchToProps = {
  addToFilter
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)

export default ConnectedFilter
import React, { PropTypes } from 'react'

const Importance = ({ importance, value, id, selectImportance }) => (
  <label htmlFor={`${value}-${id}`}>{value}
    <input
      onChange={(e) => selectImportance(id, { importance: value })}
      checked={importance === value}
      type='radio'
      name={value}
      id={`${value}-${id}`}
      value={value} />
  </label>
)

Importance.propTypes = {
  value: PropTypes.string,
  id: PropTypes.number,
  selectImportance: PropTypes.func,
  importance: PropTypes.string
}
export default Importance

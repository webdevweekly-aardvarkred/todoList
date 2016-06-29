import React, { PropTypes } from 'react'
import { withRouter } from 'react-router'

const Importance = ({ router, importance, value, id, selectImportance, unauth }) => (
  <label htmlFor={`${value}-${id}`}>{value}
    <input
      onChange={(e) => {
        selectImportance(id, { importance: value })
          .catch((err) => {
            unauth(err, router.replace)
          })
      }}
      checked={importance === value}
      type='radio'
      name={`${value}-${id}`}
      id={`${value}-${id}`}
      value={value} />
  </label>
)

Importance.propTypes = {
  value: PropTypes.string,
  id: PropTypes.number,
  selectImportance: PropTypes.func,
  importance: PropTypes.string,
  router: PropTypes.object,
  unauth: PropTypes.func
}
export default withRouter(Importance)

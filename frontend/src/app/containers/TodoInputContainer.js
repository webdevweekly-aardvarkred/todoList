import { connect } from 'react-redux'
import { ATTEMPT_ADD } from '../actions'
import TodoInput from '../components/TodoInput'

export default connect(
  null,
  { ATTEMPT_ADD }
)(TodoInput)

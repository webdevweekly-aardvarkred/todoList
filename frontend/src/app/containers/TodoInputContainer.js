import { connect } from 'react-redux'
import { ATTEMPT_ADD } from '../actions'
import TodoInput from '../components/TodoInput'

const mapStateToProps = (state) => ({
  todos: state.todos
})

export default connect(
  mapStateToProps,
  { ATTEMPT_ADD }
)(TodoInput)

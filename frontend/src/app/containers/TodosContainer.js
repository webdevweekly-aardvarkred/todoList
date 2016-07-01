import { connect } from 'react-redux'
import Todos from '../components/Todos'
import { ATTEMPT_EDIT_TASK, ATTEMPT_DELETE, ATTEMPT_TOGGLE, ATTEMPT_SELECT_IMPORTANCE } from '../actions'

const mapStateToProps = ({ todos }) => {
  return {
    todos
  }
}

export default connect(
  mapStateToProps,
  { ATTEMPT_EDIT_TASK, ATTEMPT_DELETE, ATTEMPT_TOGGLE, ATTEMPT_SELECT_IMPORTANCE }
)(Todos)

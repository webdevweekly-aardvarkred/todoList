import { connect } from 'react-redux'
import Todos from '../components/Todos'
import { ATTEMPT_DELETE } from '../actions'

const mapStateToProps = ({ todos }) => ({
  todos
})

export default connect(
  mapStateToProps,
  { ATTEMPT_DELETE }
)(Todos)

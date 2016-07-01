import { connect } from 'react-redux'
import { ATTEMPT_FETCH } from '../actions'
import Home from '../components/Home'

export default connect(
  null,
  { ATTEMPT_FETCH }
)(Home)

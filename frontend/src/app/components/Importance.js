import React, { PropTypes, Component } from 'react'
import { withRouter } from 'react-router'

class Importance extends Component {
  constructor (props) {
    super(props)
    this.props = props

    this.state = {
      checked: false
    }
  }

  componentWillMount () {
    this.setState({
      checked: this.props.selected
    })
  }

  componentWillReceiveProps (nextProps) {
    setTimeout(() => {
      this.setState({
        checked: nextProps.selected
      })
    })
  }

  render () {
    const { selected, value, id, onChange } = this.props
    return (
      <label htmlFor={`${value}-${id}`}>{value}
        <input
          onChange={(e) => {
            onChange(id, { importance: value })
          }}
          checked={this.state.checked}
          data-isChecked={selected}
          type='radio'
          name={id}
          id={`${value}-${id}`}
          value={value} />
      </label>
    )
  }
}

Importance.propTypes = {
  value: PropTypes.string,
  id: PropTypes.number,
  onChange: PropTypes.func,
  selected: PropTypes.bool,
  importance: PropTypes.string
}
export default withRouter(Importance)

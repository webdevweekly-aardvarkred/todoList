import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import validation from 'react-validation-mixin'
import strategy from 'joi-validation-strategy'
import Joi from 'joi'
import xss from 'xss'
import Auth from '../services/auth'

class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      networkErrors: []
    }

    this.validatorTypes = {
      username: Joi.string().min(5).max(12).alphanum().required().label('username'),
      password: Joi.string().min(6).max(30).required().label('password')
    }
    this.getValidatorData = this.validatorData.bind(this)
    this.errorMessages = this.errorMessages.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onRegister = this.onRegister.bind(this)
    this.clearErrors = this.clearErrors.bind(this)
  }

  validatorData () {
    return {
      username: xss(this.refs.username.value),
      password: xss(this.refs.password.value)
    }
  }

  clearErrors () {
    this.setState({
      networkErrors: []
    })

    return this
  }

  onSubmit (e) {
    e.preventDefault()

    this.clearErrors()
      .props.validate((error) => {
        if (!error) {
          Auth.login(this.validatorData())
            .then(() => {
              this.props.router.replace('/')
            })
            .catch((error) => {
              this.setState({
                networkErrors: [error.data.message]
              })
            })
        }
      })
  }

  onRegister (e) {
    this.clearErrors()
      .props.validate((error) => {
        if (!error) {
          Auth.register(this.validatorData())
            .then(() => {
              this.props.router.replace('/')
            })
            .catch((error) => {
              this.setState({
                networkErrors: [error.data.message]
              })
            })
        }
      })
  }

  errorMessages (field, error) {
    return (
      <ul className='errors'>{this.props.getValidationMessages(field)
        .map((error, i) => {
          return <li key={i}><span>{error}</span></li>
        })}
      </ul>
    )
  }

  render () {
    return (
      <section className='login'>
        <form onSubmit={this.onSubmit}>
          <input type='text' ref='username' placeholder='Username' id='username' />
          {this.errorMessages('username')}
          <input ref='password' placeholder='Password' id='password' type='password' />
          {this.errorMessages('password')}
          <button type='submit'>login</button>
          <button type='button' onClick={this.onRegister}>register</button>
          <ul className='errors'>{this.state.networkErrors.map((error, i) => {
            return <li key={i}><span>{error}</span></li>
          })}
          </ul>
        </form>
      </section>
    )
  }
}

Login.propTypes = {
  validate: PropTypes.func,
  handleValidation: PropTypes.func,
  getValidationMessages: PropTypes.func,
  withRouter: PropTypes.func
}

export default withRouter(validation(strategy)(Login))

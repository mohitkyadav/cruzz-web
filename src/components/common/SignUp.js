import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import { signUp } from '../../actions/authActions';

import '../../static/css/common.css';

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mailError: ''
    };
    this.handleMail = this.handleMail.bind(this);
  }

  handleMail(event) {
    const allowedDomain = 'iiitvadodara.ac.in'
    if(event.target.value.split('@')[1] !== allowedDomain) {
      this.setState({ mailError: 'Please use a @iiitvadodara.ac.in email'});
    } else {
      this.setState({ mailError: ''});
    }
  }

  signUp(event) {
    event.preventDefault();
    if (this.refs.password.value === this.refs.confirmPassword.value) {
      const user = {
        user: {
          "first_name": this.refs.first_name.value,
          "last_name": this.refs.last_name.value,
          "email": this.refs.email.value,
          "username": this.refs.username.value,
          "password": this.refs.password.value
        }
      }
      this.props.signUp(user, this.props.history);
    }
  }

  render() {
    return (
      <div data-uk-scrollspy="cls: uk-animation-slide-bottom-small; target: > div, > div > div > div > .uk-margin; delay: 100;">
          <div className="uk-container uk-align-center uk-padding uk-margin-remove-bottom">
            <div className="uk-card uk-width-1-2@m uk-align-center uk-card-default uk-box-shadow-hover-small uk-box-shadow-medium" data-uk-scrollspy="cls: uk-animation-slide-bottom-medium; target: > div; delay: 40; repeat: true">

              <div className="uk-card-header">
                <h2 className="uk-card-title uk-margin-remove-bottom">Sign Up</h2>
              </div>
              <div className="uk-card-body uk-padding-remove-bottom">
                <form className="uk-align-center" onSubmit={this.signUp.bind(this)}>
                  <div className="uk-margin">
                    <div className="uk-inline uk-width-1-1">
                      <span className=" uk-form-icon" uk-icon="icon: mail"></span>
                      <input className="uk-input" type="email" placeholder="Email" ref="email" onChange={ (e) => {this.handleMail(e)}} required={true}/>
                    </div>
                  </div>
                  <div className="uk-margin">
                    <div className="uk-inline uk-width-1-1">
                      <span className=" uk-form-icon" uk-icon="icon: user"></span>
                      <input className="uk-input" type="text" placeholder="Username" ref="username" required={true}/>
                    </div>

                    <div className="uk-margin uk-margin-auto">
                      <div className="uk-inline uk-width-1-1">
                        <span className="uk-form-icon" uk-icon="icon: user"></span>
                        <input className="uk-input" type="text" placeholder="First Name" ref="first_name" required={true}/>
                      </div>
                    </div>

                    <div className="uk-margin uk-margin-auto">
                      <div className="uk-inline uk-width-1-1">
                        <span className="uk-form-icon" uk-icon="icon: user"></span>
                        <input className="uk-input" type="text" placeholder="Last Name" ref="last_name" required={true}/>
                      </div>
                    </div>

                    <div className="uk-margin uk-margin-auto">
                      <div className="uk-inline uk-width-1-1">
                        <span className="uk-form-icon" uk-icon="icon: lock"></span>
                        <input className="uk-input" type="password" placeholder="Password" ref="password" required={true}/>
                      </div>
                    </div>
                    <div className="uk-inline uk-width-1-1">
                      <span className="uk-form-icon" uk-icon="icon: lock"></span>
                      <input className="uk-input" type="password" placeholder="Confirm Password" ref="confirmPassword" required={true}/>
                    </div>
                  </div>
                  {
                    this.props.auth.errors ? (
                      <div>
                        <div className="uk-text-danger uk-text-capitalize">
                          {
                            this.props.auth.errors.email
                          }
                        </div>
                        <div className="uk-text-danger uk-text-capitalize">
                          {
                            this.props.auth.errors.username
                          }
                        </div>
                      </div>
                    ): null
                  }
                  {
                    this.state.mailError !== '' ? (
                      <div className="uk-text-danger">
                        {
                          this.state.mailError
                        }
                      </div>
                    ): null
                  }
                  <p className="uk-margin">
                    {
                      this.state.mailError !== '' ? (
                        <button className="uk-button uk-button-danger uk-disabled uk-align-center uk-width-1-3@m uk-width-1-1" type="submit">Sign-up</button>
                      ): (
                        <button className="uk-button uk-button-primary uk-align-center uk-width-1-3@m uk-width-1-1" type="submit">Sign-up</button>
                      )
                    }
                  </p>
                </form>
            </div>
            <div className="uk-card-footer">
              <p className="uk-margin uk-margin-small-top">Already have an account, Click <Link to="/login">here</Link> to sign in.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { signUp })(SignUp);

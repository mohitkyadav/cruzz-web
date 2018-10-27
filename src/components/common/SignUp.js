import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import { signUp } from '../../actions/authActions';

import '../../static/css/common.css';

class SignUp extends Component {
  signUp(event) {
    event.preventDefault();
    if (this.refs.password.value === this.refs.confirmPassword.value) {
      const user = {
        user: {
          "email": this.refs.email.value,
          "username": this.refs.username.value,
          "password": this.refs.password.value,
          "is_staff": "False",
          "is_superuser": "False"
        }
      }
      this.props.signUp(user);
    }
  }

  render() {
    return (
      <div className="hk">
          <div className="uk-container-medium uk-align-center uk-height-small">
            <div className="uk-card uk-card-default uk-width-1-2 uk-align-center uk-box-shadow-large">
              <form className="uk-align-center" onSubmit={this.signUp.bind(this)}>
                <div className="uk-margin">
                  <div className="uk-inline">
                  <span className=" uk-form-icon" uk-icon="icon: mail"></span>
                    <input className="uk-input" type="email" placeholder="Email" ref="email" />
                  </div>
                </div>
              <div className="uk-margin">
                <div className="uk-inline">
                  <span className=" uk-form-icon" uk-icon="icon: user"></span>
                    <input className="uk-input" type="text" placeholder="Username" ref="username" />
                </div>

              <div className="uk-margin uk-margin-auto">
                <div className="uk-inline">
                  <span className="uk-form-icon" uk-icon="icon: lock"></span>
                    <input className="uk-input" type="password" placeholder="Password" ref="password" />
                </div>
              </div>
              <div className="uk-inline">
                  <span className="uk-form-icon" uk-icon="icon: lock"></span>
                    <input className="uk-input" type="password" placeholder="Confirm Password" ref="confirmPassword" />
                </div>
              </div>
              <p className="uk-margin">
                <button className="uk-button uk-button-primary uk-align-center uk-width-1-3" type="submit">Sign-up</button>
              </p>
            </form>
            <p className="uk-margin uk-margin-small-top">Already have an account, Click <Link to="/login">here</Link> to sign in.</p>
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

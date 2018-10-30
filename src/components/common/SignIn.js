import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import { signIn } from '../../actions/authActions';

import '../../static/css/common.css';

class SignIn extends Component {
  signIn(event) {
    event.preventDefault();
    if(this.refs.username.value && this.refs.password.value) {
      const user = {
        user: {
          "username": this.refs.username.value,
          "password": this.refs.password.value,
        }
      }
      this.props.signIn(user, this.props.history);
    }
  }
  render() {
    return (
      <div data-uk-scrollspy="cls: uk-animation-slide-bottom-small; target: > div; delay: 100; repeat: true">
        <div className="uk-container uk-padding">

          <div class="uk-card uk-width-1-2@m uk-align-center uk-card-default uk-box-shadow-hover-small uk-box-shadow-meduim" data-uk-scrollspy="cls: uk-animation-slide-bottom-medium; target: > div; delay: 40; repeat: true">
            <div class="uk-card-header">
                <div class="uk-grid-small uk-flex-middle" uk-grid>
                    <div class="uk-width-expand">
                        <h2 class="uk-card-title uk-margin-remove-bottom">Sign In</h2>
                    </div>
                </div>
            </div>
            <div className="uk-card-body uk-padding-remove-bottom">
              <div className="uk-align-center uk-padding-small">
                <form className="uk-align-center" onSubmit={this.signIn.bind(this)}>
                  <div className="uk-margin">
                    <div className="uk-inline uk-width-1-1">
                      <span className=" uk-form-icon" uk-icon="icon: user"></span>
                        <input className="uk-input" type="text" placeholder="Username" ref="username"/>
                    </div>

                  <div className="uk-margin uk-margin-auto">
                    <div className="uk-inline uk-width-1-1">
                      <span className="uk-form-icon" uk-icon="icon: lock"></span>
                        <input className="uk-input" type="password" placeholder="Password" ref="password"/>
                    </div>
                  </div>
                  </div>
                  <p className="uk-margin">
                    <button className="uk-button uk-button-primary uk-align-center uk-width-1-3" type="submit">Sign-in</button>
                  </p>
                </form>
              </div>
            </div>
            <div className="uk-card-footer">
              <p className="uk-margin uk-margin-small-top">
                Not a user? Click <Link to="/signup">here</Link> to new create a account.
              </p>
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

export default connect(mapStateToProps, { signIn })(SignIn);

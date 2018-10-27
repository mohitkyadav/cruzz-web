import React, { Component } from "react";
import { Link } from "react-router-dom";

import '../../static/css/common.css';

class SignUp extends Component {
  render() {
    return (
      <div className="hk">
          <div className="uk-container-medium uk-align-center uk-height-small">
            <div class="uk-card uk-card-default uk-width-1-2 uk-align-center uk-box-shadow-large">
              <form class="uk-align-center">
                <div class="uk-margin">
                  <div class="uk-inline">
                  <span class=" uk-form-icon" uk-icon="icon: mail"></span>
                    <input class="uk-input" type="email" placeholder="Email"/>
                  </div>
                </div>
              <div class="uk-margin">
                <div class="uk-inline">
                  <span class=" uk-form-icon" uk-icon="icon: user"></span>
                    <input class="uk-input" type="text" placeholder="Username"/>
                </div>

              <div class="uk-margin uk-margin-auto">
                <div class="uk-inline">
                  <span class="uk-form-icon" uk-icon="icon: lock"></span>
                    <input class="uk-input" type="password" placeholder="Password"/>
                </div>
              </div>
              <div class="uk-inline">
                  <span class="uk-form-icon" uk-icon="icon: lock"></span>
                    <input class="uk-input" type="password" placeholder="Confirm Password"/>
                </div>
              </div>
              <p class="uk-margin">
                <button class="uk-button uk-button-primary uk-align-center uk-width-1-3">Sign-up</button>
              </p>
            </form>
            <p className="uk-margin uk-margin-small-top">Already have an account, Click <Link to="/login">here</Link> to sign in.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;

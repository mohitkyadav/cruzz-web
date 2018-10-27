import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

import '../../static/css/common.css';

class SignIn extends Component {
  render() {
    return (
      <div class="hk">
          <div class="uk-container-medium uk-align-center">
            <div class="uk-card uk-card-default uk-width-1-2 uk-align-center uk-box-shadow-large">
              <h2 class="uk-card-title uk-align-center uk-text-bold">Sign In</h2>
              <div class="uk-align-center uk-padding-small">
              <form class="uk-align-center">
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
                <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                  <label class="uk-text-small"><input class="uk-checkbox" type="checkbox" /> Remember me</label>
                </div>
                </div>
                <p class="uk-margin">
                  <button class="uk-button uk-button-primary uk-align-center uk-width-1-3">Sign-in</button>
                </p>
              </form>
              </div>
              <p class="uk-margin uk-margin-small-top">
                Not a user? Click <a href="">here</a> to new create account.
              </p>
            </div>
          </div> 
      </div>
    );
  }
}

export default SignIn;

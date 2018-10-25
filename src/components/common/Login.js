import React, { Component } from "react";
// import { Link } from "react-router-dom";

import '../../static/css/common.css';

class Login extends Component {
  render() {
    return (
        <div class="loginForm">
          <form>
            <div class="uk-margin">
              <div class="uk-inline">
                <span class="uk-form-icon" uk-icon="icon: user" placeholder="Username"></span>
                <input class="uk-input" type="text"/>
              </div>
              <div class="uk-margin">
                <div class="uk-inline">
                  <span class="uk-form-icon uk-form-icon-flip" uk-icon="icon: lock"></span>
                  <input class="uk-input" type="text" placeholder="Password"/>
                </div>
              </div>
            </div>
          </form>
        </div> 
    );
  }
}

export default Login;

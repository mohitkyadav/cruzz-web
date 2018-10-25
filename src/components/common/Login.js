import React, { Component } from "react";
// import { Link } from "react-router-dom";

import '../../static/css/common.css';

class Login extends Component {
  render() {
    return (
        <div class="uk-container uk-container-small">
              <form>
                <div class="uk-margin">
                  <div class="uk-inline">
                    <span class="uk-form-icon" uk-icon="icon: user"></span>
                    <input class="uk-input" type="text" placeholder="Username"/>
                  </div>
                  <div class="uk-margin">
                  <div class="uk-inline">
                    <span class="uk-form-icon" uk-icon="icon: lock"></span>
                    <input class="uk-input" type="text" placeholder="Password"/>
                  </div>
                 </div>
                  <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                  <label><input class="uk-checkbox" type="checkbox"/> Save Password</label>
                </div>
                </div>
              </form>
        </div> 
    );
  }
}

export default Login;

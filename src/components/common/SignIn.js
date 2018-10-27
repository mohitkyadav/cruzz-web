import React, { Component } from "react";
import { Link } from "react-router-dom";

import '../../static/css/common.css';

class SignIn extends Component {
  render() {
    return (
      <div>
        <div className="uk-container-medium uk-align-center">
          <div className="uk-card uk-card-default uk-width-1-2 uk-align-center uk-box-shadow-large">
            <h2 className="uk-card-title uk-align-center uk-text-bold">Sign In</h2>
            <div className="uk-align-center uk-padding-small">
              <form className="uk-align-center">
                <div className="uk-margin">
                  <div className="uk-inline">
                    <span className=" uk-form-icon" uk-icon="icon: user"></span>
                      <input className="uk-input" type="text" placeholder="Username"/>
                  </div>

                <div className="uk-margin uk-margin-auto">
                  <div className="uk-inline">
                    <span className="uk-form-icon" uk-icon="icon: lock"></span>
                      <input className="uk-input" type="password" placeholder="Password"/>
                  </div>
                </div>
                <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                  <label className="uk-text-small"><input className="uk-checkbox" type="checkbox" /> Remember me</label>
                </div>
                </div>
                <p className="uk-margin">
                  <button className="uk-button uk-button-primary uk-align-center uk-width-1-3">Sign-in</button>
                </p>
              </form>
            </div>
            <p className="uk-margin uk-margin-small-top">
              Not a user? Click <Link to="/signup">here</Link> to new create account.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;

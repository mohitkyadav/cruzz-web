import React, { Component } from "react";
import { Link } from "react-router-dom";

import '../../static/css/common.css';

class SignIn extends Component {
  render() {
    return (
      <div>
        <div className="uk-container uk-padding">

          <div class="uk-card uk-width-1-2@m uk-align-center uk-card-default uk-box-shadow-hover-large">
            <div class="uk-card-header">
                <div class="uk-grid-small uk-flex-middle" uk-grid>
                    <div class="uk-width-expand">
                        <h2 class="uk-card-title uk-margin-remove-bottom">Sign In</h2>
                    </div>
                </div>
            </div>
            <div className="uk-card-body uk-padding-remove-bottom">
              <div className="uk-align-center uk-padding-small">
                <form className="uk-align-center">
                  <div className="uk-margin">
                    <div className="uk-inline uk-width-1-1">
                      <span className=" uk-form-icon" uk-icon="icon: user"></span>
                        <input className="uk-input" type="text" placeholder="Username"/>
                    </div>

                  <div className="uk-margin uk-margin-auto">
                    <div className="uk-inline uk-width-1-1">
                      <span className="uk-form-icon" uk-icon="icon: lock"></span>
                        <input className="uk-input" type="password" placeholder="Password"/>
                    </div>
                  </div>
                  <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                    <label className="uk-text-small uk-align-center"><input className="uk-checkbox" type="checkbox" /> Remember me</label>
                  </div>
                  </div>
                  <p className="uk-margin">
                    <button className="uk-button uk-button-primary uk-align-center uk-width-1-3">Sign-in</button>
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

export default SignIn;

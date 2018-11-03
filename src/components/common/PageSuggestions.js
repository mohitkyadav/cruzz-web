import React, { Component } from "react";
import { Link } from "react-router-dom";

import '../../static/css/common.css';

class PageSuggestions extends Component {
  render() {
    return (
      <div className="uk-container">
        <div className="uk-card uk-card-default uk-box-shadow-hover-small uk-width-1-4@m">
          <div className="uk-card-body uk-padding-remove">
            <div className="uk-padding-small uk-flex-inline">
              <p className="uk-margin-remove-bottom uk-margin-small-right">Pages You might</p>
              <span uk-icon="icon: heart; ratio: 1;" style={{ color: 'red' }}></span>
            </div>

            <hr className="uk-margin-remove"/>
            <Link to="#">
              <div className="uk-grid-small uk-flex-inline uk-width-1-1 uk-padding-small uk-margin-remove-top" uk-grid="true">
                <div className="uk-width-1-5">
                  <img className="uk-border-circle" width="40" height="40" alt="me" src="https://avatars0.githubusercontent.com/u/25580776?s=400&u=9369191f891fcda2a8269e44421ea2357aa0f33d&v=4"/>
                </div>
                <div className="uk-width-4-5">
                  <h6 className="uk-margin-remove-bottom">Encore</h6>
                  <p className="uk-text-meta uk-margin-remove-top">Music Club</p>
                </div>
              </div>
            </Link>

            <hr className="uk-margin-remove"/>
            <Link to="#">
              <div className="uk-grid-small uk-flex-inline uk-width-1-1 uk-padding-small" uk-grid="true">
                <div className="uk-width-1-5">
                  <img className="uk-border-circle" width="40" height="40" alt="me" src="https://avatars0.githubusercontent.com/u/25580776?s=400&u=9369191f891fcda2a8269e44421ea2357aa0f33d&v=4"/>
                </div>
                <div className="uk-width-4-5">
                  <h6 className="uk-margin-remove-bottom">IIITV Coding Club</h6>
                  <p className="uk-text-meta uk-margin-remove-top">Official Coding Club on IIITV</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="uk-card-footer uk-padding-remove-right">
              <Link to="#" className="uk-button uk-button-text">Discover more</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default PageSuggestions;

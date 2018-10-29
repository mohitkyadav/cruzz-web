import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import logo from '../../static/img/index2.svg';


class ProfilePage extends Component {

  render() {

    return (
      <div>
        <div className="uk-container uk-margin-medium-top uk-padding-small" data-uk-scrollspy="cls: uk-animation-slide-bottom-medium; target: > div; delay: 40; repeat: true">
          <div className="uk-margin-medium-bottom">
            <div class="uk-inline">
              <img src={logo} alt=""/>
              <div class="uk-overlay uk-overlay-default uk-position-bottom">
                <p>Default Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
          </div>
          <div className="uk-text-center" data-uk-grid>
            <div className="uk-width-expand@m">
              <div className="uk-card uk-card-default uk-card-body">Expand</div>
            </div>
            <div className="uk-width-1-3@m">
              <div className="uk-card uk-card-default uk-card-body">1-3</div>
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

export default connect(mapStateToProps, {})(withRouter(ProfilePage));

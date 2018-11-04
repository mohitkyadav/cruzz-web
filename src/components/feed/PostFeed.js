import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';

class PostFeed extends Component {
  render () {
    return (
      <div>
        <div className="uk-container uk-padding-small uk-width-1-1" data-uk-scrollspy="cls: uk-animation-slide-bottom-medium; target: > div; delay: 40;">

          <div className="uk-card uk-card-default uk-align-center uk-width-2-3@m uk-box-shadow-hover-medium uk-box-shadow-small">
            <div className="uk-card-header">
              <div className="uk-grid-small uk-flex-inline" data-uk-grid="true">
                <div className="uk-width-auto">
                  <img className="uk-border-circle" width="40" height="40" alt="" src="https://avatars0.githubusercontent.com/u/25580776?s=400&u=9369191f891fcda2a8269e44421ea2357aa0f33d&v=4"/>
                </div>
                <div className="uk-width-expand">
                  <h5 className="uk-margin-remove-bottom">Title</h5>
                    <p className="uk-margin-remove-top">
                      <Link className="uk-link-heading" to="#"> {this.props.auth.user.username} </Link>
                      &nbsp;
                      <time className="uk-text-meta" dateTime="2016-04-01T19:00">Posted on April 01, 2016</time>
                    </p>
                </div>
              </div>
            </div>
            <div className="uk-card-body">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
            </div>
            <div className="uk-card-footer">
              <Link to="#" className="uk-button uk-button-text">Read more</Link>
            </div>
          </div>

          <div className="uk-card uk-card-default uk-align-center uk-width-2-3@m uk-box-shadow-hover-medium uk-box-shadow-small">
            <div className="uk-card-header">
              <div className="uk-grid-small uk-flex-inline" data-uk-grid="true">
                <div className="uk-width-auto">
                  <img className="uk-border-circle" width="40" height="40" alt="" src="https://avatars0.githubusercontent.com/u/25580776?s=400&u=9369191f891fcda2a8269e44421ea2357aa0f33d&v=4"/>
                </div>
                <div className="uk-width-expand">
                  <h5 className="uk-margin-remove-bottom">Title</h5>
                    <p className="uk-margin-remove-top">
                      <Link className="uk-link-heading" to="#"> {this.props.auth.user.username} </Link>
                      &nbsp;
                      <time className="uk-text-meta" dateTime="2016-04-01T19:00">Posted on April 01, 2016</time>
                    </p>
                </div>
              </div>
            </div>
            <div className="uk-card-body">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
            </div>
            <div className="uk-card-footer">
              <Link to="#" className="uk-button uk-button-text">Read more</Link>
            </div>
          </div>

          <div className="uk-card uk-card-default uk-align-center uk-width-2-3@m uk-box-shadow-hover-medium uk-box-shadow-small">
            <div className="uk-card-header">
              <div className="uk-grid-small uk-flex-inline" data-uk-grid="true">
                <div className="uk-width-auto">
                  <img className="uk-border-circle" width="40" height="40" alt="" src="https://avatars0.githubusercontent.com/u/25580776?s=400&u=9369191f891fcda2a8269e44421ea2357aa0f33d&v=4"/>
                </div>
                <div className="uk-width-expand">
                  <h5 className="uk-margin-remove-bottom">Title</h5>
                    <p className="uk-margin-remove-top">
                      <Link className="uk-link-heading" to="#"> {this.props.auth.user.username} </Link>
                      &nbsp;
                      <time className="uk-text-meta" dateTime="2016-04-01T19:00">Posted on April 01, 2016</time>
                    </p>
                </div>
              </div>
            </div>
            <div className="uk-card-body">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
            </div>
            <div className="uk-card-footer">
              <Link to="#" className="uk-button uk-button-text">Read more</Link>
            </div>
          </div>

          <div className="uk-card uk-card-default uk-align-center uk-width-2-3@m uk-box-shadow-hover-medium uk-box-shadow-small">
            <div className="uk-card-header">
              <div className="uk-grid-small uk-flex-inline" data-uk-grid="true">
                <div className="uk-width-auto">
                  <img className="uk-border-circle" width="40" height="40" alt="" src="https://avatars0.githubusercontent.com/u/25580776?s=400&u=9369191f891fcda2a8269e44421ea2357aa0f33d&v=4"/>
                </div>
                <div className="uk-width-expand">
                  <h5 className="uk-margin-remove-bottom">Title</h5>
                    <p className="uk-margin-remove-top">
                      <Link className="uk-link-heading" to="#"> {this.props.auth.user.username} </Link>
                      &nbsp;
                      <time className="uk-text-meta" dateTime="2016-04-01T19:00">Posted on April 01, 2016</time>
                    </p>
                </div>
              </div>
            </div>
            <div className="uk-card-body">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
            </div>
            <div className="uk-card-footer">
              <Link to="#" className="uk-button uk-button-text">Read more</Link>
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

export default connect(mapStateToProps, {})(withRouter(PostFeed));

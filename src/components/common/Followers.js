import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from 'axios';

import { loading, loaded } from '../../actions/authActions';

class Followers extends Component {

  constructor(props) {
    super(props);
    this.state = ({
      username: null,
      follow: null,
      followers: {}
    })
  }

  componentDidMount() {
    const { username, follow } = this.props.match.params;
    this.props.loading();
    axios.get(`https://cruzz.herokuapp.com/api/profile/retrieve/${username}/`).then(response => {
      console.log(response.data);
      // dispatch({ type: SET_CURRENT_USER, payload: response.data.user });
      // dispatch({ type: SET_CURRENT_PROFILE, payload: response.data.profile });
      this.setState({
        username: username,
        follow: follow
      });
      this.props.loaded();
    }).catch(err => {
      console.log(err.response);
      this.props.loaded();
    });
    console.log(username);
  }

  render() {

    return (
      <div>
        <div className="uk-container uk-padding-small" data-uk-scrollspy="cls: uk-animation-slide-bottom-medium; target: > div, li; delay: 20;">
            <div className="uk-card uk-card-default uk-width-1-1">
                <div className="uk-card-header">
                  <h3 className="uk-text-capitalize">
                    {this.state.follow}
                  </h3>
                </div>
                <div className="uk-card-body">
                  <li className="uk-padding-small uk-list uk-box-shadow-hover-small">
                    <Link to="#">
                      <div className="uk-grid-small uk-flex-inline uk-width-1-1 uk-margin-remove-top" uk-grid="true">
                        <div className="uk-width-1-5">
                          <img className="uk-border-circle" width="40" height="40" alt="me" src="https://avatars0.githubusercontent.com/u/25580776?s=400&u=9369191f891fcda2a8269e44421ea2357aa0f33d&v=4"/>
                        </div>
                        <div className="uk-width-4-5 uk-text-left">
                          <h6 className="uk-margin-remove-bottom">Encore</h6>
                          <p className="uk-text-meta uk-margin-remove-top">Music Club</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="uk-padding-small uk-list uk-box-shadow-hover-small">
                    <Link to="#">
                      <div className="uk-grid-small uk-flex-inline uk-width-1-1 uk-margin-remove-top" uk-grid="true">
                        <div className="uk-width-1-5">
                          <img className="uk-border-circle" width="40" height="40" alt="me" src="https://avatars0.githubusercontent.com/u/25580776?s=400&u=9369191f891fcda2a8269e44421ea2357aa0f33d&v=4"/>
                        </div>
                        <div className="uk-width-4-5 uk-text-left">
                          <h6 className="uk-margin-remove-bottom">Encore</h6>
                          <p className="uk-text-meta uk-margin-remove-top">Music Club</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                </div>
                <div className="uk-card-footer">
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

export default connect(mapStateToProps, { loading, loaded })(withRouter(Followers));

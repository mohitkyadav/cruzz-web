import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from 'axios';


// import fireStorage from "../../firebase";

import coverPhoto from '../../static/img/retro-hop.jpg';
// import spinner from '../../static/img/index.svg';
// import avtar from '../../static/img/avtar.jpg'
import PageSuggestions from "../common/PageSuggestions";
import { loading, loaded } from './../../actions/authActions';

class UserProfile extends Component {

  constructor(props) {
    super(props);
    this.state = ({
      username: null,
      profile: {}
    })
  }

  componentDidMount() {
    const { username } = this.props.match.params;
    this.props.loading();
    axios.get(`https://cruzz.herokuapp.com/api/profile/retrieve/${username}/`).then(response => {
      console.log(response.data);
      // dispatch({ type: SET_CURRENT_USER, payload: response.data.user });
      // dispatch({ type: SET_CURRENT_PROFILE, payload: response.data.profile });
      this.setState({
        username: username,
        profile: response.data.profile
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
        <div className="uk-container uk-padding-small" data-uk-scrollspy="cls: uk-animation-slide-bottom-medium; target: > div; delay: 40;">

          <div className="uk-margin-medium-bottom">
            <div className="uk-height-medium uk-background-cover uk-light uk-flex" data-uk-parallax="bgy: -200"
            style={{
              backgroundImage: `url(${
                this.state.profile.cover === "https://thumb.ibb.co/eN5O0f/temp.jpg" ? coverPhoto : this.state.profile.cover
              })`}}>

              <div className="uk-overlay uk-overlay-primary uk-position-bottom uk-padding-remove">
                <div className="uk-grid-small uk-flex-inline" uk-grid="true">

                  <div className="uk-width-auto">
                    <div className="uk-inline-clip uk-transition-toggle" tabIndex="0">
                      <img className="uk-transition-scale-down ov-curser-pointer uk-transition-opaque" width="150px" src={this.state.profile.image} alt="" data-uk-tooltip="title: Upload new Profile Picture; pos: bottom-center"/>
                      <div className="uk-position-center">
                        <form style={{ display: 'none' }}>
                          <input id="dp" name="dp" type="file" ref="dp"/>
                        </form>
                        {
                          !this.props.auth.loading ?
                          (
                            <span className="uk-transition-slide-bottom-small ov-curser-pointer"  ></span>
                          ): <div className="uk-text-right uk-animation-scale-up" data-uk-spinner="ratio: 1.5"></div>
                        }
                      </div>
                    </div>
                  </div>

                  <div className="uk-width-expand uk-align-center">
                    <div className="uk-width-1-1" data-uk-grid="true">
                      <div className="uk-width-auto">
                        <h3 className="uk-card-title uk-margin-remove-bottom">
                          {this.state.profile.first_name ? this.state.profile.first_name: "Name"}
                          &nbsp;
                          {this.state.profile.last_name ? this.state.profile.last_name: "Last"}
                        </h3>
                        <h5 className="uk-margin-remove-top">{this.state.profile.bio ? this.state.profile.bio: "dattebayo! ✌"}</h5>
                      </div>
                      <div className="uk-width-expand">

                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

          <div className="uk-text-center" data-uk-grid="true">
            <div className="uk-width-expand@m">
              <div className="uk-card uk-card-default uk-card-body">Expand</div>
            </div>
            <div className="uk-width-1-3@m">
              <PageSuggestions/>
            </div>
          </div>

          <div className="uk-text-center" data-uk-grid="true">
            <div className="uk-width-expand@m">
              <div className="uk-card uk-card-default uk-card-body">Expand</div>
            </div>
            <div className="uk-width-1-3@m">
              <div className="uk-card uk-card-default uk-card-body">1-3</div>
            </div>
          </div>

          <div className="uk-text-center" data-uk-grid="true">
            <div className="uk-width-2-3@m uk-align-center">
              <div className="uk-card uk-card-default uk-card-body">2-3</div>
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

export default connect(mapStateToProps, { loading, loaded })(withRouter(UserProfile));

import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from 'axios';

// import fireStorage from "../../firebase";

import coverPhoto from '../../static/img/retro-hop.jpg';
import spinner from '../../static/img/index.svg';
// import avtar from '../../static/img/avtar.jpg'
import PageSuggestions from "../common/PageSuggestions";
import { loading, loaded } from './../../actions/authActions';
import PostFeed from './../feed/PostFeed';

class UserProfile extends Component {

  constructor(props) {
    super(props);
    this.state = ({
      username: null,
      suggestedPages: {},
      profile: {},
      posts: {},
      following : {},
      followers: {}
    });
    this.handleFollow = this.handleFollow.bind(this);
    this.fetchPosts = this.fetchPosts.bind(this);
    this.fetchFollowers = this.fetchFollowers.bind(this);
    this.fetchFollowing = this.fetchFollowing.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.match.params.username !== this.props.match.params.username) {
      window.location.reload();
    }
  }

  componentDidMount() {
    const { username } = this.props.match.params;
    console.log(username);
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
    this.fetchPosts(this.props.match.params.username);
    this.fetchFollowing(this.props.match.params.username);
    this.fetchFollowers(this.props.match.params.username);
  }

  fetchFollowing(username) {
    const URI =  'https://cruzz.herokuapp.com/api/profile/following/?user=' + username + '&limit=100&offset=0';
    axios.get(URI).then(res => {
      this.setState({
        following: res.data.profiles.slice(0, 2)
      })
    }).catch(err => {
      console.log(err.response);
    });
  }

  fetchFollowers(username) {
    const URI =  'https://cruzz.herokuapp.com/api/profile/followers/?user=' + username + '&limit=100&offset=0';
    console.log(URI);
    axios.get(URI).then(res => {
      this.setState({
        followers: res.data.profiles.slice(0, 2)
      })
    }).catch(err => {
      console.log(err.response);
    });
  }

  fetchPosts(username) {
    axios.get('https://cruzz.herokuapp.com/api/post/view/?author=' + username + '&limit=100&offset=0/')
    .then(res => {
      this.setState({
        posts: res.data.posts
      });
    }).catch(err => {
      console.log(err.response);
    });
  }

  handleFollow() {
    this.props.loading();
    if(this.state.profile.following) {
      axios.delete('https://cruzz.herokuapp.com/api/profile/' + this.state.username + '/follow')
      .then(res => {
        console.log(res.data);
        this.setState({
          profile: res.data.profile
        });
        this.props.loaded();
      }).catch(err => {
        console.log(err.response);
        this.props.loaded();
      });
    } else {
      axios.post('https://cruzz.herokuapp.com/api/profile/' + this.state.username + '/follow')
      .then(res => {
        console.log(res.data);
        this.setState({
          profile: res.data.profile
        });
        this.props.loaded();
      }).catch(err => {
        console.log(err.response);
        this.props.loaded();
      });
    }
    this.props.loaded();
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
                <div className="uk-width-1-1 uk-flex-inline" uk-grid="true">

                  <div className="uk-width-auto">
                    <div className="uk-inline-clip uk-transition-toggle" tabIndex="0">
                      <img className="uk-transition-scale-down ov-curser-pointer uk-transition-opaque" style={{height:"150px"}} width="150px" src={this.state.profile.image} alt=""/>
                      {
                        this.state.profile.official_page ? (
                          <span className="uk-position-absolute uk-transform-center" style={{left: "10%", top: "10%"}} data-uk-icon="icon: check; ratio: 1.3" data-uk-tooltip="title: Official profile; pos: top"></span>
                        ): null
                      }
                      <div className="uk-position-center">
                        {
                          !this.props.auth.loading ?
                          (
                            <span className="uk-transition-slide-bottom-small ov-curser-pointer"  ></span>
                          ): <div className="uk-text-right uk-animation-scale-up" data-uk-spinner="ratio: 1.5"></div>
                        }
                      </div>
                    </div>
                  </div>

                  <div className="uk-width-expand uk-padding-remove-top">
                    <div className="uk-width-1-1" >
                      <div className="uk-width-auto uk-margin-small-top">
                        <h3 className="uk-card-title uk-margin-remove-bottom">
                          {this.state.profile.first_name ? this.state.profile.first_name: "Name"}
                          &nbsp;
                          {this.state.profile.last_name ? this.state.profile.last_name: "Last"}
                        </h3>
                        <h5 className="uk-margin-remove-top">{this.state.profile.bio ? this.state.profile.bio: "dattebayo! ✌"}</h5>
                      </div>
                      <div className="uk-width-auto uk-margin-small-top">
                        {
                          this.state.profile.following ?
                          (<button onClick={this.handleFollow} className="uk-button uk-button-small uk-button-default">Following</button>):
                          (<button onClick={this.handleFollow} className="uk-button uk-button-small uk-button-default">Follow</button>)
                        }
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

          <div className="uk-text-center uk-grid-match" data-uk-grid="true">
            {/* <div className="uk-width-auto uk-align-center">
              <div className="uk-card uk-card-default uk-card-body">
                New post
                <hr/>
                <Link to="/new/post" data-uk-icon="icon: plus-circle; ratio: 5"></Link>
              </div>
            </div> */}
            <div className="uk-width-expand@m">
              <div className="uk-card uk-card-default uk-padding-remove uk-card-body">

                <ul className="uk-flex-center uk-subnav uk-subnav-pill" data-uk-switcher="animation: uk-animation-slide-top-small, uk-animation-slide-top-small; duration: 200;">
                  <li className="uk-active"><Link to="#">Following - {this.state.profile.followingCount}</Link></li>
                  <li><Link to="#">Followers - {this.state.profile.followersCount}</Link></li>
                </ul>
                <ul className="uk-switcher uk-margin">
                  <div>
                    {
                      this.state.following.length > 0 ? (
                        <div>
                          {this.state.following.map((f, key) => {
                            return (
                              <div key={key}>
                                <li className="uk-padding-small">
                                  <Link className="uk-link-heading" to={"/user/" + f.username}>
                                    <div className="uk-grid-small uk-flex-inline uk-width-1-1 uk-margin-remove-top" uk-grid="true">
                                      <div className="uk-width-1-5">
                                        <img className="uk-border-circle" width="50" height="50" alt="me" src={f.image}/>
                                      </div>
                                      <div className="uk-width-4-5 uk-text-left">
                                        <h6 className="uk-margin-remove-bottom">{f.first_name}</h6>
                                        <p className="uk-text-meta uk-margin-remove-top">{f.bio}</p>
                                      </div>
                                    </div>
                                  </Link>
                                </li>
                              </div>
                            )
                          })}
                        </div>
                      ):(
                        <div>
                          <div>
                          {
                            this.state.following.length === 0 ?
                            (<h2>Not following anyone yet ;(</h2>) :
                            (<img alt="loading" className="uk-align-center" src={spinner}></img>)
                          }
                          </div>
                        </div>
                      )
                    }
                    {
                      this.state.following.length > 0 ?
                      (<Link className="uk-button uk-margin-bottom-small" to={"/user/" + this.state.profile.username + "/following"}>Show more people you follow</Link>)
                      : null
                    }
                  </div>
                  <div>
                    {
                      this.state.followers.length > 0 ? (
                        <div>
                          {this.state.followers.map((f, key) => {
                            return (
                              <div key={key}>
                                <li className="uk-padding-small">
                                  <Link className="uk-link-heading" to={"/user/" + f.username}>
                                    <div className="uk-grid-small uk-flex-inline uk-width-1-1 uk-margin-remove-top" uk-grid="true">
                                      <div className="uk-width-1-5">
                                        <img className="uk-border-circle" width="50" height="50" alt="me" src={f.image}/>
                                      </div>
                                      <div className="uk-width-4-5 uk-text-left">
                                        <h6 className="uk-margin-remove-bottom">{f.first_name}</h6>
                                        <p className="uk-text-meta uk-margin-remove-top">{f.bio}</p>
                                      </div>
                                    </div>
                                  </Link>
                                </li>
                              </div>
                            )
                          })}
                        </div>
                      ):(
                        <div>
                          <div>
                          {
                            this.state.followers.length === 0 ?
                            (<h2>No followers yet ;(</h2>) :
                            (<img alt="loading" className="uk-align-center" src={spinner}></img>)
                          }
                          </div>
                        </div>
                      )
                    }
                    {
                      this.state.followers.length > 0 ?
                      (<Link className="uk-button uk-margin-bottom-small" to={"/user/" + this.state.profile.username + "/followers"}>Show all your followers</Link>)
                      : null
                    }
                  </div>

                </ul>
              </div>
            </div>
            <div className="uk-width-1-3@m">
              <PageSuggestions full={false}/>
            </div>
          </div>

          <div className="uk-text-left" data-uk-grid="true">
            <div className="uk-width-4-5@m uk-align-center">
            {
              this.state.posts.length > 0 ? (
                <div>
                  {this.state.posts.map((post, key) => {
                    return (
                      <div key={key}>
                        <PostFeed post={post} full={false}/>
                      </div>
                    )
                  })}
                </div>
              ):(
                <div>
                  <div>
                    <img alt="loading" className="uk-align-center" src={spinner}></img>
                  </div>
                </div>
              )
            }
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

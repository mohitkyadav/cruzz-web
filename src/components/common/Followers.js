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
      followers: {},
    })
  }

  componentDidMount() {
    const { username, follow } = this.props.match.params;
    const URI =  'https://cruzz.herokuapp.com/api/profile/' + follow + '/?user=' + username + '&limit=100&offset=0';
    this.props.loading();
    axios.get(URI).then(response => {
      console.log(response.data);
       this.setState({
        username: username,
        follow: follow,
        followers: response.data.profiles
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
                  {
                    this.state.followers.length > 0 ? (
                      <ul className="uk-list">
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
                      </ul>
                    ):(
                      <div>
                        <div>
                        {
                          this.state.followers.length === 0 ?
                          (<h2>No followers yet ;(</h2>) :
                          (null)
                        }
                        </div>
                      </div>
                    )
                  }
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

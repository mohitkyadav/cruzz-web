import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from 'axios';

import spinner from '../../static/img/index.svg';
import { loading, loaded } from './../../actions/authActions';
import PostFeed from './../feed/PostFeed';

class FavoritePosts extends Component {

  constructor(props) {
    super(props);
    this.state = ({
      username: null,
      posts: {},
    });
    this.fetchFavoritePosts = this.fetchFavoritePosts.bind(this);
  }

  componentDidMount() {
    this.props.loading();
    this.fetchFavoritePosts(this.props.match.params.username);
  }

  fetchFavoritePosts(username) {
    axios.get('https://cruzz.herokuapp.com/api/post/view/?favorited=' + username + '&limit=100&offset=0/')
    .then(res => {
      this.setState({
        posts: res.data.posts
      });
      this.props.loaded();
    }).catch(err => {
      console.log(err.response);
      this.props.loaded()
    });
    this.props.loaded()
  }

  render() {

    return (
      <div>
        <div className="uk-container uk-padding-small" data-uk-scrollspy="cls: uk-animation-slide-bottom-medium; target: > div; delay: 40;">
      
        <div data-uk-grid="true">
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
                    <img alt="loading" width="130px" className="uk-align-center" src={spinner}></img>
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

export default connect(mapStateToProps, { loading, loaded })(withRouter(FavoritePosts));

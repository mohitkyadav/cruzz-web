import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from 'axios';

import spinner from '../../static/img/index.svg';
import { loading, loaded } from './../../actions/authActions';
import PostFeed from './../feed/PostFeed';

class PostsByTags extends Component {

  constructor(props) {
    super(props);
    this.state = ({
      tag: null,
      posts: {},
    });
    this.fetchTaggedPosts = this.fetchTaggedPosts.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.match.params.tag !== this.props.match.params.tag) {
      window.location.reload();
    }
  }

  componentDidMount() {
    const { tag } = this.props.match.params;
    this.props.loading();
    this.fetchTaggedPosts(this.props.match.params.tag);
  }

  fetchTaggedPosts(tag) {
    axios.get('https://cruzz.herokuapp.com/api/post/view/?tag=' + tag + '&limit=100&offset=0/')
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
        <h3 className="uk-text-center">Posts tagged with "{this.props.match.params.tag}"</h3>
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

export default connect(mapStateToProps, { loading, loaded })(withRouter(PostsByTags));

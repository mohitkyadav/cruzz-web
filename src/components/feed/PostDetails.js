import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import { loading, loaded } from './../../actions/authActions';
import axios from 'axios';
import PostFeed from "./PostFeed";

import spinner from '../../static/img/index.svg';


class PostDetails extends Component {
  constructor (props) {
    super(props);
    this.state = ({
      posts: []
    });
    this.handlePost = this.handlePost.bind(this);
  }

  componentDidMount () {
    this.props.loading();
    axios.get('https://cruzz.herokuapp.com/api/post/view/' + this.props.match.params.slug + '/')
    .then(res => {
      this.setState({
        posts: [res.data.post]
      });
      this.props.loaded();
    }).catch(err => {
      console.log(err.response);
      this.props.loaded();
    });
  }

  handlePost (event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="uk-container uk-align-center uk-margin-remove-bottom" data-uk-scrollspy="cls: uk-animation-slide-bottom-medium; target: > div; delay: 40;">
        {
          this.state.posts.length > 0 ? (
            <div>
              {this.state.posts.map((post, key) => {
                return (
                  <div key={key}>
                    <PostFeed post={post}/>
                  </div>
                )
              })}
            </div>
          ):(
            <div>
              <img alt="loading" className="uk-align-center" src={spinner}></img>
            </div>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {loading, loaded})(withRouter(PostDetails));

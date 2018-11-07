import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import { loading, loaded } from './../../actions/authActions';
import axios from 'axios';

class PostOperations extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      slug: null,
      post: {}
    });
    this.handlePost = this.handlePost.bind(this);
  }

  handlePost(event) {
    this.props.loading();
    const postData = {
      post: {
        title: this.refs.postTitle.value,
        description: this.refs.postDes.value,
        body: this.refs.postBody.value
      }
    };
    axios.post('https://cruzz.herokuapp.com/api/post/create/', postData)
    .then(res => {
      console.log(res.data);
      this.props.loaded();
    }).catch(err => {
      console.log(err.response);
      this.props.loaded();
    });
    this.props.loaded();
    event.preventDefault();
  }

  render() {
    return (
      <div className="uk-container uk-align-center uk-margin-remove-bottom" data-uk-scrollspy="cls: uk-animation-slide-bottom-medium; target: > div; delay: 40;">
        <div className="uk-card uk-card-default uk-card-hover">

          <div className="uk-card-body">
            <form onSubmit={this.handlePost.bind(this)}>
              <fieldset className="uk-fieldset">

                <legend className="uk-legend">New Post</legend>

                <div className="uk-margin">
                  <input className="uk-input" ref="postTitle" type="text" placeholder="Title"/>
                </div>

                <div className="uk-margin">
                  <input className="uk-input" ref="postDes" rows="5" placeholder="Summary"></input>
                </div>

                <div className="uk-margin">
                  <textarea className="uk-textarea" ref="postBody" rows="5" placeholder="Post Body"></textarea>
                </div>
              </fieldset>
              <button className="uk-button uk-button-secondary">Post</button>
            </form>
          </div>

          <div className="uk-card-footer">
            <h3><span role="img" aria-label="here">👉🏼</span> Guidelines for posts</h3>
            <ul className="uk-list uk-list-bullet">
              <li>No use of bad language</li>
              <li>No spamming</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {loading, loaded})(withRouter(PostOperations));

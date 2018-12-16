import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import { loading, loaded } from './../../actions/authActions';
import axios from 'axios';

class PostOperations extends Component {
  constructor (props) {
    super(props);
    this.state = ({
      operation: "new",
      slug: null,
      post: {
        author: {}
      },
      postBody: "Post Body",
      tagList: []
    });
    this.handleChange = this.handleChange.bind(this);
    this.handleTags = this.handleTags.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.getPostData = this.getPostData.bind(this);
  }

  componentDidMount () {
    this.setState({
      operation: this.props.match.params.operation,
      slug: this.props.match.params.slug
    });
    if(this.props.match.params.operation === 'edit') {
      this.getPostData();
    }
  }

  handleChange(event) {
    this.setState({postBody: event.target.value});
  }

  handleTags(event) {
    this.setState({tagList: event.target.value.split(',')});
  }

  getPostData () {
    this.props.loading();
    axios.get('https://cruzz.herokuapp.com/api/post/view/' + this.props.match.params.slug)
    .then(res => {
      this.setState({
        post: res.data.post,
        postBody: res.data.post.body,
        tagList: res.data.post.tagList
      });
      this.props.loaded();
    }).catch(err => {
      console.log(err.response);
      this.props.loaded();
    });
    this.props.loaded();
  }

  handlePost(event) {
    this.props.loading();
    const createPostURI = 'https://cruzz.herokuapp.com/api/post/create/';
    const editPostURI = 'https://cruzz.herokuapp.com/api/post/update/' + this.state.slug + '/';
    let handlePostURI = '';
    if(this.state.operation === 'new') {
      handlePostURI = createPostURI;
    } else {
      handlePostURI = editPostURI;
    }
    const postData = {
      post: {
        title: this.refs.postTitle.value,
        body: this.refs.postBody.value,
        tagList: this.state.tagList
      }
    };
    axios.post(handlePostURI, postData)
    .then(res => {
      this.setState({
        post: res.data.post
      });
      console.log(res.data);
      this.props.history.push('/view/post/' + res.data.post.slug);
      this.props.loaded();
    }).catch(err => {
      console.log(postData);
      console.log(err.response);
      this.props.loaded();
    });
    this.props.loaded();
    event.preventDefault();
  }

  render () {
    return (
      <div className="uk-container uk-align-center uk-margin-remove-bottom" data-uk-scrollspy="cls: uk-animation-slide-bottom-medium; target: > div; delay: 40;">
        <div className="uk-card uk-card-default uk-card-hover">

          <div className="uk-card-body">
            <form onSubmit={this.handlePost.bind(this)}>
              <fieldset className="uk-fieldset">
                {
                  this.state.operation === "new" ?
                  (
                    <legend className="uk-legend">New Post</legend>
                  ): (
                    <legend className="uk-legend">Edit Post</legend>
                  )
                }


                <div className="uk-margin">
                  {
                    this.state.operation === "edit" ?
                    (
                      <input className="uk-input" ref="postTitle" type="text" maxlength="70" defaultValue={this.state.post.title} placeholder="Title"/>
                    ): (
                      <input className="uk-input" ref="postTitle" type="text" maxlength="70" placeholder="Title" required={true}/>
                    )
                  }
                </div>

                <div>
                  <p>Character limit is 70</p>
                </div>

                <div className="uk-margin">
                  {
                    this.state.operation === "edit" ?
                    (
                      <textarea className="uk-textarea" ref="postBody" rows="5" value={this.state.postBody} onChange={this.handleChange} placeholder="Post Body"></textarea>
                    ): (
                      <textarea className="uk-textarea" ref="postBody" rows="5" placeholder="Post Body" required={true}></textarea>
                    )
                  }
                </div>
                <div className="uk-margin">
                  {
                    this.state.operation === "edit" ?
                    (
                      <input className="uk-input" name="tagList[]" ref="tagList" rows="5" value={this.state.tagList} onChange={this.handleTags} placeholder="comma separated tags"/>
                    ): (
                      <input className="uk-input" name="tagList[]" ref="tagList" rows="5" value={this.state.tagList} onChange={this.handleTags} placeholder="comma separated tags"/>
                    )
                  }
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

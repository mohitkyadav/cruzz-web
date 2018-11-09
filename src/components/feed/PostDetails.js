import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom';

import { loading, loaded } from './../../actions/authActions';
import axios from 'axios';
import PostFeed from "./PostFeed";

import spinner from '../../static/img/index.svg';


class PostDetails extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      posts: [],
      comments: []
    });
    this.getComments = this.getComments.bind(this);
    this.handleComment = this.handleComment.bind(this);
  }

  componentDidMount() {
    this.props.loading();
    axios.get('https://cruzz.herokuapp.com/api/post/view/' + this.props.match.params.slug + '/')
    .then(res => {
      this.setState({
        posts: [res.data.post]
      });
      this.props.loaded();
      this.getComments();
    }).catch(err => {
      console.log(err.response);
      this.props.loaded();
    });
  }

  handleComment(event) {
    const URI = 'https://cruzz.herokuapp.com/api/post/' + this.props.match.params.slug + '/comments/create/';
    const comment = {
      comment : {
        body: this.refs.commentBody.value
      }
    }
    axios.post(URI, comment).then(res => {
      console.log(res.data);
      this.refs.commentBody.value = '';
      this.getComments();
    }).catch(err => {
      console.log(err.response);
    });
    event.preventDefault();
  }

  getComments() {
    const URI = 'https://cruzz.herokuapp.com/api/post/' + this.props.match.params.slug + '/comments/view?limit=100&offset=0';
    axios.get(URI).then(res => {
      this.setState({
        comments: res.data.comments
      });
      console.log(res.data);
    }).catch(err => {
      console.log(err.response);
    });
  }

  handleDateTime(date) {
    const dateLocal = new Date(date);
    const timeLocal = dateLocal.toLocaleTimeString();
    return (String(dateLocal.toDateString()) + " " + timeLocal);
  }

  render() {
    return (
      <div className="uk-container uk-align-center uk-margin-remove-bottom" data-uk-scrollspy="cls: uk-animation-slide-bottom-medium; target: > div; delay: 40;">
        {
          this.state.posts.length > 0 ? (
            <div>
              {this.state.posts.map((post, key) => {
                return (
                  <div key={key} data-uk-scrollspy="cls: uk-animation-slide-bottom-medium; target: > div; delay: 40;">
                    <PostFeed post={post} full={true}/>
                    <div className="uk-card uk-card-secondary uk-box-shadow-large uk-align-center uk-width-4-5@m">
                      <form className="uk-padding-small" onSubmit={this.handleComment.bind(this)}>
                        <input className="uk-input uk-form-large" ref="commentBody" type="text" placeholder="type your comment..."/>
                        <button className="uk-button uk-button-default uk-margin-small-top uk-margin-small-bottom uk-align-center uk-width-2-5" type="submit">comment</button>
                      </form>
                    </div>
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

        <div>
            {
              this.state.comments.length > 0 ? (
                <div>
                  {this.state.comments.map((comment, key) => {
                    return (
                      <div key={key}>

                        <div className="uk-card uk-card-default uk-align-center uk-width-4-5@m">

                        <div className="uk-card-header uk-padding-remove-bottom">
                          <div className="uk-grid-small uk-flex-inline" datauk-grid="true">
                            <div className="uk-width-auto">
                              <img className="uk-border-circle" width="40" alt="" height="40" src={comment.author.image}/>
                            </div>
                            <div className="uk-width-expand">
                              <h4 className="uk-margin-remove-bottom">{comment.author.first_name}</h4>
                              <p className="uk-text-meta uk-margin-remove-top"><time dateTime="2016-04-01T19:00"> commented on {this.handleDateTime(comment.createdAt)}</time></p>
                            </div>
                          </div>
                        </div>

                        <div className="uk-card-body">
                            <p>{comment.body}</p>
                        </div>

                        <div className="uk-card-footer uk-width-1-1 uk-flex-inline">
                          <div className="uk-animation-scale-down">
                            <Link to="#" className="uk-icon-button uk-button-secondary" data-uk-icon="file-edit" data-uk-tooltip="title: edit; pos: bottom-center"></Link>
                          </div>
                          <div className="uk-margin-small-left uk-animation-scale-down">
                            <Link to="#" className="uk-icon-button uk-text-danger uk-button-secondary" data-uk-icon="trash" data-uk-tooltip="title: delete; pos: bottom-center"></Link>
                          </div>
                        </div>

                        </div>
                      </div>
                    )
                  })}
                </div>
              ):null
            }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {loading, loaded})(withRouter(PostDetails));

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
      comments: [],
      commentBody: ''
    });
    this.getComments = this.getComments.bind(this);
    this.handleComment = this.handleComment.bind(this);
    this.handleCommentBody = this.handleCommentBody.bind(this);
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

  handleCommentBody(event) {
    this.setState({
      commentBody: event.target.value
    });
    event.preventDefault();
  }

  deleteComment(event, pk) {
    const delURI = 'https://cruzz.herokuapp.com/api/post/' + this.props.match.params.slug + '/comments/delete/' + pk  + '/';
    axios.get(delURI).then(res => {
      this.getComments();
    }).catch(err => {
      console.log(err.response);
    });
    event.preventDefault();
  }

  editComment(event, pk) {
    const edtURI = 'https://cruzz.herokuapp.com/api/post/' + this.props.match.params.slug + '/comments/update/' + pk  + '/';
      let comment = {
        comment : {
          body: this.state.commentBody
        }
      }
      this.props.loading()
      axios.post(edtURI, comment).then(res => {
        this.setState({
          commentBody: ''
        });
        this.getComments();
      }).catch(err => {
        console.log(err.response);
        this.props.loaded()
      });

    event.preventDefault();
  }

  handleComment(event) {

    const createURI = 'https://cruzz.herokuapp.com/api/post/' + this.props.match.params.slug + '/comments/create/';
    let comment = {
      comment : {
        body: this.state.commentBody
      }
    }
    axios.post(createURI, comment).then(res => {
      this.setState({
        commentBody: ''
      });
      this.getComments();
    }).catch(err => {
      console.log(err.response);
    });
    event.preventDefault();
  }

  getComments() {
    this.props.loading()
    const URI = 'https://cruzz.herokuapp.com/api/post/' + this.props.match.params.slug + '/comments/view?limit=100&offset=0';
    axios.get(URI).then(res => {
      this.setState({
        comments: res.data.comments.reverse()
      });
      this.props.loaded()
    }).catch(err => {
      console.log(err.response);
      this.props.loaded()
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
                        <input className="uk-input uk-form-large" ref="commentBody" value={this.state.commentBody} onChange={this.handleCommentBody} type="text" placeholder="type your comment..."/>
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
                          <div className="uk-grid-small uk-width-1-1 uk-flex-inline" datauk-grid="true">
                            <div className="uk-width-auto">
                              <img className="uk-border-circle" width="40" alt="" height="40" src={comment.author.image}/>
                            </div>
                            <div className="uk-width-1-1">
                              <Link className="uk-link-heading" to={
                                  comment.author.username === this.props.auth.user.username ? ("/profile/" + this.props.auth.user.username)
                                  : ("/profile/" + comment.author.username)
                                }>{comment.author.first_name}
                              </Link>
                              {
                                comment.author.username === this.state.posts[0].author.username ? (
                                  <span className="uk-margin-small-left uk-align-right" uk-icon="star" data-uk-tooltip="title: author; pos: top"></span>
                                ) : null
                              }
                              {
                                comment.author.official_page ? (
                                  <span className="uk-margin-small-left uk-align-right uk-animation-scale-down" uk-icon="check" data-uk-tooltip="title: official; pos: top"></span>
                                ): null
                              }
                              <p className="uk-text-meta uk-margin-remove-top"><time dateTime="2016-04-01T19:00"> commented on {this.handleDateTime(comment.createdAt)}</time></p>
                            </div>
                          </div>
                        </div>

                        <div className="uk-card-body">
                          <p>{comment.body}</p>
                        </div>

                        <div className="uk-card-footer uk-width-1-1 uk-flex-inline">
                          {
                            this.props.auth.user.username === comment.author.username ? (
                            <div className="uk-animation-scale-down">

                              <button data-uk-toggle={"target: #edt-cmnt-" + comment.id} className="uk-icon-button uk-button-secondary" data-uk-icon="file-edit" data-uk-tooltip="title: edit; pos: bottom-center"></button>
                              <div id={"edt-cmnt-"+comment.id} data-uk-modal="true">
                                <div className="uk-modal-dialog uk-modal-body">
                                  <form className="uk-padding-small" onSubmit={(e) => this.editComment(e, comment.id)}>
                                    <input className="uk-input uk-form-large" onChange={this.handleCommentBody} defaultValue={comment.body} ref="commentBody" type="text" placeholder="type your comment..."/>
                                    <p>
                                      hit enter to update your comment or click cancel to go back
                                    </p>
                                    <div className="uk-flex-inline uk-width-1-1">
                                      <button className="uk-button uk-button-secondary uk-margin-small-top uk-modal-close" type="button">Cancel</button>
                                      {
                                        this.props.auth.loading ? (
                                          <div className="uk-text-right uk-align-right uk-margin-small-right uk-animation-scale-up" data-uk-spinner="ratio: 2"></div>
                                        ) : (<span className="uk-margin-small-right uk-align-right uk-animation-scale-down uk-text-success uk-animation-reverse" data-uk-icon="icon: check; ratio: 2"></span>)
                                      }
                                    </div>
                                  </form>
                                </div>
                              </div>

                            </div>): null
                          }
                          {
                            this.props.auth.user.username === comment.author.username ? (
                              <div className="uk-animation-scale-down">
                                <Link to="#" className="uk-icon-button uk-text-danger uk-margin-small-left uk-button-secondary" onClick={ (e) => this.deleteComment(e, comment.id)} data-uk-icon="trash" data-uk-tooltip="title: delete; pos: bottom-center"></Link>
                              </div>
                            ): null
                          }
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

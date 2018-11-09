import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import axios from 'axios';
import { loading, loaded } from './../../actions/authActions';

class PostFeed extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      upvotes: 0,
      downvotes: 0,
      comments: 0,
      shares: 0,
      post: {
        author: {},
        tagList: []
      }
    };
    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
    this.favoritePost = this.favoritePost.bind(this);
    this.share = this.share.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.handleDateTime = this.handleDateTime.bind(this);
  }

  dangerous(html) {
    return {
      __html: html
    }
  }
  upVote(e) {
    this.props.loading();
    const URI = 'https://cruzz.herokuapp.com/api/post/' + this.state.post.slug + '/upvote/';
    if(this.state.post.upvoted) {
      axios.delete(URI).then(res => {
        this.setState({
          post: res.data.post
        });
        this.props.loaded();
      }).catch(err => {
        console.log(err.response);
        this.props.loaded();
      });
    } else {
      axios.get(URI).then(res => {
        console.log(res.data);
        this.setState({
          post: res.data.post
        });
        if(this.state.post.downvoted) {
          this.downVote();
        }
      }).catch(err => {
        console.log(err.response);
      });
      this.props.loaded();
    }
  }

  downVote(e) {
    const URI = 'https://cruzz.herokuapp.com/api/post/' + this.state.post.slug + '/downvote/';
    if(this.state.post.downvoted) {
      axios.delete(URI).then(res => {
        this.setState({
          post: res.data.post
        });
        this.props.loaded();
      }).catch(err => {
        console.log(err.response);
        this.props.loaded();
      });
    } else {
      axios.get(URI).then(res => {
        console.log(res.data);
        this.setState({
          post: res.data.post
        });
        if(this.state.post.upvoted) {
          this.upVote();
        }
      }).catch(err => {
        console.log(err.response);
      });
    }
  }

  favoritePost(e) {
    const URI = 'https://cruzz.herokuapp.com/api/post/' + this.state.post.slug + '/favorite/';
    if(this.state.post.favorited) {
      axios.delete(URI).then(res => {
        this.setState({
          post: res.data.post
        });
      }).catch(err => {
        console.log(err.response);
      });
    } else {
      axios.get(URI).then(res => {
        console.log(res.data);
        this.setState({
          post: res.data.post
        });
      }).catch(err => {
        console.log(err.response);
      });
    }
  }

  share(e) {
    // console.log(e);
    let shares = this.state.shares;
    this.setState({ shares: shares + 1});
  }

  componentDidMount() {
    this.setState({
      post: this.props.post
    });
    console.log(this.props.post);
  }

  deletePost() {
    const URI = 'https://cruzz.herokuapp.com/api/post/' + this.state.post.slug + '/delete/'
    axios.get(URI).then(res => {
      console.log(res.data);
      this.props.history.push('/');
    }).catch(err => {
      console.log(err.response);
    })
  }

  handleDateTime(date) {
    const dateLocal = new Date(date);
    const timeLocal = dateLocal.toLocaleTimeString();
    return (String(dateLocal.toDateString()) + " " + timeLocal);
  }

  render() {
    return (
      <div className="uk-container uk-padding-small uk-width-1-1">

        <div className="uk-card uk-card-default uk-align-center uk-width-1-1@m uk-box-shadow-hover-medium uk-box-shadow-small">

          <div className="uk-card-header">
            <div className="uk-grid-small uk-flex-inline" data-uk-grid="true">
              <div className="uk-width-auto">
                <img className="uk-border-circle" width="40" height="40" alt="" src={this.state.post.author.image}/>
              </div>
              <div className="uk-width-expand">
                <h5 className="uk-margin-remove-bottom">
                  <Link className="uk-link-heading" to={"/view/post/" + this.state.post.slug}>
                    {this.state.post.title}
                  </Link>
                </h5>
                <p className="uk-margin-remove-top">
                  <Link className="uk-link-heading" to={
                    this.state.post.author.username !== this.props.auth.user.username ? ("/user/" + this.state.post.author.username)
                    : ("/profile/" + this.state.post.author.username)
                  }>{this.state.post.author.username}</Link>
                  &nbsp;
                  posted on
                  &nbsp;
                  <time className="uk-text-meta" dateTime={this.state.post.createdAt}>{this.handleDateTime(this.state.post.createdAt)}</time>
                </p>
              </div>
            </div>
            <div className="uk-flex-inline uk-align-right">
              {this.state.post.tagList.map(
                (tag, key) => {
                  return(
                    <label className="uk-badge uk-label-success uk-padding-small uk-margin-small-left uk-margin-remove-top uk-animation-scale-up" key={key}>
                      {tag}
                    </label>
                  )
                }
              )}
            </div>
          </div>

          <div className="uk-card-body">
            <div className="uk-margin-small-top" dangerouslySetInnerHTML={this.dangerous(this.state.post.body)}></div>
          </div>

          <div className="uk-card-footer">

            <div className="uk-flex-inline">

              <div>
                <Link to="#"  className={this.state.post.upvoted ? ("uk-icon-button uk-button-primary uk-animation-scale-down"): ("uk-icon-button uk-button-default")} onClick={this.upVote} data-uk-icon="arrow-up" data-uk-tooltip="title: upvote; pos: bottom-center"></Link>
                <span className="uk-badge uk-label-success">{this.state.post.upvotesCount}</span>
              </div>

              <div className="uk-margin-small-left">
                <Link to="#" className={this.state.post.downvoted ? ("uk-icon-button uk-button-primary uk-animation-scale-down"): ("uk-icon-button uk-button-default")} onClick={this.downVote} data-uk-icon="arrow-down" data-uk-tooltip="title: downvote; pos: bottom-center"></Link>
                <span className="uk-badge uk-label-danger">{this.state.post.downvotesCount}</span>
              </div>

              <div className="uk-margin-small-left">
                <Link to="#"  className={this.state.post.favorited ? ("uk-icon-button uk-button-danger uk-animation-scale-down"): ("uk-icon-button uk-button-default")} onClick={this.favoritePost} data-uk-icon="heart" data-uk-tooltip="title: add to favorites; pos: bottom-center"></Link>
                <span className="uk-badge uk-label-danger">{this.state.post.favoritesCount}</span>
              </div>

              <div className="uk-margin-small-left">
                {
                  this.props.full ?
                  (
                    <Link to="#" className="uk-icon-button uk-button-default" data-uk-icon="comments" data-uk-tooltip="title: comments; pos: bottom-center"></Link>
                  ): (
                    <Link to={'/view/post/' + this.state.post.slug} className="uk-icon-button uk-button-default" data-uk-icon="comments" data-uk-tooltip="title: comment; pos: bottom-center"></Link>
                  )
                }
                <span className="uk-badge">{this.state.comments}</span>
              </div>

            </div>
            <div className="uk-flex-inline uk-align-right@s">
              {
                this.props.auth.user.username === this.state.post.author.username ?
                (
                  <div className="uk-margin-small-left">
                    <Link to={'/edit/post/' + this.state.post.slug} className="uk-icon-button uk-button-secondary uk-animation-scale-down" data-uk-icon="file-edit" data-uk-tooltip="title: edit; pos: bottom-center"></Link>
                  </div>
                ):null
              }
              {
                this.props.auth.user.username === this.state.post.author.username ?
                (
                  <div className="uk-margin-small-left">
                    <Link to="#" onClick={this.deletePost} className="uk-icon-button uk-button-secondary uk-text-danger  uk-animation-scale-down" data-uk-icon="trash" data-uk-tooltip="title: delete; pos: bottom-center"></Link>
                  </div>
                ):null
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

export default connect(mapStateToProps, {loading, loaded})(withRouter(PostFeed));

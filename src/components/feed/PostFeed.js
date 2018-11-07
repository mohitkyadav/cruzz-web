import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';

class PostFeed extends Component {
  constructor (props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      upvotes: 0,
      downvotes: 0,
      comments: 0,
      shares: 0,
      post: {
        author: {}
      }
    };
    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
    this.comment = this.comment.bind(this);
    this.share = this.share.bind(this);
    this.handleDateTime = this.handleDateTime.bind(this);
  }

  upVote (e) {
    // console.log(e);
    let upvotes = this.state.upvotes;
    this.setState({ upvotes: upvotes + 1});
  }

  downVote (e) {
    // console.log(e);
    let downvotes = this.state.downvotes;
    this.setState({ downvotes: downvotes + 1});
  }

  comment (e) {
    // console.log(e);
    let comments = this.state.comments;
    this.setState({ comments: comments + 1});
  }

  share (e) {
    // console.log(e);
    let shares = this.state.shares;
    this.setState({ shares: shares + 1});
  }

  componentDidMount () {
    this.setState({
      post: this.props.post
    });
  }

  handleDateTime (date) {
    const year = String(date).split('-')[0];
    const month = String(date).split('-')[1];
    const day = String(String(date).split('-')[2]).split('T')[0];
    const time = String(date).split('T')[1];
    const hour = String(time).split(':')[0];
    const minutes = String(time).split(':')[1];
    console.log(year);
    console.log(month);
    console.log(day);
    console.log(hour);
    console.log(minutes);
  }

  render () {
    return (
      <div className="uk-container uk-padding-small uk-width-1-1" data-uk-scrollspy="cls: uk-animation-slide-bottom-medium; target: > div; delay: 40;">

        <div className="uk-card uk-card-default uk-align-center uk-width-1-1@m uk-box-shadow-hover-medium uk-box-shadow-small">

          <div className="uk-card-header">
            <div className="uk-grid-small uk-flex-inline" data-uk-grid="true">
              <div className="uk-width-auto">
                <img className="uk-border-circle" width="40" height="40" alt="" src={this.state.post.author.image}/>
              </div>
              <div className="uk-width-expand">
                <h5 className="uk-margin-remove-bottom">{this.state.post.title}</h5>
                  <p className="uk-margin-remove-top">
                    <Link className="uk-link-heading" to={
                      this.state.post.author.username !== this.props.auth.user.username ? ("/user/" + this.state.post.author.username)
                      : "/profile"
                    }>{this.state.post.author.username}</Link>
                    &nbsp;
                    posted on
                    &nbsp;
                    <time className="uk-text-meta" dateTime={this.state.post.createdAt}>{this.handleDateTime(this.state.post.createdAt)}{this.state.post.createdAt}</time>
                  </p>
              </div>
            </div>
          </div>

          <div className="uk-card-body">
            <p>{this.state.post.description}</p>
          </div>

          <div className="uk-card-footer">
            <div className="uk-flex-inline">
              <div>
                <Link to="#" className="uk-icon-button uk-button-default" onClick={this.upVote} data-uk-icon="arrow-up" data-uk-tooltip="title: upvote; pos: bottom-center"></Link>
                <span className="uk-badge uk-label-success">{this.state.upvotes}</span>
              </div>
              <div className="uk-margin-small-left">
                <Link to="#" className="uk-icon-button uk-button-default" onClick={this.downVote} data-uk-icon="arrow-down" data-uk-tooltip="title: downvote; pos: bottom-center"></Link>
                <span className="uk-badge uk-label-danger">{this.state.downvotes}</span>
              </div>
              <div className="uk-margin-small-left">
                <Link to="#" className="uk-icon-button uk-button-default" onClick={this.comment} data-uk-icon="comments" data-uk-tooltip="title: comment; pos: bottom-center"></Link>
                <span className="uk-badge">{this.state.comments}</span>
              </div>
              <div className="uk-margin-small-left">
                <Link to="#" className="uk-icon-button uk-button-default" onClick={this.share} data-uk-icon="forward" data-uk-tooltip="title: share; pos: bottom-center"></Link>
                <span className="uk-badge">{this.state.shares}</span>
              </div>
              <div className="uk-margin-small-left">
                <Link to="#" className="uk-icon-button uk-button-default" data-uk-icon="expand" data-uk-tooltip="title: read full thread; pos: bottom-center"></Link>
              </div>
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

export default connect(mapStateToProps, {})(withRouter(PostFeed));

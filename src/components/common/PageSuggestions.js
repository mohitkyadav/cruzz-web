import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import '../../static/css/common.css';
import spinner from '../../static/img/index.svg';
import { connect } from 'react-redux';
import { loading, loaded } from './../../actions/authActions';
import axios from 'axios';

class PageSuggestions extends Component {

  constructor(props) {
    super(props);
    this.state = ({
      full: true,
      suggestedPages: {}
    });
    this.suggestPages = this.suggestPages.bind(this);
  }

  componentDidMount() {
    this.suggestPages();
    if(this.props.full === false) {
      this.setState({
        full: this.props.full
      });
    }
  }

  suggestPages() {
    const URI = 'https://cruzz.herokuapp.com/api/profile/discover/pages/';
    axios.get(URI).then(res => {
      this.setState({
        suggestedPages: res.data.profiles.slice(0,2)
      })
    }).catch(err => {
      console.log(err.response);
    });
  }

  render() {
    return (
      <div className={ this.state.full ? ("uk-container uk-margin-medium-top"): null}>
        <div className="uk-card uk-text-left uk-card-default uk-box-shadow-hover-small">
          <div className="uk-card-body uk-padding-remove">
            <div className="uk-padding-small uk-flex-inline">
              <p className="uk-margin-remove-bottom uk-margin-small-right">Official Pages You might</p>
              <span uk-icon="icon: heart; ratio: 1;" style={{ color: 'red' }}></span>
            </div>

            {
              this.state.suggestedPages.length > 0 ? (
                <div>
                  {this.state.suggestedPages.map((f, key) => {
                    return (
                      <ul className="uk-list" key={key}>
                        {
                          this.props.auth.user.username !== f.username ? (
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
                          ): null
                        }
                      </ul>
                    )
                  })}
                </div>
              ):(
                <div>
                  <div className="uk-padding-small">
                  {
                    this.state.suggestedPages.length === 0 ?
                    (<h4>No suggestions for you </h4>) :
                    (<img alt="loading" className="uk-align-center" src={spinner}></img>)
                  }
                  </div>
                </div>
              )
            }

            <hr className="uk-margin-remove"/>
          </div>
          {
            !this.state.full ? (
              <div className="uk-card-footer uk-padding-remove-right">
                <Link to="/discover/pages" className="uk-button uk-button-text">Discover more</Link>
              </div>
            ):null
          }
        </div>
      </div>

    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { loading, loaded })(withRouter(PageSuggestions));

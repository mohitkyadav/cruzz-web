import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import '../../static/css/common.css';
import logo from '../../static/img/index.svg';
import logoNoSpin from '../../static/img/index-no-spin.svg';

import { signOut } from './../../actions/authActions';

class Header extends Component {
  signOut() {
    this.props.signOut(this.props.history);
  }

  render() {
    let spinner;

    if (!this.props.auth.loading) {
      spinner = (
        <ul className="uk-navbar-nav">
          <li>
            <img src={logoNoSpin} width="100px" className="loading" alt="logo" />
          </li>
        </ul>
      );
    } else {
      spinner = (
        <ul className="uk-navbar-nav">
          <li>
            <img src={logo} width="100px" className="loading" alt="logo" />
          </li>
        </ul>
      );
    }

    return (
      <div>
        <nav className="uk-navbar-container uk-box-shadow-large" uk-navbar="true" uk-sticky="show-on-up: true; animation: uk-animation-slide-top;">
          <div className="uk-navbar-left ov-nav-section">
            <ul className="uk-navbar-nav">
              <li><Link className="ov-color-white ov-nav-link" to="/"><span uk-icon="icon: home; ratio: 1.15"></span></Link></li>
            </ul>

            <div>
              <Link to="#" className="uk-navbar-toggle ov-color-white ov-nav-link" uk-icon="icon: search"></Link>
              <div className="uk-navbar-dropdown uk-padding-small uk-width-large@m uk-width-medium" uk-drop="mode: click; cls-drop: uk-navbar-dropdown; boundary: !nav; animation: uk-animation-slide-left-small;">

                <div className="uk-grid-small uk-flex-middle" uk-grid="true">
                  <div className="uk-width-expand">
                    <form className="uk-search uk-search-navbar uk-width-1-1">
                      <input className="uk-search-input" type="search" placeholder="Search tags..." autoFocus/>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="uk-navbar-center ov-nav-section">
            {spinner}
          </div>
          <div className="uk-navbar-right ov-nav-section">
            <ul className="uk-navbar-nav">
              {
                this.props.auth.authenticated ? (
                <li><Link className="ov-color-white ov-nav-link" to={'/profile/' + this.props.auth.user.username} uk-icon="icon: user; ratio: 1.2" uk-tooltip={ `title: ${this.props.auth.user.first_name}; pos: bottom-center `}></Link></li>
                ):
                null
              }
              {
                this.props.auth.authenticated ? (
                  <li><Link className="ov-color-white ov-nav-link" to="#" uk-toggle="target: #offcanvas-push" uk-icon="icon: bell; ratio: 1.2" uk-tooltip="title: Notifications; pos: bottom-center"></Link></li>
                ):
                null
              }
              {/* {
                this.props.auth.authenticated ? (
                  <li><Link className="ov-color-white ov-nav-link" to="/" uk-icon="icon: rss; ratio: 1.2" uk-tooltip="title: Feed; pos: bottom-center"></Link></li>
                ):
                null
              } */}
              {
                this.props.auth.authenticated ?
                <li><Link className="ov-color-white ov-nav-link" onClick={this.signOut.bind(this)} to="#" uk-icon="icon: sign-out; ratio: 1.2" uk-tooltip="title: Sign out; pos: bottom-center"></Link></li> :
                <li><Link className="ov-color-white ov-nav-link" to="/login" uk-icon="icon: sign-in; ratio: 1.2" uk-tooltip="title: Sign in; pos: bottom-center"></Link></li>
              }
            </ul>
          </div>
        </nav>
        <div id="offcanvas-push" data-uk-offcanvas="mode: push; overlay: true">
          <div className="uk-offcanvas-bar">

            <button className="uk-offcanvas-close" type="button" data-uk-close="true"></button>

            <h3>Notifications</h3>

            <p>Comming soon.</p>

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {signOut})(withRouter(Header));

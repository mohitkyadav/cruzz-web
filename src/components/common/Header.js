import React, { Component } from "react";
import { Link } from "react-router-dom";

import '../../static/css/common.css';

class Header extends Component {
  render() {
    return (
      <div>
        <nav className="uk-navbar-container uk-box-shadow-large" uk-navbar="true" uk-sticky="show-on-up: true; animation: uk-animation-slide-top;">
          <div className="uk-navbar-left">
            <ul className="uk-navbar-nav">
              <li><Link className="ov-color-white ov-nav-link" to="/"><span uk-icon="icon: home; ratio: 1.15"></span></Link></li>
            </ul>

            <div>
              <Link to="#" className="uk-navbar-toggle ov-color-white ov-nav-link" uk-icon="icon: search"></Link>
              <div className="uk-navbar-dropdown uk-padding-small uk-width-large@m uk-width-medium" uk-drop="mode: click; cls-drop: uk-navbar-dropdown; boundary: !nav; animation: uk-animation-slide-left-small;">

                <div className="uk-grid-small uk-flex-middle" uk-grid>
                  <div className="uk-width-expand">
                    <form className="uk-search uk-search-navbar uk-width-1-1">
                      <input className="uk-search-input" type="search" placeholder="Search..." autofocus/>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="uk-navbar-right">
            <ul className="uk-navbar-nav">
              <li><Link className="ov-color-white ov-nav-link" to="#" uk-icon="icon: bell; ratio: 1.2" uk-tooltip="title: Notifications; pos: bottom-center"></Link></li>
              <li><Link className="ov-color-white ov-nav-link" to="#" uk-icon="icon: user; ratio: 1.2" uk-tooltip="title: Profile; pos: bottom-center"></Link></li>
              <li><Link className="ov-color-white ov-nav-link" to="#" uk-icon="icon: cog; ratio: 1.2" uk-tooltip="title: Settings; pos: bottom-center"></Link></li>
              <li><Link className="ov-color-white ov-nav-link" to="/login" uk-icon="icon: sign-in; ratio: 1.2" uk-tooltip="title: Sign in; pos: bottom-center"></Link></li>
              <li><Link className="ov-color-white ov-nav-link" to="#" uk-icon="icon: sign-out; ratio: 1.2" uk-tooltip="title: Sign out; pos: bottom-center"></Link></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;

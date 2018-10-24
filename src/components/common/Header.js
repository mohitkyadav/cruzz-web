import React, { Component } from "react";
import { Link } from "react-router-dom";

import './header.css';

class Header extends Component {
  render() {
    return (
      <div>
        <nav className="uk-navbar-container" uk-navbar="true" uk-sticky="show-on-up: true;animation: uk-animation-slide-top;">
          <div className="uk-navbar-left">
            <ul className="uk-navbar-nav">
              <li><Link to="/">Home</Link></li>
            </ul>

            <div>
              <Link to="#" className="uk-navbar-toggle" uk-icon="icon: search"></Link>
              <div className="uk-navbar-dropdown" uk-drop="mode: click; cls-drop: uk-navbar-dropdown; boundary: !nav">

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

          <div className="uk-navbar-right uk-margin-small-right">
            <ul className="uk-navbar-nav">
              <ul className="uk-iconnav">
                <li><Link to="#" uk-icon="icon: home; ratio: 1.2" uk-tooltip="title: Home; pos: bottom-center"></Link></li>
                <li><Link to="#" uk-icon="icon: bell; ratio: 1.2" uk-tooltip="title: Notifications; pos: bottom-center"></Link></li>
                <li><Link to="#" uk-icon="icon: user; ratio: 1.2" uk-tooltip="title: Profile; pos: bottom-center"></Link></li>
                <li><Link to="#" uk-icon="icon: cog; ratio: 1.2" uk-tooltip="title: Settings; pos: bottom-center"></Link></li>
              </ul>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;

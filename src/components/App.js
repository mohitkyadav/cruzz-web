import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import '../static/css/style.css';
import logo from '../static/img/index.svg';


class App extends Component {
  render() {
    let spinner;

    if (!this.props.auth.loading) {
      spinner = null;
    } else {
      spinner = (
        <img src={logo} width="100px" className="loading uk-align-center" alt="logo" />
      );
    }
    return (
      <div className="App">
        <div className="uk-align-center uk-height-1-1 uk-width-1-1">
          {spinner}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(App));

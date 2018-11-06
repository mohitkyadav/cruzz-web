import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import fireStorage from "../../firebase";

import coverPhoto from '../../static/img/retro-hop.jpg';
// import spinner from '../../static/img/index.svg';
// import avtar from '../../static/img/avtar.jpg'
import PageSuggestions from "../common/PageSuggestions";


class ProfilePage extends Component {

  updateProfile(event) {
    console.log("prolo");
    console.log(this.refs.new_first_name.value);
    console.log(this.refs.new_last_name.value);
    console.log(this.refs.new_email.value);
    console.log(this.refs.new_bio.value);
    event.preventDefault();
  }

  uploadCoverPic(event) {
    console.log("yolo");
    console.log(event.target.files[0]);
    const image = event.target.files[0];
    // console.log(image.name);
    let uploadTask = fireStorage.ref(`covers/${image.name}`).put(image);
    uploadTask.on('state_changed',
      (snapshot) => {
        console.log("uploading");
      },
      (error) => {
        console.log(error);
      },
      () => {
        fireStorage.ref('covers').child(image.name).getDownloadURL().then(
          url => {
            console.log(url)
          }
        );
      }
    )
    event.preventDefault();
  }

  uploadProfilePic(event) {
    console.log("yolo");
    console.log(event.target.files[0]);
    const image = event.target.files[0];
    // console.log(image.name);
    let uploadTask = fireStorage.ref(`dp/${image.name}`).put(image);
    uploadTask.on('state_changed',
      (snapshot) => {
        console.log("uploading");
      },
      (error) => {
        console.log(error);
      },
      () => {
        fireStorage.ref('dp').child(image.name).getDownloadURL().then(
          url => {
            console.log(url)
          }
        );
      }
    )
    event.preventDefault();
  }

  updateProfilePic() {
    // this.props.dispatch(action());
    // this.refs.dp.click();
    document.getElementById("dp").click();
  }

  updateCoverPic() {
    // this.props.dispatch(action());
    // this.refs.dp.click();
    document.getElementById("cover").click();
  }

  render() {

    return (
      <div>
        <div className="uk-container uk-padding-small" data-uk-scrollspy="cls: uk-animation-slide-bottom-medium; target: > div; delay: 40;">

          <div className="uk-margin-medium-bottom">
            <div className="uk-height-medium uk-background-cover uk-light uk-flex" data-uk-parallax="bgy: -200"
            style={{
              backgroundImage: `url(${
                this.props.auth.userProfile.cover === "https://thumb.ibb.co/eN5O0f/temp.jpg" ? coverPhoto : this.props.auth.userProfile.cover
              })`}}>

              <div className="uk-overlay uk-overlay-primary uk-position-bottom uk-padding-remove">
                <div className="uk-grid-small uk-flex-inline" uk-grid="true">

                  <div className="uk-width-auto">
                    <div className="uk-inline-clip uk-transition-toggle" tabIndex="0">
                      <img className="uk-transition-scale-down ov-curser-pointer uk-transition-opaque" width="150" src={this.props.auth.userProfile.image} onClick={(e) => this.updateProfilePic(e)} alt="" data-uk-tooltip="title: Upload new Profile Picture; pos: bottom-center"/>
                      <div className="uk-position-center">
                        <form style={{ display: 'none' }} onSubmit={this.uploadProfilePic.bind(this)}>
                          <input id="dp" name="dp" type="file" ref="dp" onChange={(e) => this.uploadProfilePic(e)}/>
                        </form>
                        <span className="uk-transition-slide-bottom-small ov-curser-pointer" onClick={(e) => this.updateProfilePic(e)} uk-icon="icon: cloud-upload; ratio: 3"></span>
                      </div>
                    </div>
                  </div>

                  <div className="uk-width-expand uk-align-center">
                    <div className="uk-width-1-1" data-uk-grid="true">
                      <div className="uk-width-auto">
                        <h3 className="uk-card-title uk-margin-remove-bottom">{this.props.auth.user.first_name}Mohit Yadav Yadav Yadav</h3>
                        {
                          this.props.auth.userProfile.bio ? (
                            <p className="uk-text-meta uk-margin-remove-top">{this.props.auth.userProfile.bio}dattebayo!</p>
                          ): (<p className="uk-text-meta uk-margin-remove-top uk-margin-remove-bottom">dattebayo!</p>)
                        }
                      </div>
                      <div className="uk-width-expand">
                        <button className="uk-icon-button uk-button-default uk-margin-small-bottom" data-uk-toggle="target: #ov-profile-modal" data-uk-icon="pencil" data-uk-tooltip="title: Edit profile; pos: right"></button>

                        <div id="ov-profile-modal" data-uk-modal="true">
                          <div className="uk-modal-dialog uk-modal-body uk-overflow-auto">
                            <form onSubmit={this.updateProfile.bind(this)}>
                              <fieldset className="uk-fieldset">

                                <legend className="uk-legend">Update  Profile</legend>

                                <div className="uk-margin">
                                  <p>First Name <span className="uk-margin-small-right uk-align-right" data-uk-icon="info" data-uk-tooltip="pos: top; title: Full name if page"></span></p>
                                  <input className="uk-input" ref="new_first_name" defaultValue={this.props.auth.user.first_name ? this.props.auth.user.first_name: ""} type="text" placeholder="First Name"/>
                                </div>

                                <div className="uk-margin">
                                  <p>Last Name <span className="uk-margin-small-right uk-align-right" data-uk-icon="info" data-uk-tooltip="pos: top; title: Leave blank if page"></span></p>
                                  <input className="uk-input" ref="new_last_name" defaultValue={this.props.auth.user.last_name ? this.props.auth.user.last_name: ""} type="text" placeholder="Last Name"/>
                                </div>

                                <div className="uk-margin">
                                  <p>E-mail <span className="uk-margin-small-right uk-align-right" data-uk-icon="info" data-uk-tooltip="pos: top; title: Email"></span></p>
                                  <input className="uk-input" ref="new_email" defaultValue={this.props.auth.user.email ? this.props.auth.user.email: ""} type="email" placeholder="E-mail"/>
                                </div>

                                <div className="uk-margin">
                                  <p>Bio</p>
                                  <textarea className="uk-textarea" ref="new_bio" defaultValue={this.props.auth.user.bio ? this.props.auth.user.bio: ""} rows="5" placeholder="Bio"></textarea>
                                </div>

                                </fieldset>
                                <p className="uk-text-right">
                                  <button className="uk-button uk-button-secondary uk-modal-close" type="button">Cancel</button>
                                  <button className="uk-button uk-button-primary" onSubmit={(e) => this.updateProfile(e)} type="submit">Update</button>
                                </p>
                            </form>

                          </div>
                        </div>

                        <form style={{ display: 'none' }} onSubmit={this.uploadCoverPic.bind(this)}>
                          <input id="cover" name="cover" type="file" ref="cover" onChange={(e) => this.uploadCoverPic(e)}/>
                        </form>

                        <button className="uk-icon-button uk-button-default" onClick={(e) => this.updateCoverPic(e)} data-uk-icon="cloud-upload" data-uk-tooltip="title: Upload cover photo; pos: right"></button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

          <div className="uk-text-center" data-uk-grid="true">
            <div className="uk-width-expand@m">
              <div className="uk-card uk-card-default uk-card-body">Expand</div>
            </div>
            <div className="uk-width-1-3@m">
              <PageSuggestions/>
            </div>
          </div>

          <div className="uk-text-center" data-uk-grid="true">
            <div className="uk-width-expand@m">
              <div className="uk-card uk-card-default uk-card-body">Expand</div>
            </div>
            <div className="uk-width-1-3@m">
              <div className="uk-card uk-card-default uk-card-body">1-3</div>
            </div>
          </div>

          <div className="uk-text-center" data-uk-grid="true">
            <div className="uk-width-2-3@m uk-align-center">
              <div className="uk-card uk-card-default uk-card-body">2-3</div>
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

export default connect(mapStateToProps, {})(withRouter(ProfilePage));

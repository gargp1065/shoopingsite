import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from '../actions/authAction';
import {Link} from 'react-router-dom'

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props.auth;
    console.log(user);
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You are logged into a full-stack{" "}
                <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
                </p>
            </h4>
            <br></br>

            <div className="col s6">
              <Link
                to="/AddAddress"
                style={{
                  width: "auto",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                Add Address
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/ViewAddress"
                style={{
                  width: "auto",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large  waves-effect waves-light hoverable blue accent-3"
              >
                View Address
              </Link>
              </div>
          </div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
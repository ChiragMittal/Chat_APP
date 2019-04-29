import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logout } from "../../actions/index";
import { callLogout } from "../../APIs/auth";

class Logout extends React.Component {
  onLogout = () => {
    const token = localStorage.getItem("token");
    console.log(localStorage.getItem("token"))
    callLogout(token).then(() => {
      localStorage.removeItem("token");
      this.props.logout();
      this.props.history.push("/login");
    });
  };

  render() {
    return (
      <button className="btn btn--logout" onClick={this.onLogout.bind(this)}>
        Logout
      </button>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default withRouter(connect(undefined, mapDispatchToProps)(Logout));
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { beginLogin } from "../../actions/index";
import classnames from "classnames";
import { beginGetBooks } from "../../actions/index";
import {loginUser} from "../../APIs/auth"
import axios from 'axios'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit =async e => {
    e.preventDefault();
    axios
            .post('http://localhost:3000/login', {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                console.log('login response: ')
                console.log(response)
                if (response.status === 200) {
                    
                    this.props.history.push("/search");
                }
            }).catch(error => {
                console.log('login error: ')
                console.log(error);
                
            })
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h1 className="title"> Login</h1>
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit.bind(this)} className="login">
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.username}
                  id="username"
                  type="username"
                  
                />
                <label htmlFor="username">username</label>
                
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  
                />
                <label htmlFor="password">Password</label>
                
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
    beginLogin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
    beginLogin: userData => dispatch(beginLogin(userData)),
    beginGetBooks: () => dispatch(beginGetBooks())
  });
export default connect(mapStateToProps,mapDispatchToProps)(Login);
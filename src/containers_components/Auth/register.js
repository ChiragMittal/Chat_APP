import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { beginRegister } from "../../actions/index";
import {addUser} from "../../APIs/auth"
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errors:""
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    // if (this.props.auth.isAuthenticated) {
    //   this.props.history.push("/search");
    // }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit =async e => {
    e.preventDefault();

    const newUser = {
      //username: this.state.username,
      username: this.state.username,
      password: this.state.password,
      
    };
     const response = await addUser(newUser);
     this.props.beginRegister(response.data);
     if(!response.data.error){
      this.props.history.push("/search");
     } else{
      this.props.history.push("/register");
     }
    
  };

  render() {
    

    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h1 className="title"> Register</h1>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit} className="register">
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.username}
                  
                  id="username"
                  type="text"
                
                />
                <label htmlFor="username">UserName</label>
                
              </div>
              {/* <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  
                  id="email"
                  type="email"
                  
                />
                <label htmlFor="email">Email</label>
                
              </div> */}
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  
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
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  beginRegister: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  
};

const mapStateToProps = state => ({
  auth: state.auth,
  
});

export default connect(
  mapStateToProps,
  { beginRegister }
)(withRouter(Register));
import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router'
import * as actions from '../actions/index';
//import {receiveAuth} from '../actions/authActions';
//import Chat from '../components/Chat';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {beginGetProfile,getAllChannels} from '../actions/index'
import io from 'socket.io-client';
import cookie from 'react-cookies'
//const socket = io('', { path: '/' });

class ChatApp extends Component {

    constructor(props) {
        super(props);
    
        this.state =  { 
            user: "" 
        } ;
      }

    async componentDidMount(){

        this.state =  { user: cookie.load('username') };

        if(!this.state.user) {
            this.props.history.push("/login");
          }

          this.props.getAllChannels(this.state.user);

        console.log(this.state.user)
    }

    render() {
        return (
       // <Chat {...this.props} socket={socket} />
       <h1>Hello </h1>
            );
          }
}

const mapDispatchToProps = dispatch => ({
    
    beginGetProfile: id => dispatch(beginGetProfile(id)),
    getAllChannels : username => dispatch(getAllChannels(username))
   });;

    //export default connect(mapDispatchToProps)(ChatApp)
    export default withRouter(connect(undefined,mapDispatchToProps)(ChatApp));
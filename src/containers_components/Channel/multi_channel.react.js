import React, { Component, PropTypes } from 'react';
import { Modal, Glyphicon, Input, Button } from 'react-bootstrap';
import * as actions from '../../actions/index';
//import Single_list from './single_channel';
import _ from 'lodash'

import {searchMembers} from '../../APIs/members'
import Searched from './searched.react';

export default class Multi_Channel extends Component {

    // static propTypes = {
    //     onClick: PropTypes.func.isRequired,
    //   };

    constructor(props){
        super(props);
        this.state = {
            channelName: '',
            visible: 5,
            error : "",
            showModal: false,
            searchUser: "",
            showSearchUser: false,
            data: [],
            members:[]
        }
    }

    modalOpen = (e) => {
        e.stopPropagation()

        this.setState({
            showModal: true
        })
        
    }

    modalClose = (e) => {
        if (e)
            e.stopPropagation()

        this.setState({
            showModal: false
        })
       
    }

    loadMore=() =>{
        this.setState({
            visible: this.state.visible + 5
        });
      }

    handleChangeChannel=(channel)=> {
        
        this.props.onClick(channel);
    }

   async onLoadData (e) {
        e.preventDefault();
console.log(this.state.searchUser)
let response;
if(this.state.searchUser.length>0){
     response = await searchMembers(
        this.state.searchUser
      );
}


     //console.log(response.data.length)
// if(response.data.length > 0){

// }
    const data = response.data
          .map(users => {
            const id = users._id;
            const username = users.username || "";
            const pwd = users.password || "";

            return {
                id,
                username,
                pwd
               
              };
          });
console.log(data.length)
          data.length? this.setState({
            data,
           
          }): this.setState({
            data,
            error: "🙅 No matches! 🙅"
          });

   

    }

   async handleOnClick  (user){
        console.log(user)
    
       if(this.state.members.includes(user.username)){
           return;
       }
       else{

        this.setState({
                   members : [...this.state.members,user]
               })
         
       }
         
       console.log(this.state.members)

    //    this.setState({
    //        members
    //    })
         
}



    dropList = ()=>{
//console.log(this.state.data)

const pStyle = {
    cursor: 'pointer'
  };
        if(this.state.data.length > 0){
            return (this.state.data.map((user,index) =>{
               return(
                <div onClick={() => this.handleOnClick(user)} key={index} className="user">
             <p style={pStyle}>{_.get(user, 'username')}</p>
           
             </div>
               )
            })
            )
        }

        else{
            return (
                <p>🙅 No matches! 🙅</p>
            )
        }
    }

     dropMembers=()=>{
     
        console.log(this.state.members)
const pStyle = {
    float: 'right',
    'margin-bottom' : 'auto'
  };
  
        if(this.state.members.length > 0){
            <p>Members</p>
            return (this.state.members.map((user,index) =>{
               return(
                
                <div key={index} className="user">
                  
             <p style={pStyle}>{_.get(user, 'username')}</p><br/>
           
             </div>
               )
            })
            )
        }

        else{
            return (
                <div>
                <p style={pStyle}>🙅 No members! 🙅</p>
                </div>
                
            )
        }
    }

    handleModalSubmit=(e)=> {
        e.preventDefault();
        // if (this.state.channelName.length < 1) {
        //     this.setState({
        //         error:true
        //     })
        //   }
        console.log(this.state.channelName);

          console.log(this.state.members.length);

        //   if (this.state.channelName.length > 0 && channels.filter(channel => {
        //     return channel.name === this.state.channelName.trim();
        //   }).length < 1){
            // const newChannel = {
            //     name: this.state.channelName.trim(),
            //     id: `${Date.now()}${uuid.v4()}`,
            //     members : ,
            //     private: false
            //   };
              
                // dispatch(actions.createChannel(newChannel));
                // this.handleChangeChannel(newChannel);
                // socket.emit('new channel', newChannel);
                //this.setState({channelName: ''});
        //         this.modalClose();
        //   }  
    }

    

      render(){
        const { channels, messages } = this.props;
        const newChannelModal = (
            <div>
               
            <Modal key={1} show={this.state.showModal} onHide={this.modalClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Add New Channel</Modal.Title>
                </Modal.Header>
               <Modal.Body>
                  <form  >
                 <input
                    ref="channelName"
                    type="text"
                    name="channelName"
                    autoFocus="true"
                    placeholder="Enter the channel name"
                    value={this.state.channelName}
                    onChange={(event)=>{
                        const name = _.get(event, 'target.value');
                        
                        this.setState({
                            channelName: name,
                        })
                    }}
                  />
</form>
<br></br>
<form >
                     <input placeholder="Type name of person..." onChange={(event) =>{
                        const searchUserText = _.get(event, 'target.value');
                        
                        this.setState({
                            searchUser: searchUserText,
                            showSearchUser: true,
                        })
                        }} 
                        type="text" value={this.state.searchUser}/>

             <Button  onClick={this.onLoadData.bind(this)} type="submit">Enter</Button> 
       
       {this.dropList()}

       {/* {this.state.members} */}
       <div >
       <h3 style={{'text-align':'right'}}>Members</h3>
       {this.dropMembers()}

       </div>
                        
                            
                  </form>



                </Modal.Body> 
                <Modal.Footer>
                   <Button onClick={this.modalClose}>Cancel</Button>
                  <Button  onClick={this.handleModalSubmit} type="submit">
                    Create Channel
                  </Button> 
                  {/* {this.state.members}  */}

                 
{/* // { this.state.members.map((user,index) =>{ 
//     return(
     
//    <p >{_.get(user,'username')}</p>


//      )
//   })} */}
                </Modal.Footer>
            </Modal>
            </div>
          );
        return(
            
        <div>
          <span style={{paddingLeft: '0.8em', fontSize: '1.5em'}}>
            Channels
            <button onClick={this.modalOpen} >
              <Glyphicon glyph="plus" />
            </button>
          </span>
          {newChannelModal}
        
        </div>
        );
        
      }

}
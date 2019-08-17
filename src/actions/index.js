import * as ACTION from '../constants'
import moment from 'moment';
import fetch from 'isomorphic-fetch';
import { newMessages} from "../APIs/message";
import { loginUser,getMe} from "../APIs/auth"
import {searchMembers} from "../APIs/members" 
import {newChannel} from "../APIs/channel"

export const getProfile = id => {
    return ({
        type: ACTION.PROFILE,
            id
    })
};

export const beginGetProfile = id => {
    return dispatch => {
      return getMe(id).then(({ data }) => dispatch(getProfile(data)));
    };
  };

export const loginUserData = userData => ({
    type: ACTION.LOGIN,
    userData
  });

  export const beginLogin = userData => dispatch =>{
    return loginUser(userData).then(({data}) => dispatch(loginUserData(data)))
}    

export const logout = () => ({
    type: ACTION.LOGOUT,
  });



export const registerUser = userData => ({
    type: ACTION.REGISTER,
    userData
  });

//   MESSAGES ACTIONS  
  
export const typing = username => ({
  type:ACTION.TYPING,
  username
}); 

export const stop_typing = username => ({
  type:ACTION.STOP_TYPING,
  username
}); 

export const addMessage = message=> ({
  
    type: ACTION.ADD_MESSAGE,
    message
  
});

export const createMessage = message => dispatch =>{
  return newMessages(message).then(({data}) => dispatch(addMessage(data)));
}

export function retrieveMessage(json, channel) {
  const date = moment().format('lll');
  return {
    type: ACTION.RETRIEVE_MESSAGE,
    json,
    channel,
    date
  }
}

export const receiveMessage = message => ({
  
    type: ACTION.RECEIVE_MESSAGE,
    message
  
})

export const requestMessages = () => ({
  
    type: ACTION.LOAD_MESSAGES
  
})

export const getAllMessages = channel => {
  return dispatch => {
    dispatch(requestMessages())
    return fetch(`/messages/${channel}`)
      .then(response => response.json())
      .then(json => dispatch(retrieveMessage(json, channel)))
      .catch(error => {throw error});
  }
}

// CHANNEL ACTIONS

export const addChannel = channel=> ({
  
  type: ACTION.ADD_CHANNEL,
  channel

});

export const createChannel = channel => dispatch =>{
  return newChannel(channel).then(({data}) => dispatch(addChannel(data)));
}

export const changeChannel = channel=> ({
  
  type: ACTION.CHANGE_CHANNEL,
  channel

});

export const retrieveChannel = (json)=> ({
  
  type: ACTION.RETRIEVE_CHANNEL,
  json

});

export const requestChannels = () => ({
  
  type: ACTION.LOAD_CHANNELS

})

export const receiveChannel = channel => ({
  
  type: ACTION.RECEIVE_CHANNEL,
  channel

})

export function getAllChannels (user) {
  
  return dispatch => {
    dispatch(requestChannels())
    return fetch(`http://localhost:3000/channels/${user}`)
      .then(response => response.json())
      .then(json => dispatch(retrieveChannel(json),
      console.log(json)))
      .catch(error => {throw error});
  }
}

//  SEARCH ACTIONS

export const searchPeople = query => ({
  type: ACTION.SEARCH_PEOPLE,
  query
})

export const startSearch = query => dispatch =>{
  return searchMembers(query).then(({data}) => dispatch(searchPeople(data)));
}

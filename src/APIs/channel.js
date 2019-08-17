import axios from "axios";


export function newChannels(channel) {
  
  return axios.post("http://localhost:3000/new_channel", channel );
};


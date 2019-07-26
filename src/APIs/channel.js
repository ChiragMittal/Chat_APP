import axios from "axios";


export function newChannel(channel) {
  
  return axios.post("http://localhost:3000/new_channel", channel );
};


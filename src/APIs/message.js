import axios from "axios";


export function newMessages(msg) {
  
  return axios.post("http://localhost:3000/new_messages", msg );
};


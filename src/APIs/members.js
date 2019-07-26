import axios from "axios";


export function searchMembers(query) {
    console.log(query)
  return axios.post("http://localhost:3000/searchUsers", {query} );
  
};
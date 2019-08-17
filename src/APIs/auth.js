import axios from 'axios'

export function addUser (userData){
    console.log(userData)
    return axios.post("http://localhost:3000/signup", {userData});
  };
 
  export const callLogout = token => {
    return axios.delete("http://localhost:3000/logout", { headers: { "x-auth": token } });
  };

  export const getMe = id =>{
    return axios.get(`http://localhost:3000/${id}`);
  }

  export const getInfo=()=>{
    return axios.get("http://localhost:3000/allUsers");
  }
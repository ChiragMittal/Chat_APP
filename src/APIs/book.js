import axios from "axios";

export function callGoogleBooks (query, field)  {
  return axios.post("http://localhost:3000/search", {
    query,
    field
  });  
};

export function postToBooks(book) {
  const token = localStorage.getItem("token");
  return axios.post("http://localhost:3000/books", book , { headers: { "x-auth": token } });
};

export function getFromBooks() {
  const token = localStorage.getItem("token");
  return axios.get("http://localhost:3000/books", { headers: { "x-auth": token } });
};

export function deleteFromBooks ({ id }) {

  return axios.delete(`http://localhost:3000/books/${id}`);
};

export const editToBooks = ({ id, shelfStatus ,favourite }) => {
  const token = localStorage.getItem("token");
  return axios.patch(
    `http://localhost:3000/books/${id}`,
    { shelfStatus ,favourite},
    {
      headers: { "x-auth": token }
    }
  );
};
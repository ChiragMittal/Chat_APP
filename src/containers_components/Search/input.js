import React from "react";
import {Form} from "react-bootstrap"

const SearchInput = ({
  query,
  field,
  onFieldChange,
  onQueryChange,
  submitForm
}) => (
  <form className="search__form" onSubmit={submitForm}>
    <input
      className="search__input"
      type="text"
      placeholder="search books"
      onChange={onQueryChange}
      value={query}
      autoFocus
    />
    <select className="search_select" value={field} onChange={onFieldChange}>
      <option value="intitle">Title</option>
      <option value="inauthor">Author</option>
      <option value="isbn">ISBN</option>
    </select>
  </form>

);

export default SearchInput;
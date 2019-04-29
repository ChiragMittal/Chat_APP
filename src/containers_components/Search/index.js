import React from "react";
import SearchInput from "./input";

import { callGoogleBooks } from "../../APIs/book";
import Multi_Books from "../Book/Multi_books";
import Common from "../Common/common"
import NavBarCommon from "../Common/navcommon"


class BookSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "", 
            field: "intitle", 
            data: [], 
            loading: false, 
            error: ""
        };
      }
    async loadData() {
     this.setState({ loading: true, data: [], error: "" });
     console.log('loadData', this.state.query, this.state.field)
     try {
       const response = await callGoogleBooks(
        this.state.query,
        this.state.field
      );
      console.log('response', response)
      
      if (response.data) {
        
        const data = response.data
          .map(book => {
            const volumeID = book.id;
            const identifiers = book.volumeInfo.industryIdentifiers || [];
            const title = book.volumeInfo.title || "";
            const subtitle = book.volumeInfo.subtitle || "";
            const authors = book.volumeInfo.authors || [];
            const description = book.volumeInfo.description || "";
            const pageCount = book.volumeInfo.pageCount || null;
            const hasThumbnail = book.volumeInfo.imageLinks || null;
            let thumbnailLink;
            hasThumbnail
              ? (thumbnailLink = book.volumeInfo.imageLinks.thumbnail.replace(
                  /^http:\/\//i,
                  "https://"
                ))
              : (thumbnailLink = "");
            return {
              volumeID,
              identifiers,
              title,
              subtitle,
              authors,
              description,
              pageCount,
              thumbnailLink
            };
          }
          ).filter(
            book =>
              book.thumbnailLink !== "" &&
              book.authors.length !== 0 &&
              book.title.length !== 0
          );
        data.length? this.setState({
              data,
              loading: false
            }): this.setState({
              loading: false,
              error: "🙅 No matches! 🙅"
            });
      

      } else {
        this.setState({
          loading: false,
          error: "🙅 No matches! 🙅"
        });
      }
    } catch (e) {
      console.log('error', e)
      this.setState({
        loading: false,
        error: "There was an error connecting to Google Books."
      });
    }
  };

  onQueryChange (e) {
    
    const query = e.target.value;
    this.setState({ 
      query:query,
       error: "" 
      })
      console.log(query)
    //this.setState({ query, error: "" });
  };

  onFieldChange(e) {
    const field = e.target.value;
    this.setState({ field, error: "" });
    console.log(field)
  };

  submitForm (e)  {
    e.preventDefault();
    this.loadData();
  };
  

  render() {
    return (
      <section className="search">
      <NavBarCommon />
        <Common />
        <div className="search_form">
            <SearchInput
              query={this.state.query}
              field={this.state.field}
              onQueryChange={this.onQueryChange.bind(this)}
              onFieldChange={this.onFieldChange.bind(this)}
              submitForm={this.submitForm.bind(this)}
            />
            <Multi_Books books={this.state.data} loading={this.state.loading} error={this.state.error} perPage={10} stacked forSearch />
            {/* {JSON.stringify(this.state.data)} */}
        </div>
        
        
      </section>
      
    );
  }
}

export default  BookSearch ;
import React from "react";
import { connect } from "react-redux"
import Multi_Books from '../Book/Multi_books'
import { beginGetBooks } from "../../actions/index"
import Common from "../Common/common"
import NavBarCommon from "../Common/navcommon"

class CurrentlyReading extends React.Component {
  constructor(props) {
      super(props);
      this.state = { 
          data: [],
          error: ""
      };
    }

   async componentWillMount(){
    const response = await this.props.beginGetBooks();
    console.log(response.books)

    if(response.books){

   
      const data = response.books
              .map(book => {
                const id = book.id;
                const identifiers = book.identifiers || [];
                const title = book.title || "";
                const subtitle = book.subtitle || "";
                const authors = book.authors || [];
                const description = book.description || "";
                const pageCount = book.pageCount || null;
                const shelfStatus = book.shelfStatus || "";
                const thumbnailLink = book.thumbnailLink ||"";
                const favourite = book.favourite ;
                return {
                  id,
                  identifiers,
                  title,
                  subtitle,
                  authors,
                  description,
                  pageCount,
                  thumbnailLink,
                  shelfStatus,
                  favourite
                };
              }
              ).filter(
                book =>
                  book.shelfStatus == "Currently Reading"
              );

              data.length? this.setState({
                            data,
                          
                          }): this.setState({
                          
                            error: "🙅 No matches! 🙅"
                          });

              console.log(this.state.data)
    }
    }

render() {

  
  return (
    <section className="search">
    <NavBarCommon />
        <Common />
        <h1 className="title">Currently Reading</h1>
      <Multi_Books  books={this.state.data} error={this.state.error} perPage={10}  />
      {/* {JSON.stringify(this.state.data)} */}
      
    </section>
    
  );
}
}

const mapDispatchToProps = dispatch => ({
 // beginLogin: userData => dispatch(beginLogin(userData)),
  beginGetBooks: () => dispatch(beginGetBooks())
});

export default connect(undefined,mapDispatchToProps)(CurrentlyReading);
import React from "react";
import { Glyphicon, Row,Col,Grid} from 'react-bootstrap';
import { connect } from "react-redux";
import { Modal, Button, OverlayTrigger } from 'react-bootstrap';
import {beginDeleteBook,beginAddBook,beginEditBook} from "../../actions/index";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faUser ,faAddressCard } from '@fortawesome/free-solid-svg-icons'


class Book extends React.Component{
    constructor(props){
        super(props);
       // self = this;
        this.state = {
            showModal: false,
            shelf: this.props.book.shelfStatus ? this.props.book.shelfStatus : "Want to Read",
            favourites : this.props.book.favourite ? this.props.book.favourite : false
          };
          
          console.log(this.props.book.favourite)
    }

    handleOpenModal(e) {
        e.stopPropagation();
        this.setState({ showModal: true });
      };
      handleCloseModal () {

        this.setState({ showModal: false });
      };

      async addBook (){
       
        const book = Object.assign({}, this.props.book, {
           shelfStatus: this.state.shelf,
          favourite : this.state.favourites
        });
        try {
            await this.props.beginAddBook(book);
          this.handleCloseModal();
          console.log(book)
        } catch (e) {
          console.log(e);
        }
      };

      async deleteBook () {
     
        try {
          
          await this.props.beginDeleteBook(this.props.book);
          this.handleCloseModal();
         window.location.reload();
        } catch (e) {
            console.log(e);
        }
      };

      async editBook () {
      
        const book = { ...this.props.book, shelfStatus: this.state.shelf};
        
        try {
          
          await this.props.beginEditBook(book);
          this.handleCloseModal();
         window.location.reload();
        } catch (e) {
            console.log(e);
        }
      };

      onShelfChange (e) {
        const shelf = e.target.value;
        console.log(shelf)
        this.props.book.shelfStatus ? this.setState({ shelf }, () => this.editBook()): this.setState({ shelf });
        
      };

     async addFavourites(){
     
     await this.setState({
        favourites : true
      });
      
      const book = { ...this.props.book, 
        favourite: this.state.favourites
      };

      try {
        await this.props.beginEditBook(book);
         this.handleCloseModal();
         window.location.reload();
      } catch (e) {
        console.log(e);
      }
      }
  

      async deleteFavourites(){
       
        
     await this.setState({
            favourites : false
          });  

        const book = { ...this.props.book, 
          favourite: this.state.favourites
        };
  
        try {
          await this.props.beginEditBook(book);
          this.handleCloseModal();
          window.location.reload();
        } catch (e) {
          console.log(e);
        }
        }

      render(){
        const { forSearch } = this.props;
        const {
          thumbnailLink,
          identifiers,
          title,
          subtitle,
          authors,
          pageCount,
          description
        } = this.props.book;
        const {favourites} = this.state;
        return (
        <div className="books">
     
        <a onClick={this.handleOpenModal.bind(this)}>
                 <img className="book_cover" src={thumbnailLink} />
                 
            </a>
       
            

            <Modal show={this.state.showModal} onHide={this.handleCloseModal.bind(this)}>
         
          <Modal.Body>

          <div className="modal_view">
                        <a className="modal_close" onClick={this.handleCloseModal.bind(this)}>
                            <i className="remove"  ><Glyphicon glyph="remove" /></i>
                        </a>
                        
                        <div className="modal_book_info">
                        { <img className="modal_book_cover"src={thumbnailLink} />}
                            <div className="modal_book_in">
                            <p><i><Glyphicon glyph="book" /></i>  
                                    {title}
                            {subtitle.length ? -{subtitle} : " "}</p>   
                            
                                                    
                        <p> <i className="author"  ><Glyphicon glyph="user" /></i>
                            {authors ? authors.join(", ") : "No author information."}</p>
                            <p> <i className="pages"  ><Glyphicon glyph="file" /></i>
                            {pageCount ? `${pageCount} pages` : "No page information."}</p>
                            <p><i className="isbn"  ><Glyphicon glyph="tasks" /></i>
                            
                                {identifiers.length ? identifiers[0].identifier: "No ISBN or other identifying information."}
                            </p>
            </div>
                            
                         </div>
                            <p className="modal_book_book-description">
                                    {description.length > 200? description.slice(0, 200) + " ...": description}
                            </p>
                            <select className="modal_book_select" value={this.state.shelf} onChange={this.onShelfChange.bind(this)}>
                                <option value="Read">Read</option> 
                                <option value="Want to Read">Want to Read</option>
                                <option value="Currently Reading">Currently Reading</option>
                            </select> 
                            </div>
            </Modal.Body> 
                        <Modal.Footer>
                        {favourites ? (<a onClick={this.deleteFavourites.bind(this)}><img src="https://img.icons8.com/ios/30/000000/hearts-filled.png" className="save"/></a>):
                            (<a onClick={this.addFavourites.bind(this)}><img src="https://img.icons8.com/ios/30/000000/hearts.png" className="save"/></a>)}
                        {forSearch ? (
                            <a className="modal_book_submit" onClick={this.addBook.bind(this)}>
                                <i className="done"  ><Glyphicon glyph="ok" /></i>
                            </a>
                            ) : (
                            <a className="modal_book_delete" onClick={this.deleteBook.bind(this)}>
                                <i className="delete"  ><Glyphicon glyph="trash" /></i>
                            </a>
                            )}
                            </Modal.Footer>       
                         
                    

          
          
        </Modal>
        </div>
        )
        
      }
    
};

const mapDispatchToProps = dispatch => ({
    beginAddBook: book => dispatch(beginAddBook(book)),
    beginDeleteBook: book => dispatch(beginDeleteBook(book)),
    beginEditBook: book => dispatch(beginEditBook(book))
  });

  export default connect(undefined, mapDispatchToProps)(Book);
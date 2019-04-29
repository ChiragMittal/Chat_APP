import React from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import {beginGetProfile,beginGetBooks} from '../../actions/index'
import { withRouter } from 'react-router'
import Multi_Books from '../Book/Multi_books'
import { Grid, Row, Col } from 'react-bootstrap'
import Common from "../Common/common"
import NavBarCommon from "../Common/navcommon"
import { ButtonToolbar, Dropdown, DropdownButton } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons'



class UserInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state =  { 
        user: [] ,
        data1: [],
        data2:[],
        data3:[],
        error: ""
    } ;
  }

 async componentDidMount() {
      
      const response = await this.props.beginGetProfile(this.props.match.params.id);
      const data = response.id;
      console.log(data)

      const response1 = await this.props.beginGetBooks();
 
      if(response1.books){

   
        const data1 = response1.books
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

                console.log(data1.length)

                data1.length? this.setState({
                    data1,
                  
                  }): this.setState({
                  
                    error: "🙅 No matches! 🙅"
                  });

                  
      }

      
      if(response1.books){

   
        const data2 = response1.books
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
                    book.shelfStatus == "Read"
                );

                

                data2.length? this.setState({
                    data2,
                  
                  }): this.setState({
                  
                    error: "🙅 No matches! 🙅"
                  });

               
      }

      if(response1.books){

   
        const data3 = response1.books
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
                    book.shelfStatus == "Want to Read"
                );

                

                data3.length? this.setState({
                    data3,
                  
                  }): this.setState({
                  
                    error: "🙅 No matches! 🙅"
                  });

                  console.log(this.state.data3)
      }


     
    this.setState({
        user:data
    })


  
};

  render() {

    return (
    <div>
        <NavBarCommon />
        <Common />
        <h1 className="title"> Profile</h1>
        <Grid>
            <Row>
                <Col md={3} className="profile">
                            <h1>{this.state.user.username}</h1>
                        <h2>{this.state.user.email}</h2>

                        
                        
        
        
     
                        
                </Col>
                <Col md={6} mdOffset={6} className="profile_books">
                    <div>
                      <h3><a href="/currently-reading">Currently Reading</a></h3>
                      <Multi_Books books={this.state.data1} error={this.state.error} perPage={7} stacked />   
                    </div>

                    <div>
                      <h3><a href="/read">Read</a></h3>
                      <Multi_Books books={this.state.data2} error={this.state.error} perPage={7} stacked />   
                    </div>

                    <div>
                      <h3><a href="/want-to-read">Want To Read</a></h3>
                      <Multi_Books books={this.state.data3} error={this.state.error} perPage={7} stacked />   
                    </div>
                    
                </Col>
            </Row>
        </Grid>
        
    </div>


    
    
    );
  }
 }

const mapDispatchToProps = dispatch => ({
    
    beginGetProfile: id => dispatch(beginGetProfile(id)),
    beginGetBooks: () => dispatch(beginGetBooks())
   });

   export default withRouter(connect(undefined,mapDispatchToProps)(UserInfo));
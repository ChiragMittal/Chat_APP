import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faStar ,faAddressCard } from '@fortawesome/free-solid-svg-icons'
import {beginGetProfile} from '../../actions/index'
import { withRouter } from 'react-router'
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import axios from "axios"
import {getInfo} from "../../APIs/auth"
import { ButtonToolbar, Dropdown, DropdownButton } from "react-bootstrap";


// Flux product view
class Common extends React.Component {

    constructor(props) {
        super(props);
    
        this.state =  { 
            user: "" 
        } ;
      }

    async componentDidMount(){
        const response = await getInfo();
        //const data = response.username;
        //console.log(response.data._id)
        this.setState({
            user : response.data._id
        })
        console.log(this.state.user)
    }

    
    render() {
        
        const {user} = this.state;
       // console.log(user)
    
        return (
            <div>
                <div className="icon-bar">
                    <Link to="/search"><FontAwesomeIcon icon={faSearch} /></Link>
                    <Link to={`/${user}`}><FontAwesomeIcon icon={faAddressCard} /></Link>
                    <DropdownButton
          drop="right"
          variant="secondary"
          id="dropdown-button-drop-right"
          className="fa fa-book"
           key="right"
        >
        
        
          <div aria-labelledby="dropdown-button-drop-right" class="dropdown-menu show" x-placement="right-start" >
          <a class="dropdown-item" role="button" href="/currently-reading">Currently Reading</a>
          <a class="dropdown-item" role="button" href="/read">Read</a>
          <a class="dropdown-item" role="button" href="/want-to-read">Want to read</a>
          </div>
          
          
        </DropdownButton> 
        <Link to={"/favourites"}><FontAwesomeIcon icon={faStar} /></Link>

                </div>
            </div>
        );
    }

};

const mapDispatchToProps = dispatch => ({
    
    beginGetProfile: id => dispatch(beginGetProfile(id)),
    
   });

   export default withRouter(connect(undefined,mapDispatchToProps)(Common));

//export default Common;
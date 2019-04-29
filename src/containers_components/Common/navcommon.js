import React from 'react';
import {Navbar} from 'react-bootstrap'
import {getInfo} from "../../APIs/auth"
import Logout from "../Auth/logout";

class NavBarCommon extends React.Component {

    constructor(props) {
        super(props);
    
       
      }

    // async componentDidMount(){
    //     const response = await getInfo();
        
    //     this.setState({
    //         user : response.data._id
    //     })
    //     console.log(this.state.user)
    // }

    
    render() {
    
        return (
            <div>
<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="#home">Book Shelf</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">

    <Logout />
   
  </Navbar.Collapse>
</Navbar>
            </div>
                    
        );
    }

};


   export default NavBarCommon;

//export default Common;
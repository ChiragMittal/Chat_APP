import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as AUTH from '../utils/auth'
import * as AUTH_API from '../APIs/auth'
import { Grid, Row, Col } from 'react-bootstrap'

export default class HomePage extends Component {
    constructor(props) {
        super(props)
    }

    

    render() {
        
        return (
            <div>
                <div className="welcome">
                    <img src="https://img.icons8.com/dusk/64/000000/books.png" className="icon"/>
                    <h1 className="title"> BookShelf</h1>
                </div>

                <Grid>
            <Row>
                <Col md={6} mdOffset={4}>
                <div className="buttons">
                   <a href="/login"><button
                    style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1.5rem"
                    }}
                    type="submit"
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                    >
                    Login
                    </button></a> 
                    <a href="/register"><button
                    style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1.5rem"
                    }}
                    type="submit"
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                    >
                    Register
                    </button></a>
                    
                </div>
                    
                </Col>
            </Row>
        </Grid>
                
                
                
            </div >
        );
    }
}
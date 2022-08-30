import React from 'react';
import Header from "../components/NavBar.js"
import {Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import "../css/Login.css"

import axios from 'axios'
const url = "http://localhost:3030/auth/" 

class SignIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {signedIn: false, incorrect: false}
        this.usernameRef = React.createRef();
        this.passwordRef = React.createRef();

    }
    loginAttempt = (e)  => {
        e.preventDefault();
        console.log("login attempt")
        const uName = this.usernameRef.current.value;
        const pass = this.passwordRef.current.value;
        axios.post(url +"login", {
            username: uName,
            password: pass
        }).then((result) => {
                if (result.data.message === "success") {
                    console.log("Logged in! Token: " + result.data.token);
                    localStorage.setItem('token', result.data.token)
                    localStorage.setItem('username', JSON.stringify(result.data.email))
                    this.props.history.push('/browse');
                } else {
                    console.log("User not logged in properly");
                    // this.props.history.go(0);
                    this.setState({incorrect: true})
                     // switch page to proper url
                }},(err) => {
                    console.log("Did not log in");
                    // this.props.history.go(0);
                    this.setState({incorrect: true})
                    // console.log(err)
                    // this.setState({isLoaded: false, error : err})
                }
            )
    }

    switch = (e) => {
        console.log()
        e.preventDefault();
        console.log('switch')
        this.props.history.push('/register');
    }


    render() {
        const { incorrect } = this.state;
        let warn = <div></div>;
        if (incorrect) {
            warn = <div className="warning">Incorrect email/password. Try again.</div>

        }
        return(
            <div className = 'wrapper-signin' style={{display: "inline"}}>
                <div className='content'>
                    <div className="title">Kindling</div>
                    <div className="welcome">Welcome to Kindling, please login.</div>
                    {warn}
                    <Form className="form">
                        <Form.Group className = "field" controlId="formBasicUsername">
                            <Form.Control ref={this.usernameRef} type="name" placeholder="Username" className="secondry-font"/>
                        </Form.Group>

                        <Form.Group className = "field" controlId="formBasicPassword">
                            <Form.Control ref={this.passwordRef} type="password" placeholder="Password" className="secondry-font"/>
                        </Form.Group>

                        <Button className = "submit-button" id="login" onClick={(e) => this.loginAttempt(e)} variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                    <div className="subtext" onClick={(e) => this.switch(e)}>Don't have an account?</div>
                </div>
                <div>
                    <img src={Kindling} className="kindling" alt = ""/>
                </div>
            </div>
        )

    }
}



export default withRouter(SignIn);

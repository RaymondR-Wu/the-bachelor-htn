import React from 'react';
import './Login.css';
import { Button, Form, Modal, Col } from 'react-bootstrap';
import axios from 'axios';

export default class Login extends React.Component{
    constructor(props){
        super(props);

        this._enums = { Registration: 1, Login: 2}

        this.state = {
            activeView: this._enums.Login,
            modalActive: false,
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
            username: '',
            phone: ''
        }
    }

    toggleModal = (activeView) => {
        this.setState({
            modalActive: !this.state.modalActive,
            activeView
        });
    }

    toggleView = () => {
        this.setState({
            activeView: this.state.activeView%2 + 1
        })
    }

    handleChange = (field, e) => {
        this.setState({
            [field]: e.target.value
        })
    }
    
    sendRegistration = () => {
        let data = {
            'firstName': this.state.firstName,
            'lastName': this.state.lastName,
            'password': this.state.password,
            'username': this.state.username,
            'phone': this.state.phone,
            'email': this.state.email
        }
        
        axios({
            url: "http://localhost:8000/users/register",
            method: "POST",
            data: data
        }).then((response) => {
            localStorage.setItem('userDetails', JSON.stringify(response.data));
            this.setState({
                modalActive: false
            }, () => {this.props.switchPage('profile')});
        }).catch((err) => {
            alert('try again buddy');
        })
    }

    sendLogin = () => {
        let data = {
            'email': this.state.email,
            'password': this.state.password,
        }

        axios({
            url: "http://localhost:8000/users/login",
            method: "POST",
            data: data
        }).then((response) => {
            localStorage.setItem('userDetails', JSON.stringify(response.data));
            this.setState({
                modalActive: false
            }, () => {
                this.props.switchPage('userProfile');
            });
        }).catch((err) => {
            console.log("BRUH");
            alert('nope not allowed in');
        })
    }

    renderForm = () => {
        if(this.state.activeView === this._enums.Registration){
            return(
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control value={this.state.firstName} onChange={(e) => this.handleChange('firstName', e)} placeholder = "Enter name" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control value={this.state.lastName} onChange={(e) => this.handleChange('lastName', e)} placeholder = "Enter name" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control value={this.state.email} onChange={(e) => this.handleChange('email', e)} type="email" placeholder = "Enter email" />
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={this.state.password} onChange={(e) => this.handleChange('password', e)} type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formGroupConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control value={this.state.confirmPassword} onChange={(e) => this.handleChange('confirmPassword', e)} type="password" placeholder="Confirm Password" />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control value={this.state.username} onChange={(e) => this.handleChange('username', e)} placeholder = "Username" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formPhone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control value={this.state.phone} onChange={(e) => this.handleChange('phone', e)} placeholder = "(613)-123-4567" />
                        </Form.Group>
                    </Form.Row>
                </Form>
            )
        } else{
            return (
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control value={this.state.email} onChange={(e) => this.handleChange('email', e)} type="email" placeholder = "Enter email" />
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={this.state.password} onChange={(e) => this.handleChange('password', e)} type="password" placeholder="Password" />
                    </Form.Group>
                </Form>
            )
        }
    }

    render(){
        if(!this.props.active) return null;
        return(
            <div className="login-container">
                <div className="login-header">
                    <p className="title">The Pit</p>
                    <Button onClick={() => this.toggleModal(this._enums.Login)} variant="secondary">Log In</Button>
                </div>
                <div className="login-body">
                    <p className="title">Get Your Bachelor Experience Today.</p>
                    <br></br>
                    <Button onClick={() => this.toggleModal(this._enums.Registration)} variant="primary"> I'm "single" and ready to mingle.</Button>
                </div>
                <Modal centered show={this.state.modalActive} onHide={this.toggleModal}>
                    <Modal.Body centered>
                        <div style={{padding:"2rem"}}>
                            <div style={{display:"flex", justifyContent: "center"}}>
                                <p className="title" style={{fontSize:"2rem"}}>
                                    {this.state.activeView == this._enums.Registration ? 'Create Account' : 'Log In'}
                                </p>
                            </div>
                            <br></br>
                            {this.renderForm()}
                            
                            <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent: "center"}}>
                                <Button 
                                    style={{maxWidth: '100vw', marginBottom: "0.5rem"}} 
                                    onClick={this.state.activeView - 1 ? this.sendLogin : this.sendRegistration} 
                                    variant="primary"
                                > 
                                    Become a Bachelor 
                                </Button>
                                <div style={{display: "flex", flexDirection:"row"}}>
                                    <p>{this.state.activeView - 1 ? 'Not yet a Bachelor?': 'Already a Bachelor?'} </p>&nbsp;
                                    <p onClick={this.toggleView} className="clickable-words"> {this.state.activeView -1 ? 'Register Now.' : 'Log In Here.'} </p>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

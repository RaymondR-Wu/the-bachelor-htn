import React from 'react';
import './Login.css';
import { Button, Form, Modal, Col } from 'react-bootstrap';

export default class Login extends React.Component{
    constructor(props){
        super(props);

        this._enums = { Registration: 1, Login: 2}

        this.state = {
            activeView: this._enums.Login,
            modalActive: false
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
    
    this.sendRe

    renderForm = () => {
        console.log(this.state.activeView, this._enums.Login, this._enums.Registration);
        if(this.state.activeView === this._enums.Registration){
            return(
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control placeholder = "Enter name" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control placeholder = "Enter name" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder = "Enter email" />
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formGroupConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control placeholder = "Username" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formPhone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control placeholder = "(613)-123-4567" />
                        </Form.Group>
                    </Form.Row>
                </Form>
            )
        } else{
            return (
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder = "Enter email" />
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
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

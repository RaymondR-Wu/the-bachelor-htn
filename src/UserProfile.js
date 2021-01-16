import React from 'react';
import './UserProfile.css';
import {Image, Carousel} from 'react-bootstrap';

export default class ProfilePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            name: '',
            phone: '',
            bio: '',
            age: '',
            images: '',
            feature: '',
            editable: false
        }
    }

    componentDidMount(){
        if(!this.props.active){
            console.log("huh");
            return null;
        } 

        if(this.props.userProfile){
            console.log("edit off")
        } else{
            let userProfile = JSON.parse(localStorage.getItem('userDetails'));
            console.log(userProfile);
            userProfile.name = userProfile.firstname + ' ' + userProfile.lastname;
            this.setState({
                ...userProfile
            })
        }
    }

    render(){
        if(!this.props.active) return null;
        return(
            <div>
                <p>Cat's beautiful new header here</p>
                <div className="profile-body">
                    <div className="profile-info">
                        <Image className="profile-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP3lC0SfgqCcTGipFh64hddM6xgBYQj90wOA&usqp=CAU" roundedCircle/>
                        <p className="profile-name">{this.state.name}</p>
                        <div className="profile-details">
                            <p>Username: {this.state.username}</p>
                            <p>Age: {this.state.age || 'Set Age'}</p>
                            <p>Birthday: dd/mm/yyyy</p>
                            <p>Best Feature: {this.state.feature || 'Set Feature'}</p>
                            <p>Email: {this.state.email}</p>
                        </div>
                    </div>
                    <div className="profile-carousel">
                        <div className="carousel-container">
                            <p className="profile-name medium-text">View Pictures</p>
                            <Carousel>
                                <Carousel.Item className="carousel-item">
                                    <Image className="carousel-item-image" src="https://i.stack.imgur.com/y9DpT.jpg"/>
                                </Carousel.Item>
                                <Carousel.Item className="carousel-item">
                                    <Image className="carousel-item-image" src="https://i.stack.imgur.com/y9DpT.jpg"/>
                                </Carousel.Item>
                                <Carousel.Item className="carousel-item">
                                    <Image className="carousel-item-image" src="https://i.stack.imgur.com/y9DpT.jpg"/>
                                </Carousel.Item>
                                <Carousel.Item className="carousel-item">
                                    <Image className="carousel-item-image" src="https://i.stack.imgur.com/y9DpT.jpg"/>
                                </Carousel.Item>
                            </Carousel>
                            <div className="carousel-preview">
                                <Image className="carousel-preview-image" src="https://i.stack.imgur.com/y9DpT.jpg" rounded/>
                                <Image className="carousel-preview-image" src="https://i.stack.imgur.com/y9DpT.jpg" rounded/>
                                <Image className="carousel-preview-image" src="https://i.stack.imgur.com/y9DpT.jpg" rounded/>
                            </div>
                            <p className="profile-name medium-text" style={{paddingTop: "2rem"}}>View Bio</p>
                            <p style={{textAlign: "left"}}> Bio is currently empty. Edit to have better changes at finding a match</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
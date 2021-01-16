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
                <p>Profile page</p>
                <div className="profile-body">
                    <div className="profile-info">
                        <Image className="profile-image" src="https://www.porcelaingres.com/img/collezioni/JUST-GREY/big/just_grey_light_grey.jpg" roundedCircle/>
                        <p className="profile-name">{this.state.name}</p>
                        <div className="profile-details">
                            <p>Age: {this.state.age || 'Set Age'}</p>
                            <p>Best Feature: {this.state.feature || 'Set Feature'}</p>
                            <p>Email: {this.state.email}</p>
                        </div>
                    </div>
                    <div className="profile-carousel">
                        <p className="profile-name">Alvin Dai</p>
                    </div>
                </div>
            </div>
        )
    }
}
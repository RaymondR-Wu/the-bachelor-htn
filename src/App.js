import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { Button } from 'react-bootstrap';
import Login from './Login.js';
import ProfilePage from './UserProfile.js';

class App extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            activePage: 'login'
        }
    }

    switchPage = (activePage) => {
        this.setState({ activePage });
    }

    componentDidMount(){
        let userDetails = localStorage.getItem('userDetails');
        if(userDetails){
            userDetails = JSON.parse(userDetails);

            this.setState({ activePage:"userProfile" });
        } 
    }

    render(){
      return (
        <div className="App">
          <Login active={this.state.activePage === 'login'} switchPage={this.switchPage}/>
          <ProfilePage active={this.state.activePage === 'userProfile'} switchPage={this.switchPage} />
        </div>
      );
    }
}

export default App;

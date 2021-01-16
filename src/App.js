import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { Button } from 'react-bootstrap';
import Login from './Login.js';
import ProfilePage from './UserProfile.js';
import Elimination from './Components/Elimination';

class App extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            activePage: 'elimination'
        }
    }

    switchPage = (activePage) => {
        this.setState({ activePage });
    }

    componentDidMount(){
        let userDetails = localStorage.getItem('userDetails');
        if(userDetails){
            userDetails = JSON.parse(userDetails);

            //this.setState({ activePage:"userProfile" });
        } 
    }

    render(){
      return (
        <div className="App" style = {{width: '100%', height: '100%', border: 'solid', borderColor:'yellow'}}>
          <Login active={this.state.activePage === 'login'} switchPage={this.switchPage}/>
          <ProfilePage active={this.state.activePage === 'userProfile'} switchPage={this.switchPage} />
          <Elimination active={this.state.activePage === 'elimination'} switchPage={this.switchPage} />
        </div>
      );
    }
}

export default App;

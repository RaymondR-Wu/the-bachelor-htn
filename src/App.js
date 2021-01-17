import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { Button } from 'react-bootstrap';
import Login from './Login';
import Header from './Components/Header';
import ProfilePage from './UserProfile';
import Pits from './Pits';
import Matches from './Matches';
import Questions from './Questions';

class App extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            activePage: 'login',
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
        <div className="App" style = {{width: '100%', height: '100%'}}>
              <Header activePage={this.state.activePage} switchPage={this.switchPage}/>
              <Login active={this.state.activePage === 'login'} switchPage={this.switchPage} />
              <ProfilePage active={this.state.activePage === 'userProfile'} switchPage={this.switchPage} />
              <Matches active={this.state.activePage === 'matches'} switchPage={this.switchPage} />
              <Pits active = {this.state.activePage === 'pits'} switchPage={this.switchPage}/>
              <Questions active = {this.state.activePage === 'questions'} switchPage={this.switchPage}/>
        </div>
      );
    }
}

export default App;

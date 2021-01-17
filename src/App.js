import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { Button } from 'react-bootstrap';
import Login from './Login';
import Header from './Components/Header';
import ProfilePage from './UserProfile';
import Elimination from './Components/Elimination';
<<<<<<< HEAD
import AnswerPage from './Components/AnswerPage';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
=======
import Pits from './Pits';
>>>>>>> 1170f62a3a58530788ead99e6548c7f7e136585f

class App extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            activePage: 'pits'
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
              <Elimination active={this.state.activePage === 'elimination'} switchPage={this.switchPage} />
              <Pits active = {this.state.activePage === 'pits'} switchPage={this.switchPage}/>
        </div>
      );
    }
}

export default App;

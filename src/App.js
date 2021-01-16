import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { Button } from 'react-bootstrap';
import Login from './Login.js';

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
        let jwt = localStorage.getItem('jwt');
        return; //this needs to be sent later..
        if(jwt){
            //send request to backend and check if jwt is valid

            //check if the user filled in their bio and whatnot
            
            let detailsEntered = false;
            let activePage = "mainPage";

            if(!detailsEntered){
                activePage = "initialDetails";
            }

            this.setState({ activePage });
        } 
    }

    render(){
      return (
        <div className="App">
          <Login active={this.state.activePage === 'login'} switchPage={this.switchPage}/>
        </div>
      );
    }
}

export default App;

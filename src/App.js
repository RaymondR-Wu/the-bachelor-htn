import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { Button } from 'react-bootstrap';

class App extends React.Component{
    render(){
      return (
        <div className="App">
          <div>
            <Button variant="outline-primary">Thing here</Button>
          </div>
        </div>
      );
    }
}

export default App;

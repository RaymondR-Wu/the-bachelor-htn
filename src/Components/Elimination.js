import React, { Component } from 'react';
import axios from 'axios';
import {url} from '../config';

export class Elimination extends Component {
    constructor(props){
        super(props);
        this.state = {
            imageData : ""
        }
    }

    componentDidMount(){
        console.log("YO")
        axios({
            method: 'get',
            url: "http://localhost:8000/users/userFirst"
        })
        .then((res) => {
            console.log(res);
            this.setState({
                imageData: res.data
            })
        })
        .catch((err) => {
            console.log(err, err.message, "BAD12763");
        })
    }

    render() {
        if(!this.props.active) return null;
        return(
            <div style = {{width: '100%', height: '100%', border: 'solid'}}>
                <div style = {{width: '100%', height: '50%', backgroundColor: 'blue'}}>
                    This is a header bar
                </div>
                <img src={`data:image/jpeg;base64,${this.state.imageData}`} />
            </div>
        )
    }
}

export default Elimination

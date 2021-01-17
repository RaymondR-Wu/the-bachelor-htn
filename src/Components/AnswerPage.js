import React from 'react';
import './AnswerPage.css';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import {url} from '../config';

export default class AnswerPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            answer: '',
            question: '',
            asker: ''
        }
    }

    handleChange = (e) => {
        this.setState({answer: e.target.value});
    }

    componentDidMount(){
        axios({
            method: 'get',
            url: url + '/users/question'
        })
        .then((res) => {
            this.setState({
                question : res.data.question,
                asker : res.data.username,
                round : res.data.round
            })
        })
    }

    onSubmit = () => {
        let userProfile = JSON.parse(localStorage.getItem('userDetails'));
        axios({
            method: 'post',
            url: url+'/users/answer',
            data : {answer: this.state.answer, round : this.state.round, username : userProfile.username}
        })
        .then((res) => {
            console.log("yayy");
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render(){
        return(
            <div className="answer-container">
                <div className="answer-inner-container">
                    <p style={{color:"white", fontSize: "2.25rem"}}>From {this.state.asker}:</p>
                    <p style={{color:"white", fontSize: "2.25rem"}}>{this.state.question}</p>
                    <Form>
                        <Form.Group>
                            <Form.Control value={this.state.value} onChange={(e) => this.handleChange(e)} style={{width:'50vw', color: "white", border:"2px solid black", backgroundColor: "rgba(0,0,0,0)", fontSize: "1.75rem"}} placeholder="Enter answer" as="textarea" rows={6}/>
                        </Form.Group>
                    </Form>
                    <div style={{paddingTop: "1rem", display: "flex", flex: 1, flexDirection: "row-reverse", width:"50vw"}}>
                        <Button onClick = {() => this.onSubmit()} variant="primary" size="lg">Submit Answer</Button>
                    </div>
                </div>
            </div>
        )
    }
}
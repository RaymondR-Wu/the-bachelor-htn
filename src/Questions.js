import React from 'react';
import {Image, Carousel} from 'react-bootstrap';
import axios from 'axios';
import { url } from './config';
import {Card, Header, List, Button, Search, Menu, Form, TextArea, Popup} from 'semantic-ui-react';

export default class Questions extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            prevAsked : [],
            click : false,
            selected : "",
            activeChatIdx : 1,
        }
    }

    componentDidMount(){
        console.log("YOhehe")
        axios({
            method: 'get',
            url: "http://localhost:8000/users/prevRounds"
        })
        .then((res) => {
            console.log(res);
            this.setState({
                prevAsked: res.data["prevRounds"],
                users : res.data['users'],
                loading : false
            })
        })
        .catch((err) => {
        console.log(err, err.message, "BAD12763");
        })
    }

    componentDidUpdate(prevProps){
      if(prevProps !== this.props){
        console.log("SIRRR");
        axios({
          method: 'get',
          url: "http://localhost:8000/users/prevRounds"
        })
        .then((res) => {
            console.log(res);
            this.setState({
                prevAsked: res.data["prevRounds"],
                users : res.data['users'],
                loading : false
            })
        })
        .catch((err) => {
        console.log(err, err.message, "BAD12763");
        })
      }
    }

    clickedChat = (idx) => {
        this.setState({
            activeChatIdx : idx
        })
    }

    onSubmit = () => {
        axios({
            method: 'post',
            url : url+'/users/eliminate',
            data : {username : this.state.selected}
        })
        .then((res) => {
            console.log("good");
        })
        .catch((err) => {
            console.log(err);
        })
    }

    onChange = (e) => {
      console.log(e.target.value);
      this.setState({
        question : e.target.value
      });
    }

    onQuestionSubmit = () => {
      if(this.state.question != ""){
        let userProfile = JSON.parse(localStorage.getItem('userDetails'));
        if(userProfile){
          userProfile = userProfile.username;
        }else{
          userProfile = "testUsername";
        }
        axios({
          method: 'post',
          url : url + '/users/question',
          data : {question: this.state.question, username : userProfile}
        })
        .then((res) => {
          console.log("res");
        })
        .catch((err) => {
          console.log(err.message, "err12098");
        });
      }
    }

    questionsList = () => {
        console.log(this.state.prevAsked.length);
        return (
          <List style = {{width: '100%', display: 'flex', flexDirection: 'column', maxHeight: '100%', border: 'none', borderColor: 'blue', padding: '0px', overflowY: 'auto'}}>
            {this.state.prevAsked.map((item, idx) => {
              return (

                <List.Item style = {{padding: '0px'}}>
                  <Card style = {{width: '100%'}}>
                    <div style = {{margin: "10px", padding: '0px'}}>
                      Question {parseInt(item.question.round)+1}: {item.question.question}
                    </div>
                    
                    <div style = {{display: 'inline-flex'}}>
                      {item.answers.map((answer) => {
                        return(
                          <Popup trigger = {<img style = {{height: '50px', width: '50px', borderRadius: '50px', margin: "10px"}} src={`data:image/jpeg;base64,${this.state.users[answer.username].profilepic}`}/>}>
                            {answer.username}: {answer.answer}
                          </Popup>
                        )
                      })}
                    </div>
                  </Card>
                </List.Item>
              )
            })}
          </List>
        )
      }

    clickedEliminate = () => {
      this.props.switchPage('pits')
    }

    render(){
        if(!this.props.active) return null;
        return(
            <div style = {{display: "flex", flex: "1", width: "100vw", "flexDirection": "row", "background-color": "#e6ffe6", border: 'none', borderColor: 'red'}}>
                <div style = {{width: '40%', backgroundColor: "#E5E5E5", border: 'none', borderColor: 'violet', margin: '0px', paddingTop: '20px'}}>
                    <div style = {{fontSize: '30px'}}>
                        Chats
                    </div>
                    <Search style = {{marginTop: '20px'}} open = {false} placeholder = "Search"/>

                    <Menu vertical style = {{border: 'none', borderColor: 'yellow', width: '100%', flex: 'column', margin: '10px auto'}}>
                        <Menu.Item onClick = {() => {this.clickedChat(0)}} style = {{height: '10vh', borderColor: 'black', border: 'none'}} active = {this.state.activeChatIdx === 0}>
                            <div style = {{textAlign: 'left'}}>
                                Pit 1 &#128521;
                            </div>
                            <div style = {{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <div style = {{left: '0px'}}> W/ Channing Tatum, Zac Efron, ... </div>
                                <div style = {{right: '0px'}}> Tatum: Hey Pappi</div>
                            </div>
                        
                        </Menu.Item>

                        <Menu.Item onClick = {() => {this.clickedChat(1)}} style = {{height: '10vh', borderColor: 'black', border: 'none'}} active = {this.state.activeChatIdx === 1} >
                            <div style = {{textAlign: 'left'}}>
                                Pit 2
                            </div>
                            
                            <div style = {{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <div style = {{left: '0px'}}> W/ Sven, Shrek, Olaf... </div>
                                <div style = {{right: '0px'}}> Olaf: Wait till summer </div>
                            </div>
                        </Menu.Item>

                        <Menu.Item onClick = {() => {this.clickedChat(2)}} style = {{height: '10vh', borderColor: 'black', border: 'none'}} active = {this.state.activeChatIdx === 2}>
                            <div style = {{textAlign: 'left'}}>
                                Pit 3
                            </div>
                            <div style = {{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <div style = {{left: '0px'}}> W/ Dwight Schrute, Janice, ... </div>
                                <div style = {{right: '0px'}}> Janice: O MY  </div>
                            </div>
                            
                        </Menu.Item>

                        <Menu.Item style = {{height: '10vh', borderColor: 'black', border: 'none'}} >
                            <div style = {{textAlign: 'left'}}>
                                +
                            </div>
                            Browse Open Pits
                        </Menu.Item>
                        <Menu.Item style = {{height: '10vh', borderColor: 'black', border: 'none'}} >
                            <div style = {{textAlign: 'left'}}>
                                +
                            </div>
                            Create Your Own Pit
                        </Menu.Item>
                    </Menu>
                </div>

                <div style = {{position: 'relative', height: '20%', width: '100%', border: 'none', borderColor: 'orange', margin: '20px 20px 0 20px', alignItems: 'left', display: 'inline-flex'}}> 
                    <div style = {{height: '100%', width: '60%', border: 'none', borderColor: 'blue', alignItems: 'stretch', marginRight: '5%', padding: '0px'}}>
                      <div style = {{position: 'relative', float: 'left', margin: '10px', fontSize: '20px', display: 'flex', flex:'1', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <div style = {{float: 'left'}}>
                          What else do you want to know?
                        </div>
                      </div>
                      
                      <Form style = {{marginTop: '10px'}}>
                        <TextArea onChange = {(e) => this.onChange(e)}rows = {6} style = {{height: '50%'}} placeholder='Ask anything you want' />
                      </Form>

                      <Button onClick = {() => this.onQuestionSubmit()} style = {{float: 'left', marginTop : '10px'}}>
                        Submit Question
                      </Button>
                    </div>

                    <div style = {{width: '50%', height: '100%', alignItems: 'stretch', padding: '0px', border: 'none'}}>
                      <div style = {{height: '10px', float: 'left', margin : "10px 0px 10px 0px", paddingLeft: '10px', fontSize: '20px'}}>
                        Your previous questions and answers
                      </div>

                      <div style = {{height: '80%', width: '100%', float: 'left', clear: 'both', textAlign: 'left', margin: '10px 0px 0px', padding: '0px'}}>
                        {this.questionsList()}
                    
                      </div>
                    </div>
                    
                    
                </div>
                <Button disabled = {false} onClick = {() => this.clickedEliminate()} labelPosition = "right" icon = "right chevron" style = {{position: 'absolute', bottom: '5%', right: '5%'}} content = "Eliminate"/>
            </div>
        )
    }
}
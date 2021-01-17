import React from 'react';
import {Image, Carousel} from 'react-bootstrap';
import axios from 'axios';
import { url } from './config';
import AnswerPage from './Components/AnswerPage';
import { Header, List, Button, Search, Menu, Popup} from 'semantic-ui-react';

export default class Pits extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            imageData : [],
            click : false,
            selected : "",
            activeChatIdx : 1
        }
    }

    componentDidMount(){
        console.log("YO")
        axios({
            method: 'get',
            url: "http://localhost:8000/users"
        })
        .then((res) => {
        console.log(res);
        this.setState({
            imageData: res.data["rows"],
            loading : false
        })
        })
        .catch((err) => {
        console.log(err, err.message, "BAD12763");
        })
    }

    clickedImage = (item) => {
        this.setState({
            selected : item.username
        })
    }

    clickedChat = (idx) => {
        this.setState({
            activeChatIdx : idx
        })
    }

    clickedBack = () => {
        this.props.switchPage('questions')
    }

    onSubmit = () => {
        axios({
            method: 'post',
            url : url+'/users/eliminate',
            data : {username : this.state.selected}
        })
        .then((res) => {
            console.log("good");
            this.props.switchPage('questions');
        })
        .catch((err) => {
            console.log(err);
        })
    }

    imageList = () => {
        let num = this.state.imageData.length;
        return (
          <List horizontal>
            {this.state.imageData.map((item, idx) => {
              return (
                <List.Item>
                  {/* <Image style = {{height: '150px', width: '150px'}} src={`data:image/jpeg;base64,${item.photos}`} /> */}
                  <Popup trigger = {
                  <img onClick={() => this.clickedImage(item)} style={{position: 'absolute', height: '15vh', width: '15vh', borderRadius: '15vh', borderWidth: '2px', borderStyle: this.state.selected === item.username ? 'solid' : 'none', borderColor: 'red', top: '30vh', left: '50%', transform: `rotate(${360*idx/num}deg) translate(${30}vh) rotate(${-360*idx/num}deg)`}} src={`data:image/jpeg;base64,${item.profilepic}`} alt = {item.username}/>}> {item.username} </Popup>
                </List.Item>
              )
            })}
          </List>
        )
      }

    render(){
        if(!this.props.active) return null;
        return(
            <div style = {{display: "flex", flex: "1", width: "100vw", "flexDirection": "row", "background-color": "#524b00", border: 'none', borderColor: 'red'}}>
                <div style = {{width: '40%', backgroundColor: "#E5E5E5", border: 'solid', borderColor: 'violet', margin: '0px', paddingTop: '20px'}}>
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
                                <div style = {{right: '0px'}}> Mr.Tatum: Hey </div>
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

                <AnswerPage  />
                {/*<div style = {{position: 'relative', width: '100%', border: 'none', borderColor: 'orange', marginTop: '10px'}}>
=======
                </div>

                <div style = {{position: 'relative', width: '100%', border: 'none', borderColor: 'orange', marginTop: '10px'}}> 
                    <Button onClick = {() => this.clickedBack()} labelPosition = "left" icon="left chevron" content = "Back" style = {{left: '0px', position: "absolute", margin: "0px 0px 0px 30px"}}/>
                    {this.imageList()} 
                <div style = {{position: 'relative', width: '100%', border: 'none', borderColor: 'orange', marginTop: '10px'}}>
                    {this.imageList()}
>>>>>>> b392d550890e168b02e71029339d094bf11d7ceb
=======
>>>>>>> Stashed changes
                    <div style = {{position: 'relative', top: '23vh', left: '50%', height: '10%', width: '10%', alignItems: 'center', textAlign: 'center', color: 'white'}}>
                        WHO SHALL BE ELIMINATED?
                        <Button onClick = {() => this.onSubmit()} style = {{marginTop: "2vh", height: '10vh', width: '10vh', borderRadius: '5vh', textAlign: 'center', justifyContent: 'center', alignItems: 'center', fontSize: '90%', padding: '0px'}}>
                            Submit
                        </Button>
                    </div>
                </div>*/}
            </div>
        )
    }
}

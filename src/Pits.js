import React from 'react';
import {Image, Carousel} from 'react-bootstrap';
import axios from 'axios';
import { url } from './config';
import { Header, List, Button, Search, Menu} from 'semantic-ui-react';
import AnswerPage from './Components/AnswerPage';

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

    imageList = () => {
        console.log(this.state.imageData.length);
        const radius = 30;
        return (
          <List horizontal>
            {this.state.imageData.map((item, idx) => {
              return (
                <List.Item>
                  {/* <Image style = {{height: '150px', width: '150px'}} src={`data:image/jpeg;base64,${item.photos}`} /> */}

                  <img onClick={() => this.clickedImage(item)} style={{position: 'absolute', height: '15vh', width: '15vh', borderRadius: '15vh', borderWidth: '2px', borderStyle: this.state.selected === item.username ? 'solid' : 'none', borderColor: 'red', top: '30vh', left: '50%', transform: `rotate(${360*idx/7}deg) translate(${30}vh) rotate(${-360*idx/7}deg)`}} src={`data:image/jpeg;base64,${item.photos}`} />
                </List.Item>
              )
            })}
          </List>
        )
      }

    render(){
        if(!this.props.active) return null;
        return(
            <div style = {{display: "flex", flex: "1", width: "100vw", "flexDirection": "row", "background-color": "#F5F5F5", border: 'none', borderColor: 'red'}}>
                <div style = {{width: '40%', backgroundColor: "#E5E5E5", border: 'solid', borderColor: 'violet', margin: '0px', paddingTop: '10px'}}>
                    <div>
                        Groups 
                    </div>
                    <Search style = {{marginTop: '10px'}} open = {false}/>

                    <Menu vertical style = {{border: 'solid', borderColor: 'yellow', width: '100%', flex: 'column', margin: '10px auto'}}>
                        <Menu.Item style = {{height: '10vh', borderColor: 'black', border: 'none'}}>
                            <div style = {{textAlign: 'left'}}>
                                Pit 1
                            </div>
                            W/ Channing Tatum, Zac Efron, ...
                        </Menu.Item>

                        <Menu.Item style = {{height: '10vh', borderColor: 'black', border: 'none'}} active >
                            <div style = {{textAlign: 'left'}}>
                                Pit 2
                            </div>
                            W/ Olaf, Sven, Shrek...
                        </Menu.Item>

                        <Menu.Item style = {{height: '10vh', borderColor: 'black', border: 'none'}} >
                            <div style = {{textAlign: 'left'}}>
                                Pit 3
                            </div>
                            W/ Dwight Schrute, Janice, ...
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
                    {this.imageList()}
                    <div style = {{position: 'relative', top: '23vh', left: '50%', height: '10%', width: '10%', alignItems: 'center', textAlign: 'center', color: 'white'}}>
                        WHO WILL BE ELIMINATED???
                        <Button onClick = {() => this.onSubmit()} style = {{marginTop: "2vh", height: '10vh', width: '10vh', borderRadius: '5vh', textAlign: 'center', justifyContent: 'center', alignItems: 'center', fontSize: '90%', padding: '0px'}}>
                            Submit
                        </Button>
                    </div>
                </div>*/}
            </div>
        )
    }
}

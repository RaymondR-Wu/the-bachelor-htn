import React from 'react';
import {Image, Carousel} from 'react-bootstrap';
import axios from 'axios';
import { url } from './config';
import { List} from 'semantic-ui-react';

export default class Pits extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            imageData : []
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

    imageList = () => {
        console.log(this.state.imageData.length);
        const radius = 30;
        return (
          <List horizontal>
            {this.state.imageData.map((item, idx) => {
              return (
                <List.Item>
                  {/* <Image style = {{height: '150px', width: '150px'}} src={`data:image/jpeg;base64,${item.photos}`} /> */}
    
                  <img onClick={() => console.log("YO2")} style={{position: 'absolute', height: '15vh', width: '15vh', borderRadius: '10vh', top: '30vh', left: '50%', transform: `rotate(${360*idx/7}deg) translate(${30}vh) rotate(${-360*idx/7}deg)`}} src={`data:image/jpeg;base64,${item.photos}`} />
                </List.Item>
              )
            })}
          </List>
        )
      }

    render(){
        if(!this.props.active) return null;
        return(
            <div style = {{display: "flex", flex: "1", width: "100vw", "flexDirection": "row", paddingTop: "1.5rem", "background-color": "#E5E5E5", border: 'solid', borderColor: 'red'}}>
                <div style = {{width: '50%'}}>
                    YOOOO
                </div>
                <div style = {{position: 'relative', width: '100%', border: 'solid', borderColor: 'orange'}}> 
                    {this.imageList()}
                    <div style = {{position: 'relative', top: '30vh', left: '48%', height: '10%', width: '10%', alignItems: 'center', textAlign: 'center'}}>
                        WHO WILL BE ELIMINATED
                    </div>
                </div>
            </div>
        )
    }
}
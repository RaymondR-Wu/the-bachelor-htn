import React, { Component } from 'react';
import axios from 'axios';
import { url } from '../config';
import { List, Image} from 'semantic-ui-react';
//import {Image} from 'react-bootstrap';

export class Elimination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageData: [],
      loading : true
    }
  }

  componentDidMount() {
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
          console.log(idx, 2*Math.PI*idx/5);
          return (
            <List.Item>
              <Image style = {{height: '150px', width: '150px'}} src={`data:image/jpeg;base64,${item.photos}`} />

              {/* <img onClick={() => console.log("YO2")} style={{ position: 'absolute', clipPath: "circle(80px)", top: `calc(${50}% + ${radius*Math.sin(2*Math.PI*idx/5)}vh)`, left: `calc(${50}% + ${radius*Math.cos(2*Math.PI*idx/5)}vh)`, transform: "translate(-50%, -50%)"}} src={`data:image/jpeg;base64,${item.photos}`} /> */}
            </List.Item>
          )
        })}
      </List>
    )
  }

  render() {
    if (!this.props.active) return null;
    return (
      <div style={{ width: '100%', display:'flex',flexDirection:'column', flex: '1', height: '100%', border: 'solid', borderColor: 'orange' }}>
        <div style={{ flex: '0 1 auto', backgroundColor: 'blue' }}>
          This is a header bar
        </div>
        <div style={{ flex:'1 1 auto', backgroundColor: 'black' }}>
          {this.imageList()}
          <div style = {{color: 'white', position : 'absolute', left: '45%', top: '48%'}}>
            Who is eliminated?
          </div>
        </div>
      </div>
    )
  }
}

export default Elimination

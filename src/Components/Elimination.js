import React, { Component } from 'react';
import axios from 'axios';
import { url } from '../config';
import { List } from 'semantic-ui-react';

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
    return (
      <>
        {this.state.imageData.map(item => {
          //console.log(item.name);
          return (
            <>
              <img onClick={() => console.log("YO")} style={{ position: 'relative', height: '200px', width: '200px', clipPath: "circle(100px)"}} src={`data:image/jpeg;base64,${item.photos}`} />
            </>
          )
        })}
      </>
    )
  }



  render() {
    if (!this.props.active) return null;
    return (
      <div style={{ width: '100%', height: '100%', border: 'solid', borderColor: 'orange' }}>
        <div style={{ width: '100%', height: '50%', backgroundColor: 'blue' }}>
          This is a header bar
                </div>
        <div style={{ width: '100%', height: '100%', backgroundColor: 'black' }}>
          {this.imageList()}
        </div>
      </div>
    )
  }
}

export default Elimination

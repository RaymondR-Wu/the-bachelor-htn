import React from 'react';
import { Image } from 'react-bootstrap';
import { Search } from 'semantic-ui-react';
import UserDetails from './UserProfile';
import './Matches.css';
import axios from 'axios';

export default class Matches extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            matches: [],
            selectedIdx: 0
        }
    }

    renderMatches = () => {
        let matchList = [];
        matchList = this.state.matches;
        //let selectedUser = JSON.parse(localStorage.getItem('userDetails'));
        
        //matchList.push(JSON.parse(JSON.stringify(selectedUser)));

        //matchList.push(JSON.parse(JSON.stringify(selectedUser)));
        //matchList[1].username = "ADai2";
        //matchList[1].firstname = "Alvin";
        //matchList[1].lastname = "Dai";
        //matchList[1].email = "adai1@ocdsb.ca";

        //matchList.push(JSON.parse(JSON.stringify(selectedUser)));
        //matchList[2].username = "Cab40";
        //matchList[2].firstname = "Catherine";
        //matchList[2].lastname = "Burns";
        //matchList[2].email = "cburns40@ocdsb.ca";
        
        
        return(
            <>
                {matchList.map((match, idx) => {
                    let className = "match-row";
                    if(idx === this.state.selectedIdx) className += ' match-row-select';
                    if(idx >= 0) className += ' match-row-border';

                    return(
                        <div className={className} onClick={() => this.setState({selectedIdx: idx})}>
                            <Image className="match-image" src={match.profilepic} roundedCircle/>
                            <div className="match-text">
                                <p>Name: {match.firstname + ' ' + match.lastname}</p>
                                <p>Email: {match.email}</p>
                            </div>
                        </div>
                    )
                })}
            </>
        )
    }

    renderProfile = () => {
        let matchList = []; //hard code for now
        matchList = this.state.matches;
        //let selectedUser = JSON.parse(localStorage.getItem('userDetails'));
        
        //matchList.push(JSON.parse(JSON.stringify(selectedUser)));

        //matchList.push(JSON.parse(JSON.stringify(selectedUser)));
        //matchList[1].username = "ADai2";
        //matchList[1].firstname = "Alvin";
        //matchList[1].lastname = "Dai";
        //matchList[1].email = "adai1@ocdsb.ca";

        //matchList.push(JSON.parse(JSON.stringify(selectedUser)));
        //matchList[2].username = "Cab40";
        //matchList[2].firstname = "Catherine";
        //matchList[2].lastname = "Burns";
        //matchList[2].email = "cburns40@ocdsb.ca";

        if(matchList.length == 0 || this.state.selectedIdx >= matchList.length){
            return(
                <p>No Matches... Go to the "Pits" tab to get matched</p>
            )
        } else{
            return(<UserDetails active={true} userDetails={matchList[this.state.selectedIdx]}/>)
        }
    }

    componentDidMount(){ //queryForMatches
        console.log("HEYYYY");
        axios.get('http://localhost:8000/users/matches').then((response) => {
            let matches = [];
            let currentUser = JSON.parse(localStorage.getItem('userDetails'));
            response.data.forEach((match) => {
                if(match.username !== currentUser.username && !match.username.toLowerCase().includes('ray') && match.username !== 'rwu'){
                    matches.push(match);
                }
            })
            this.setState({
                matches:matches
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    render(){
        if(!this.props.active) return null;
        return(
            <div style={{display: "flex", flex: "1 1 auto", flexDirection: "row", border:"2px solid yellow"}}>

                <div style={{display: "flex", flex: 2.3, flexDirection: "column", alignItems: "center", border:"2px solid green", width: '80%', backgroundColor: "#E5E5E5"}}>
                    <div style = {{marginTop: '20px', fontSize: '30px'}}>
                        Companions
                    </div>
                    <Search style={{marginTop:"2rem", marginBottom:"2rem"}} placeholder="Search" open={false}/>
                    {this.renderMatches()}
                    <div style={{display: "flex", borderTop: "1px solid lightgrey", flex: 1, width:"100%", height:"100%", backgroundColor:"white"}} />
                </div>

                <div style={{display: "flex", flex: 6, border:"2px solid purple"}}>
                    {this.renderProfile()}
                </div>
            </div>
        )
    }
}

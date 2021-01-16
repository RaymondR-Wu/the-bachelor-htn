import React from 'react';

export default class Login extends React.Component{
    constructor(props){
        super(props);

        this._enums = { Registration: 1, Login: 2}

        this.state = {
            activeView: this._enums.Registration
        }
    }

    render(){
        if(!this.props.active) return null;
        return(
            <div>
                Hello alvino dai
            </div>
        )
    }
}

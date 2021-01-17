import React from 'react';
import './AnswerPage.css';
import { Form, Button } from 'react-bootstrap';

export default class AnswerPage extends React.Component{
    render(){
        return(
            <div className="answer-container">
                <div className="answer-inner-container">
                    <p style={{color:"#2D3142", fontSize: "2.25rem"}}>You received the following question from Alvin:</p>
                    <p style={{color:"#2D3142", fontSize: "2.25rem"}}>How does one find Nemo?</p>
                    <Form>
                        <Form.Group>
                            <Form.Control style={{width:'50vw', color: "#2D3142", border:"2px solid black", backgroundColor: "rgba(0,0,0,0)", fontSize: "1.75rem"}} placeholder="Type Answer Here..." as="textarea" rows={6}/>
                        </Form.Group>
                    </Form>
                    <div style={{paddingTop: "1rem", display: "flex", flex: 1, flexDirection: "row-reverse", width:"50vw"}}>
                        <Button variant="primary" size="lg">Submit Answer</Button>
                    </div>
                </div>
            </div>
        )
    }
}
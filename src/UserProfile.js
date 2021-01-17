import React from 'react';
import './UserProfile.css';
import {Image, Carousel, Modal, Button, Form} from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import AvatarEditor from 'react-avatar-editor';
import axios from 'axios';

export default class ProfilePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            name: '',
            phone: '',
            bio: '',
            birthday: '',
            images: [null, null, null],
            feature: '',
            editable: true,
            profilePic: null,
            editor: false,
            pfpEditOpen: false,
            position:  {x: 0.5, y:0.5},
            canvasUrl: '',
            zoomValue: 0,
            newImage: '',
            editingProfileDetails: false,
            editingImages: false,
            editingBio: false,
        }
    }

    setEditorRef = editor => {
        if (!this.state.editor) {
            this.setState({ editor })
        }
    }

    handleChange = (field, e) => {
        this.setState({
            [field]: e.target.value
        })
    }

    onSubmit = (e) => {
        console.log("IN HEREEE");
        const canvas = this.state.editor.getImage().toDataURL();
        fetch(canvas).then((response) => {
            response.blob()
                .then(async (blob) => {
                    this.setState({
                        canvasUrl: canvas,
                        newImage: await this.getBase64(blob),
                        pfpEditOpen: false,
                    });
                })
        })
    }

    componentDidUpdate(prevProps){
        if(prevProps.active !== this.props.active && this.props.active || (this.props.userDetails && prevProps.userDetails && this.props.userDetails.username !== prevProps.userDetails.username)){
            let userProfile = {};
            if(this.props.userDetails){
                userProfile = this.props.userDetails
                userProfile.editable = false;
            } else{
                userProfile = JSON.parse(localStorage.getItem('userDetails'));
            }

            userProfile.name = userProfile.firstname + ' ' + userProfile.lastname;
            userProfile.newImage = userProfile.profilepic;

            userProfile.images = [];
            if (userProfile.gallerypics) {
                for (let i = 0; i < userProfile.gallerypics.length; i++) {
                    if (userProfile.gallerypics[i] && userProfile.gallerypics[i + 1] && userProfile.gallerypics[i] !== 'null') {
                        userProfile.images.push(userProfile.gallerypics[i] + ',' + userProfile.gallerypics[i + 1]);
                        i++;
                    } else {
                        userProfile.images.push(userProfile.gallerypics[i]);
                    }
                }
            }

            for (let i = userProfile.images.length; i < 3; i++) {
                userProfile.images.push(null);
            }

            this.setState({
                ...userProfile
            })
        }
    }

    handlePositionChange = position => {
        this.setState({ position });
    }

    componentDidMount(){
        if(!this.props.active){
            console.log("huh");
            return null;
        } 

        let userProfile = {};
        if(this.props.userDetails){
            userProfile = this.props.userDetails;
            userProfile.editable = false;
        } else{
            userProfile = JSON.parse(localStorage.getItem('userDetails'));
        }

        userProfile.name = userProfile.firstname + ' ' + userProfile.lastname;
        userProfile.images = [];

        if(userProfile.gallerypics){
            for (let i = 0; i < userProfile.gallerypics.length; i++) {
                if (userProfile.gallerypics[i] && userProfile.gallerypics[i + 1] && userProfile.gallerypics[i] !== 'null') {
                    userProfile.images.push(userProfile.gallerypics[i] + ',' + userProfile.gallerypics[i + 1]);
                    i++;
                } else {
                    userProfile.images.push(userProfile.gallerypics[i]);
                }
            }
        }

        for(let i = userProfile.images.length;i < 3;i++){
            userProfile.images.push(null);
        }
        
        userProfile.newImage = userProfile.profilepic;

        this.setState({
            ...userProfile
        })
    }

    getProfilePic = () => {
        document.getElementById("profileImage").click();
    }

    handleFileUpload = (e) => {
        this.setState({
            profilePic: e.target.files[0],
            pfpEditOpen: true
        }); 
    }

    handlePreviewUpload = async (e, i) => {
        let images = this.state.images;
        images[i] = await this.getBase64(e.target.files[0]);
        this.setState({
            images
        })
    }
    
    getBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
     
    toggleModal = (modalName) => {
        this.setState({
            [modalName]: !this.state[modalName]
        })
    }

    sendProfileDetails = () => {
        axios({
            url: `http://localhost:8000/users/${this.state.username}`,
            data: {profilePic: this.state.newImage, galleryPics: this.state.images, bio: this.state.bio, feature: this.state.feature},
            method: "put"
        }).then((response) => {
            localStorage.setItem('userDetails', JSON.stringify(response.data));
        }).catch((err) => {
            console.log(err.data);
        })
        this.setState({
            editingProfileDetails: false,
            editingImages: false,
            editingBio: false
        });
    }
    
    renderCarousel = () => {
        let list = [];
        for(let i = 0;i < 3;i++){
            if(this.state.images[i] && this.state.images[i] !== 'null'){
                list.push(
                    <Carousel.Item key={i} className="carousel-item">
                        <Image className="carousel-item-image" src={this.state.images[i]} />
                    </Carousel.Item>
                )
            } else{
                list.push(
                    <Carousel.Item key={i} className="carousel-item">
                        <Image className="carousel-item-image" src="https://i.stack.imgur.com/y9DpT.jpg" />
                    </Carousel.Item>
                )
            }
        }

        return(
            <Carousel>
                {list}
            </Carousel>
        )
    }

    renderPreview = () => {
        let list = [];
        for(let i = 0;i < 3;i++){
            if(this.state.images[i] && this.state.images[i] !== 'null'){
                list.push(
                    <Image key={i} className="carousel-preview-image" src={this.state.images[i]} rounded />
                )
            } else{
                list.push(
                    <Image key={i} className="carousel-preview-image" src="https://i.stack.imgur.com/y9DpT.jpg" rounded />
                )
            }

            if(this.state.editingImages){
                list[i] = (
                    <div key={i+4}>
                        {list[i]}
                        <div >
                            <p className="profile-overview-chooseText" onClick={() => {document.getElementById(`previewImage${i}`).click()}}>Choose Image</p>
                            <input
                                id={`previewImage${i}`}
                                accept="image/*"
                                type='file'
                                onChange={(e) => this.handlePreviewUpload(e,i)}
                                style={{ position: "fixed", top: "-100em" }}
                            />
                        </div>
                    </div>
                )
            }
        }

        return(
            <div className="carousel-preview">
                {list}
            </div>
        )
    }

    render(){
        if(!this.props.active) return null;
        return(
            <div className="profile-body" style={this.props.userDetails ? {width:"100%", paddingTop:"5rem"} : {}}>
                <div className="profile-info">
                    <div className="profile-border">
                        {this.state.newImage ? 
                            <Image className="profile-image" src={this.state.newImage} roundedCircle/>
                            :<Image className="profile-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP3lC0SfgqCcTGipFh64hddM6xgBYQj90wOA&usqp=CAU" roundedCircle/>
                        }
                        {this.state.editingProfileDetails? 
                            <div className="profile-image-overlay" onClick={this.getProfilePic}>
                                <p>Choose Image</p>
                                <input
                                    id="profileImage"
                                    accept="image/*"
                                    type='file'
                                    onChange={this.handleFileUpload}
                                    style={{ position: "fixed", top: "-100em" }}
                                />
                            </div> : null
                        }
                    </div>
                    <div style={{display:"flex", alignItems:"flex-end", flexDirection:"row", padding:"1rem"}}>
                        <p className="profile-name no-margin">{this.state.name}</p>
                        {!this.state.editable ? null : this.state.editingProfileDetails?
                            <p className="profile-save no-margin" onClick={this.sendProfileDetails}>Save</p> :
                            <svg onClick={() => {this.setState({editingProfileDetails: true})}} style={{ transform: "scale(2) translateX(10px) translateY(-8px)" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                            </svg>
                        }
                    </div>
                    <div className="profile-details">
                        <p>Username: {this.state.username}</p>
                        <p>Birthday: {this.state.birthday || 'dd/mm/yyyy'}</p>
                        <p style={{ display: "flex", alignItems: "center", flexDirection: "row"}}>Best Feature:&nbsp;{this.state.editingProfileDetails ? <Form><Form.Group><Form.Control value={this.state.feature} onChange={(e) => this.handleChange('feature', e)} placeholder="Feature" /> </Form.Group></Form> : this.state.feature}</p>
                        <p>Email: {this.state.email}</p>
                        <p>Phone Number: {this.state.phone}</p>
                    </div>
                </div>
                <div className="profile-carousel">
                    <div className="carousel-container">
                        <div style={{display:"flex", alignItems:"flex-end", flexDirection:"row", padding:"1rem"}}>
                            <p className="profile-name medium-text no-margin">View Pictures</p>
                            {!this.state.editable ? null : this.state.editingImages ?
                                <p className="profile-save no-margin" onClick={this.sendProfileDetails}>Save</p> :
                                <svg onClick={() => {this.setState({editingImages: true})}} style={{ transform: "scale(1.5) translateX(10px) translateY(-6px)" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                </svg>
                            }
                        </div>
                        {this.renderCarousel()}
                        {this.renderPreview()}
                        <div style={{display:"flex", alignItems:"flex-end", flexDirection:"row", padding:"1rem"}}>
                            <p className="profile-name medium-text no-margin">View Bio</p>
                            {!this.state.editable ? null : this.state.editingBio?
                                <p className="profile-save no-margin" onClick={this.sendProfileDetails}>Save</p> :
                                <svg onClick={() => {this.setState({editingBio: true})}} style={{ transform: "scale(1.5) translateX(10px) translateY(-6px)" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                </svg>
                            }
                        </div>
                        {this.state.editingBio ? 
                            <Form>
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Control style={{width: '40vw'}} as="textarea" rows={4} value={this.state.bio} onChange={(e) => { this.handleChange('bio', e) }} />
                                </Form.Group>
                            </Form>
                            : <p style={{textAlign: "left"}}> {this.state.bio || 'Bio is currently empty. Edit to have better changes at finding a match'}</p>
                        }
                    </div>
                </div>
                <Modal centered show={this.state.pfpEditOpen} onHide={() => this.toggleModal('pfpEditOpen')}>
                    <Modal.Header closeButton>
                        <Modal.Title >
                            Edit Profile Picture
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.profilePic ? 
                            <div style={{alignItems: "center", justifyContent: "center", display:"flex", flexDirection: "column"}}>
                                <AvatarEditor
                                    image={URL.createObjectURL(this.state.profilePic)}
                                    width={250}
                                    height={250}
                                    border={50}
                                    borderRadius={125}
                                    position={this.state.position}
                                    onPositionChange={this.handlePositionChange}
                                    scale={parseFloat(1 + 0.04 * parseFloat(this.state.zoomValue))}
                                    rotate={0}
                                    ref={((ref) => this.setEditorRef(ref))}
                                />
                                <RangeSlider value={this.state.zoomValue} style={{width: "60%"}} onChange={(e) => this.setState({ zoomValue: e.target.value })} />
                            </div>
                            : null
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" small="true" onClick={() => this.toggleModal('pfpEditOpen')}>Cancel</Button>
                        <Button small="true" onClick={this.onSubmit}>Submit</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
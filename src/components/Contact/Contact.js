import React, { Component } from "react"
import "./Contact.css"
import { Map, GoogleApiWrapper, Marker } from "google-maps-react"
import Justyna from "../../images/justyna.jpg"
import { SocialIcon } from 'react-social-icons';


const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );

export class Contact extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            comments: ''
        }
    }

    handleUserName = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    handleUserEmail = (e) => {
        e.preventDefault();
        this.setState({
            email: e.target.value
        })
    }
    handleUserComments = (e) => {
        this.setState({
            comments: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)
        this.setState ({
            name: '',
            email: '',
            comments: ''
        })
        alert("Message has been sucessfully submitted :)")
    }


    render() {
        const contactMapWrapper = {
            width: '502px',
            height: '402px',
            margin: '10px',
            overflow: 'hidden',
            border: '1px solid #000'
        }
        const contactMap = {
            width: '500px',
            height: '400px',
        }
        const pic = {
            width: '100%',
            height: '100%'
        }

        return (
            <div className="contact-page" >

                <div className="wrapper-top">
                    <div className="contact-pics">
                        <img src={Justyna} alt="pic1" style={pic} />
                    </div>
                    <form className="contact-form" onSubmit={this.handleSubmit}>
                        <h1>Write something to me!</h1>
                        <div className="name">
                            <label>Tell me your name:</label>
                            <input
                                type="text"
                                name="name"
                                value={this.state.name} onChange={this.handleUserName} />
                        </div>
                        <div className="email">
                            <label>And your email:</label>
                            <input
                                type="email"
                                name="email"
                                value={this.state.email} onChange={this.handleUserEmail} />
                        </div>
                        <div className="textarea">
                            <label>Your message:</label>
                            <textarea
                                type="text"
                                name="textarea"
                                value={this.state.comments}
                                onChange={this.handleUserComments}>
                            </textarea>
                        </div>
                        <button
                            type="submit"
                            name="submit" 
                            value="Submit"
                            className="contact-button">Submit</button>
                    </form>
                </div>

                <div className="wrapper-bottom">
                    <div className="contact-address">
                        <h1>You can contact me many different ways :)</h1>
                        <h2>You can call me</h2>
                        <h2>(+44) 7474 105 550</h2>
                        <h2>or you can follow me on social media...</h2>
                        <SocialIcon network="facebook" target="_blank" url="https://www.facebook.com/justyna.marczynska/" fgColor="#fff" bgColor="#519e8a" style={{ height: 100, width: 100, margin: 10 }} className="social"/>
                        <SocialIcon network="instagram" target="_blank" url="https://www.instagram.com/justyna_marczynska78/" fgColor="#fff" bgColor="#519e8a" style={{ height: 100, width: 100, margin: 10 }} className="social"/>
                        <SocialIcon network="twitter" target="_blank" url="https://twitter.com/JustaMarcz/" fgColor="#fff" bgColor="#519e8a" style={{ height: 100, width: 100, margin: 10 }} className="social" />               
                    </div>
                    <div style={contactMapWrapper} id="MapWrapper">
                        <Map
                            google={this.props.google}
                            style={contactMap}
                            zoom={10}
                            initialCenter={{ lat: 55.9533, lng: -3.1883 }}>
                            <Marker position={{ lat: 55.9533, lng: -3.1883 }} />
                        </Map>
                    </div>
                </div>
            </div >
        )
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_KEY
})(Contact);



import React, { Component  } from "react"
import "./Contact.css"
import { Map, GoogleApiWrapper, Marker } from "google-maps-react"
import Justyna from "../../images/justyna.jpg"
import { SocialIcon } from 'react-social-icons';
import axios from "axios";


export class Contact extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            comments: '',
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
        const form = e.target;
        const {name, email, comments} = this.state
        let messages = []
        //Simple validation
        if (name === "" || name === null) {
            messages.push("Provide your name.\n")   
        } else if (name.length < 3) {
            messages.push("I am sure your name is longer :)\n")
        }
        if (email === "" || email === null) {
            messages.push("Email address is required.\n")
        }
        if (comments === "" || comments === null) {
            messages.push("Write a message.\n") 
        } else if (comments.length < 3) {
            messages.push("Write something more :)\n")
        }
        //if any error message ened up in message array stop function and display error message
        if (messages.length > 0) {
            e.preventDefault()
            alert(messages.join(""))
            return
        }
        //if there is no errors use axios to send message to formspree and designted email
        axios({
            method: "post",
            url: "https://formspree.io/xnqbkebg",
            data: new FormData(form)
          })
        //Display everything in console
        console.log(this.state)
        this.setState ({
            name: '',
            email: '',
            comments: ''
        })
        alert("Message has been sucessfully submitted :)")
    }

    render() {
        return (
            <div className="contact-page" >
                <div className="wrapper-top">
                    <div className="contact-pics">
                        <img src={Justyna} alt="pic1" className="contact-pic1" />
                    </div>
                    <form className="contact-form" onSubmit={this.handleSubmit} >
                        <h1>Write something to me!</h1>
                        <div className="name">
                            <label>Tell me your name:</label>
                            <input
                                type="text"
                                name="name"
                                value={this.state.name} onChange={this.handleUserName} />
                        </div>
                        <div className="email">
                            <label htmlFor="email">And your email:</label>
                            <input
                                type="email"
                                value={this.state.email} 
                                onChange={this.handleUserEmail} 
                                name="_replyto"/>
                        </div>
                        <div className="textarea">
                            <label htmlFor="message">Your message:</label>
                            <textarea
                                type="text"
                                name="message"
                                value={this.state.comments}
                                onChange={this.handleUserComments}>
                            </textarea>
                        </div>
                        <button
                            type="submit"
                            name="submit" 
                            value="Send"
                            className="contact-button">Submit</button>
                    </form>
                </div>

                <div className="wrapper-bottom">
                    <div className="contact-address">
                        <h1>You can contact me many different ways :)</h1>
                        <h2>You can call me</h2>
                        <h2>(+44) 7474 105 550</h2>
                        <h2>or you can follow me on social media...</h2>
                        <div className="social-icons">
                            <SocialIcon 
                                network="facebook" 
                                target="_blank" 
                                url="{{ .Site.BaseURL }} https://www.facebook.com/justyna.marczynska/" 
                                fgColor="#fff" 
                                bgColor="#519e8a" 
                                style={{ height: 100, width: 100, margin: 10 }} 
                                className="social"/>
                            <SocialIcon 
                                network="instagram" 
                                target="_blank" 
                                url=" {{ .Site.BaseURL }} https://www.instagram.com/justyna_marczynska78/" 
                                fgColor="#fff" 
                                bgColor="#519e8a" 
                                style={{ height: 100, width: 100, margin: 10 }} 
                                className="social"/>
                            <SocialIcon 
                                network="twitter" 
                                target="_blank" 
                                url="https://twitter.com/JustaMarcz/" 
                                fgColor="#fff" 
                                bgColor="#519e8a" 
                                style={{ height: 100, width: 100, margin: 10 }} 
                                className="social"/>               
                        </div>
                    </div>
                    <div id="MapWrapper">
                        <Map
                            id="contactMap"
                            google={this.props.google}
                            zoom={10}
                            resetBoundsOnResize={true}
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



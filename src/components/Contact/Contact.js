import React, { Component } from "react"
import "./Contact.css"
import { Map, GoogleApiWrapper, Marker } from "google-maps-react"
import Justyna from "../../images/justyna.jpg"


const formValid = (formErrors) => {
    let valid = true
    Object.values(formErrors).forEach(val => val.length > 0 && (valid = false))
    return valid
}

export class Contact extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            comments: '',
            formErrors: {
                name: '',
                email: '',
                comments: ''
            }
        }
    }

    handleUserName = (e) => {
        /*let formErrors = this.state.formErrors
        formErrors = value.length < 3 && value.length > 0 ?
            'Minimum 3 charachters required' :
            ''
            */
        this.setState({
            name: e.target.value
        })
    }
    handleUserEmail = (e) => {
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
        if (formValid(this.state.formErrors)) {
            alert(`Hi ${this.state.name} your message has been submited :D`)
            console.log(`Submitted: 
            ${this.state.name} 
            ${this.state.email} 
            ${this.state.comments}`)
        } else {
            console.error('Form invalid - display error message')
        }
    }


    render() {
        /*const contactPage = {
            display: 'grid',
            gridTemplateColumns: "'10%' minmax(300px, 1fr))' 'minmax(300px, 1fr))' '10%'",
            gridTemplateRows: "'1fr' '1fr'",
            gridTemplateAreas: "'. pics form .' '. address map .'",
            justifyItems: 'center',
            alignItems: 'center',
            columnGap: '15px',
            backgroundColor: 'skyblue',
            height: '100%',
            margin: '0'
        }
        const contactPics = {
            width: '100%',
            height: '600px',
            margin: '10px',
            gridArea: 'pics'
        }
        const contactForm = {
            width: '100%',
            height: '600px',
            margin: '10px',
            border: '1px solid #000',
            gridArea: 'form',
            backgroundColor: '#FFBACD'
        }*/
        const contactAddress = {
            width: '100%',
            height: '600px',
            margin: '10px',
            border: '1px solid #000',
            gridArea: 'address',
            backgroundColor: '#4682B4'
        }
        const contactMapWrapper = {
            width: '602px',
            height: '602px',
            margin: '10px',
            border: '1px solid #000',
            gridArea: 'map'
        }
        const contactMap = {
            width: '600px',
            height: '600px'
        }
        const pic = {
            width: '100%',
            height: '100%'
        }


        return (
            <div /*style={contactPage}*/ className="contact-page" >
                <div className="wrapper-top">
                    <div /*style={contactPics}*/ className="contact-pics">
                        <img src={Justyna} alt="pic1" style={pic} />
                    </div>
                    <form /*style={contactForm}*/ className="contact-form" onSubmit={this.handleSubmit}>
                        <h1>Write something to me !</h1>
                        <div>
                            <label>Tell me your name:</label>
                            <input
                                type="text"
                                name="name"
                                value={this.state.name} onChange={this.handleUserName} />
                        </div>
                        <div>
                            <label>And your email:</label>
                            <input
                                type="email"
                                name="email"
                                value={this.state.email} onChange={this.handleUserEmail} />
                        </div>
                        <div>
                            <label>Your message:</label>
                            <textarea
                                value={this.state.comments}
                                onChange={this.handleUserComments}>
                            </textarea>
                        </div>
                        <button
                            type="submit" value="Submit">Submit</button>
                    </form>
                </div>

                {/*
                <div style={contactAddress}>
                    Address + contact + social media
                </div>
                <div style={contactMapWrapper}>
                    <Map
                        google={this.props.google}
                        style={contactMap}
                        zoom={10}
                        initialCenter={{ lat: 55.9533, lng: -3.1883 }}>
                        <Marker position={{ lat: 55.9533, lng: -3.1883 }} />
                    </Map>
                </div>*/}
            </div >
        )
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_KEY
})(Contact);



import React, { Component } from "react"
import "./Contact.css"
import { Map, GoogleApiWrapper, Marker } from "google-maps-react"


export class Contact extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stores: [{ lat: 47.49855629475769, lng: -122.14184416996333 },
            { latitude: 47.359423, longitude: -122.021071 }]
        }
    }

    /*
    displayMarkers = () => {
        return this.state.stores.map((store, index) => {
            return <Marker key={index} id={index} position={{
                lat: store.latitude,
                lng: store.longitude
            }}
                onClick={() => console.log("You clicked me!")} />
        })
    }*/
    render() {
        const mapStyles = {
            display: "flex",
            justifyContent: "centre",
            alignItems: "centre",
            width: "500px",
            height: "500px",
            margin: "25px",
            border: "1px solid #000"
        }



        return (
            <div className="contact-page" >
                <Map
                    google={this.props.google}
                    style={mapStyles}
                    zoom={10}
                    initialCenter={{ lat: 55.9533, lng: -3.1883 }}>
                    <Marker position={{ lat: 55.9533, lng: -3.1883 }} />
                </Map>
            </div >
        )
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_KEY
})(Contact);

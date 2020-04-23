import React from 'react'
import "./Default.css"
import { Link } from 'react-router-dom'

export default function Default() {
    return (
        <div className="default-page">
           <p>Error 404: page not found</p>
           <p>you are in the wrong place</p>
           <Link to='/' className="return-home">
                <button className="default-button">return home</button>
            </Link>
        </div>
    )
}

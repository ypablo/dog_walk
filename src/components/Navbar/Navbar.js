import React from 'react'
import "./Navbar.css"
import { Link } from "react-router-dom"
import Dog from "../../images/dog-logo.png"

export default function Navbar() {
    return (
        <nav className="nav">
            <div className="nav-logo"><img src={Dog} alt="" /></div>
            <ul className="nav-links">
                <Link to="/" style={{ textDecoration: "none", marginRight: "15px" }}>
                    <li>Home</li>
                </Link>
                <Link to="/contact" style={{ textDecoration: "none" }}>
                    <li>Contact</li>
                </Link>
            </ul>
        </nav>
    )
}

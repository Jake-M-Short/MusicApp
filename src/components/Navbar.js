import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">🎵 MusicApp</Link>
            <input type="text" className="search-bar" placeholder="Search..." />
        </nav>
    );
}

export default Navbar;

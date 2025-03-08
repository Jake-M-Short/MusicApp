import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/global.css"; // Correct path to your global CSS

function HomePage() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search/${query}`);
        }
    };

    return (
        <div className="container">
            {/* Logo */}
            <Link to="/">
                <img src="/assets/images/Logo.png" alt="Logo" className="logo" />
            </Link>

            <h1>Music App</h1>

            <form onSubmit={handleSearch} className="search-container">
                <input
                    type="text"
                    placeholder="Search music..."
                    className="search-input"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            <h2>Genres</h2>
            <div className="genre-links">
                <Link to="/genre/pop">Pop</Link>
                <Link to="/genre/rock">Rock</Link>
                <Link to="/genre/hiphop">Hip-Hop</Link>
            </div>

            <h2>Your Playlist</h2>
            <p>No songs added yet.</p>
        </div>
    );
}

export default HomePage;

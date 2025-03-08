import React from "react";
import "../styles/global.css";

function PlayerPage() {
    return (
        <div>
            <h1>Now Playing</h1>
            <p>Song Name - Artist Name</p>
            <button>Play</button>
            <button>Skip</button>
            <button>Restart</button>
        </div>
    );
}

export default PlayerPage;

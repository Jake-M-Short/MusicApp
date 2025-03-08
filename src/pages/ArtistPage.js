import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../styles/global.css";

const API_KEY = process.env.REACT_APP_LASTFM_API_KEY;

function ArtistPage() {
    const { id } = useParams();
    const [artist, setArtist] = useState(null);
    const [topTracks, setTopTracks] = useState([]);

    useEffect(() => {
        const fetchArtistData = async () => {
            try {
                const artistRes = await axios.get("https://ws.audioscrobbler.com/2.0/", {
                    params: {
                        method: "artist.getinfo",
                        artist: id,
                        api_key: API_KEY,
                        format: "json",
                    },
                });

                const tracksRes = await axios.get("https://ws.audioscrobbler.com/2.0/", {
                    params: {
                        method: "artist.gettoptracks",
                        artist: id,
                        api_key: API_KEY,
                        format: "json",
                    },
                });

                setArtist(artistRes.data.artist);
                setTopTracks(tracksRes.data.toptracks.track.slice(0, 10));
            } catch (error) {
                console.error("Error fetching artist data:", error);
            }
        };

        fetchArtistData();
    }, [id]);

    if (!artist) return <p>Loading artist details...</p>;

    return (
        <div>
            {/* Logo */}
            <Link to="/">
                <img src="/assets/images/Logo.png" alt="Logo" className="logo" />
            </Link>

            <h1>{artist.name}</h1>
            <img src={artist.image[2]["#text"]} alt={artist.name} />

            <h2>Top Tracks</h2>
            <ul>
                {topTracks.map((track) => (
                    <li key={track.name}>
                        <Link to={`/song/${encodeURIComponent(track.name)}/${encodeURIComponent(artist.name)}`}>
                            {track.name}
                        </Link>
                        ({track.playcount} plays)
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ArtistPage;

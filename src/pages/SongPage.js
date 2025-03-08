import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/global.css";

const API_KEY = process.env.REACT_APP_LASTFM_API_KEY;

function SongPage() {
    const { songName, artistName } = useParams(); // Get song and artist from URL
    const [songDetails, setSongDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSongData = async () => {
            try {
                setLoading(true);

                // Fetch song info (for song name and artist)
                const songRes = await axios.get(`https://ws.audioscrobbler.com/2.0/`, {
                    params: {
                        method: "track.getinfo",
                        track: songName,
                        artist: artistName,
                        api_key: API_KEY,
                        format: "json",
                    },
                });

                setSongDetails(songRes.data.track);
            } catch (error) {
                console.error("Error fetching song data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSongData();
    }, [songName, artistName]);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            {/* Logo */}
            <Link to="/">
                <img src="/assets/images/Logo.png" alt="Logo" className="logo" />
            </Link>

            <h1>{songDetails?.name} - {songDetails?.artist?.name}</h1>
            <h3>Album: {songDetails?.album?.title}</h3>
            <p>Play Count: {songDetails?.playcount}</p>
        </div>
    );
}

export default SongPage;

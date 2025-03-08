import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../styles/global.css";

const API_KEY = process.env.REACT_APP_LASTFM_API_KEY;

function SearchResultsPage() {
    const { query } = useParams();
    const [artists, setArtists] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const artistRes = await axios.get("https://ws.audioscrobbler.com/2.0/", {
                    params: {
                        method: "artist.search",
                        artist: query,
                        api_key: API_KEY,
                        format: "json",
                    },
                });

                const trackRes = await axios.get("https://ws.audioscrobbler.com/2.0/", {
                    params: {
                        method: "track.search",
                        track: query,
                        api_key: API_KEY,
                        format: "json",
                    },
                });

                setArtists(artistRes.data.results.artistmatches.artist);
                setTracks(trackRes.data.results.trackmatches.track);
            } catch (error) {
                console.error("Error fetching search results:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [query]);

    return (
        <div className="container">
            {/* Logo */}
            <Link to="/">
                <img src="/assets/images/Logo.png" alt="Logo" className="logo" />
            </Link>

            <h1>Search Results for "{query}"</h1>

            {loading ? <p>Loading...</p> : (
                <>
                    <h2>Artists</h2>
                    <ul>
                        {artists.length > 0 ? (
                            artists.map((artist) => (
                                <li key={artist.name}>
                                    <Link to={`/artist/${artist.name}`}>{artist.name}</Link>
                                </li>
                            ))
                        ) : (
                            <p>No artists found.</p>
                        )}
                    </ul>

                    <h2>Songs</h2>
                    <ul>
                        {tracks.length > 0 ? (
                            tracks.map((track) => (
                                <li key={track.name}>
                                    {track.name} by{" "}
                                    <Link to={`/artist/${track.artist}`}>{track.artist}</Link>
                                </li>
                            ))
                        ) : (
                            <p>No tracks found.</p>
                        )}
                    </ul>
                </>
            )}
        </div>
    );
}

export default SearchResultsPage;

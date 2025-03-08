import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import "../styles/global.css";

const GenrePage = () => {
    const { id } = useParams();
    const [topSongs, setTopSongs] = useState([]);
    const [topArtists, setTopArtists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");  // New state for search query
    const API_KEY = process.env.REACT_APP_LASTFM_API_KEY;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const songRes = await fetch(
                    `https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${id}&api_key=${API_KEY}&format=json`
                );
                if (!songRes.ok) throw new Error("Failed to fetch top songs data");

                const songData = await songRes.json();
                const artistRes = await fetch(
                    `https://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=${id}&api_key=${API_KEY}&format=json`
                );
                if (!artistRes.ok) throw new Error("Failed to fetch top artists data");

                const artistData = await artistRes.json();
                const topTracks = songData?.tracks?.track?.slice(0, 10) || [];
                const topArtists = artistData?.topartists?.artist?.slice(0, 10) || [];

                setTopSongs(topTracks);
                setTopArtists(topArtists);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredSongs = topSongs.filter((song) =>
        song.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredArtists = topArtists.filter((artist) =>
        artist.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <Link to="/">
                <img src="/assets/images/Logo.png" alt="Logo" className="logo" />
            </Link>

            <h1>Top {id} Songs and Artists</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search tracks or artists"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>
            <h2>Top 10 Tracks</h2>
            <ul>
                {filteredSongs.length > 0 ? (
                    filteredSongs.map((track, index) => (
                        <li key={index}>
                            <Link to={`/song/${encodeURIComponent(track.name)}/${encodeURIComponent(track.artist.name)}`}>
                                <strong>{track.name}</strong> by{" "}
                                <Link to={`/artist/${encodeURIComponent(track.artist.name)}`}>
                                    {track.artist.name}
                                </Link>
                            </Link>
                        </li>
                    ))
                ) : (
                    <p>No tracks found.</p>
                )}
            </ul>

            <h2>Top 10 Artists</h2>
            <ul>
                {filteredArtists.length > 0 ? (
                    filteredArtists.map((artist, index) => (
                        <li key={index}>
                            <Link to={`/artist/${encodeURIComponent(artist.name)}`}>
                                <strong>{artist.name}</strong>
                            </Link>
                        </li>
                    ))
                ) : (
                    <p>No artists found.</p>
                )}
            </ul>
        </div>
    );
};

export default GenrePage;

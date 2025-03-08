import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ArtistPage from "./pages/ArtistPage";
import GenrePage from "./pages/GenrePage";
import SearchResultsPage from "./pages/SearchResultsPage"; // Import new search page
import SongPage from "./pages/SongPage"; // Import the SongPage component
import './firestore';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/artist/:id" element={<ArtistPage />} />
                <Route path="/genre/:id" element={<GenrePage />} /> {/* Genre page route */}
                <Route path="/search/:query" element={<SearchResultsPage />} />
                <Route path="/song/:songName/:artistName" element={<SongPage />} />
            </Routes>
        </Router>
    );
}

export default App;

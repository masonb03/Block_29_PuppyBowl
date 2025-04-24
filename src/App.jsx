import { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './App.css';
import AllPlayers from './components/AllPlayers';
import FavPlayer from './components/FavPlayer';
import SinglePlayer from './components/SinglePlayer';
import CreatePlayer from './components/CreatePlayer';

function App() {
  const [player, setPlayer] = useState([])
  const [favPlayer, setFavPlayer] = useState(null)


  return (
    <div>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/favorite">Favorites</Link>
        <Link to="/create">Create a Player</Link>
      </nav>

      <h2>Puppy Bowl Player Tracker</h2>
      <Routes>
        <Route 
          path="/" 
          element={
            <AllPlayers player={player}
              setPlayer={setPlayer}
              favPlayer={favPlayer}
              setFavPlayer={setFavPlayer}
            />
          } 
        />
        <Route path="/create" element={<CreatePlayer />} />
        <Route path="/favorite" element={<FavPlayer favPlayer={favPlayer} setFavPlayer={setFavPlayer} />} />
        <Route path="/players/:id" element={<SinglePlayer />} />
      </Routes>
    </div>
  );
}

export default App;

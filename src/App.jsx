import { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './App.css';
import AllPlayers from './components/AllPlayers';
import FavPlayer from './components/FavPlayer';
import NavBar from './components/NavBar';
import Signup from './components/Signup';
import SinglePlayer from './components/SinglePlayer';

function App() {
  const [player, setPlayer] = useState([])
  const [favPlayer, setFavPlayer] = useState(null)


  return (
    <div>

      <nav>
        <Link>Home</Link>
        <Link>Favorites</Link>
        <Link>Sign Up</Link>
      </nav>

      <h2>Puppy Bowl Players</h2>
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
        <Route path="/signup" element={<Signup />} />
        <Route path="/favorite" element={<FavPlayer />} />
        <Route path="/players/:id" element={<SinglePlayer />} />
      </Routes>
    </div>
  );
}

export default App;

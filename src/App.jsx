import { useState, useEffect } from 'react'
import './App.css'
import {Routes, Route, Link, Navigate, useNavigate} from 'react'

function App() {
const [token, setToken] = useState(()=> localStorage.getItem("token"));
const [player, setPlayer] = useState([]);
const [favPlayer, setFavPlayer] = useState(null);
const navigate = useNavigate();

useEffect(() =>{
  if(token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
}, [token]);


  return (
    <>
    <Routes>
      
    </Routes>
    </>
  )
}

export default App

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function SinglePlayer(){
const {id} = useParams();
const [player, setPlayer] = useState(null);

useEffect(()=>{
    async function fetchSinglePlayer() {
        try{
            const res = await fetch(
                `https://fsa-puppy-bowl.herokuapp.com/api/2501-FTB-ET-WEB-PT/players/${id}`
            )
            const data = await res.json();
            setPlayer(data.data.player)
        }catch(err){
            console.error("Failed to fetch player:", err)
        }
    }
    fetchSinglePlayer();
}, [id])

if(!player){
    return <p>Loading player...</p>
}

    return(
        <div>
            <h2>{player.name}</h2>
            <p><strong>Breed:</strong>{player.breed}</p>
            <p><strong>Status:</strong>{player.status}</p>
            <p><strong>Team:</strong>{player.team?.name || JSON.stringify(player.team) || 'No team assigned'}</p>
            {player.imageUrl ? (
                <img src={player.imageUrl} alt={player.name} width="200" />
            ) :(
                <p>No image avaliable</p>
            )}
            <Link to="/">
            <button>Back Home</button>
            </Link>
        </div>
    )
}

export default SinglePlayer;
import {useState, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';

function AllPlayers({player, setPlayer, favPlayer, setFavPlayer}) {
    const navigate = useNavigate();

    useEffect(() =>{
        async function fetchPlayers(){
            try{
                const res = await fetch(
                    'https://fsa-puppy-bowl.herokuapp.com/api/2501-FTB-ET-WEB-PT/players'
                );
                const data = await res.json()
                setPlayer(data.data.players)
            }catch(err){
                console.error("Failed to fetch players:", err)
            }
        }
        fetchPlayers();
    }, [setPlayer])

    return(
        <div>
            <h3>All Players</h3>
            {player.length === 0 ? (
                <p>Loading players...</p>
            ) : (
                <ul>
                    {player.map((pup) =>(
                        <li key={pup.id}>
                            <Link to={`/players/${pup.id}`}>{pup.name}</Link> - {pup.breed}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default AllPlayers;
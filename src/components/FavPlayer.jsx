import { Link } from "react-router-dom";

function FavPlayer({favPlayer, setFavPlayer}){
    if(!favPlayer){
        return(
            <>
            <p>You have no players favorited yet, go back and find some!</p>
            <Link to="/">Back to home</Link>
            </>
        )
    }  

    return (
        <div>
        {favPlayer.imageUrl ? (
          <img
            src={favPlayer.imageUrl}
            alt="Favorite Player"
            width="200"
          />
        ) : (
          <p>No image available</p>
        )}
        <p><strong>Breed:</strong> {favPlayer?.breed}</p>
        <p><strong>Status:</strong> {favPlayer?.status}</p>
        <p><strong>Team:</strong> {favPlayer?.team?.name || "No team"}</p>
        <br />
        <button onClick={() => setFavPlayer(null)}>Remove Favorite</button>
        <br /><br />
        <Link to="/">Back to Home</Link>
       </div>
    )
}

export default FavPlayer;
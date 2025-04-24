import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function AllPlayers({ player, setPlayer, favPlayer, setFavPlayer }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    async function fetchPlayers() {
      try {
        const res = await fetch(
          "https://fsa-puppy-bowl.herokuapp.com/api/2501-FTB-ET-WEB-PT/players"
        );
        const data = await res.json();
        setPlayer(data.data.players);
      } catch (err) {
        console.error("Failed to fetch players:", err);
      }
    }
    fetchPlayers();
  }, [setPlayer]);


  const myPlayerIds =
    JSON.parse(localStorage.getItem("myPlayerIds"))?.map((id) => parseInt(id)) || [];


  async function handleDelete(playerId) {
    try {
      const res = await fetch(
        `https://fsa-puppy-bowl.herokuapp.com/api/2501-FTB-ET-WEB-PT/players/${playerId}`,
        {
          method: "DELETE"
        }
      );
      const result = await res.json();

      if (result.success) {

        setPlayer((prev) => prev.filter((p) => p.id !== playerId));


        const updated = myPlayerIds.filter((id) => id !== playerId);
        localStorage.setItem("myPlayerIds", JSON.stringify(updated));
      } else {
        alert("Failed to delete player.");
      }
    } catch (err) {
      console.error("Error deleting player:", err);
      alert("Something went wrong.");
    }
  }

  return (
    <div>
      <h3>All Puppy Bowl Players</h3>

      <input
        type="text"
        placeholder="Search players..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul>
        {player
          .filter((pup) =>
            pup.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((pup) => (
            <li key={pup.id} style={{ marginBottom: "1em" }}>
              <strong>{pup.name}</strong> - {pup.breed}
              <br />
              Status: {pup.status}
              <br />
              <button onClick={() => setFavPlayer(pup)}>Favorite</button>
              <Link to={`/players/${pup.id}`}>
                <button>See Details</button>
              </Link>
              <button onClick={() => handleDelete(pup.id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default AllPlayers;

import { useState } from "react";

function CreatePlayer() {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [status, setStatus] = useState("bench");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if(!name || !breed){
        setMessage("Name and Breed are required")
        return;
    }

    const playerData = {
      name,
      breed,
      status,
      imageUrl,
    };

    try {
      const response = await fetch(
        "https://fsa-puppy-bowl.herokuapp.com/api/2501-FTB-ET-WEB-PT/players",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(playerData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        const newPlayer = result.data;

    
        const stored = JSON.parse(localStorage.getItem("myPlayerIds")) || [];
        stored.push(newPlayer.id);
        localStorage.setItem("myPlayerIds", JSON.stringify(stored));

        setMessage("Player created successfully!");
        setName("");
        setBreed("");
        setImageUrl("");
        setStatus("bench");
      } else {
        console.error("API error response:", result);
        setMessage(result.error?.message || "Something went wrong creating the player.");
      }
    } catch (err) {
      console.error("Network error:", err);
      setMessage("An error occurred. Please try again.");
    }
  }

  return (
    <div>
      <h2>Create a New Player</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Breed"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="bench">Bench</option>
          <option value="field">Field</option>
        </select>
        <button type="submit">Create Player</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default CreatePlayer;

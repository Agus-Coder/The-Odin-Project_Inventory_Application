import { useState } from "react";

const GenrePost = () => {
  const [name, setName] = useState("");
  const data = { name };

  function handlePost(e) {
    e.preventDefault();

    fetch("http://localhost:3000/inventory/genre/create", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    console.log(data);
  }

  return (
    <>
      <div>
        <form onSubmit={handlePost}>
          <input
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Create</button>
        </form>
      </div>
    </>
  );
};

export default GenrePost;

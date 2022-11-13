function GenresList({ el }) {


  function handleDelete() {
    e.preventDefault();

    fetch("http://localhost:3000/inventory/genre/create", {
      method: "DELETE",
      mode: "cors",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    console.log(data);
  }

  return (
    <div
      className="card col-2 bg-dark text-light border border-light"
      key={`${el._id}`}
    >
      {el.name}
      <button onClick={handleDelete}>Delete this Genre</button>
    </div>
  );
}

export default GenresList;

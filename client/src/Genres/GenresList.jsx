function GenresList({ el }) {

  const handleDelete = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "http://localhost:3000/inventory/genre/" + el._id + "/delete",
      {
        method: "DELETE",
        mode: "cors",
      }
    );
    // const json = await response.json() // here it is saved the document that we just deleted
    console.log(el._id)
  };

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

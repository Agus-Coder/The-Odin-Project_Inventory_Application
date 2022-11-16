const DeleteGenreButton = ({ el }) => {
  const handleDelete = async (e) => {
    // e.preventDefault();

    const response = await fetch(
      "http://localhost:3000/inventory/genre/" + el._id + "/delete",
      {
        method: "DELETE",
      }
    );
    // const json = await response.json() // here it is saved the document that we just deleted
    console.log(el._id);
  };

  return <button type="submit" class="btn btn-light btn-sm" onClick={handleDelete}>Delete</button>;
};

export default DeleteGenreButton;

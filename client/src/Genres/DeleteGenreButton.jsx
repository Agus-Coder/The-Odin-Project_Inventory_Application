const DeleteGenreButton = ({ el }) => {
  const handleDelete = () => {
    fetch("http://localhost:3000/inventory/genre/" + el._id + "/delete", {
      method: "DELETE",
    });
    // const json = await response.json() // here it is saved the document that we just deleted
    console.log(el._id);
  };

  return (
    <button type="submit" className="btn btn-light btn-sm" onClick={handleDelete}>
      Delete
    </button>
  );
};

export default DeleteGenreButton;

const DeleteButton = ({ el }) => {
  const handleDelete = (e) => {

    e.preventDefault()

    fetch("http://localhost:3000/"+ el.dataClass +"/" + el._id + "/delete", {
      method: "DELETE",
    });
    // const json = await response.json() // here it is saved the document that we just deleted
    console.log(el._id);
    console.log(el.dataClass);
    console.log("http://localhost:3000/"+ el.dataClass +"/" + el._id + "/delete");
  };

  return (
    <button type="submit" className="btn btn-light btn-sm" onClick={handleDelete}>
      Delete
    </button>
  );
};

export default DeleteButton;

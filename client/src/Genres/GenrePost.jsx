import { useState } from "react";

const GenrePost = () => {
  const [categoryState, setCategoryState] = useState('')
  const [name, setName] = useState("");
  const data = { name };

  function handlePost(e) {
    // e.preventDefault();

    fetch(`http://localhost:3000/inventory/${categoryState}/create`, {
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
      <div className="col-3 bg-info bg-opacity-50 row m-0 p-0">
        <div className="col-2"></div>
        <form onSubmit={() => {handlePost(); console.log(categoryState)} } className="col-8">
          <div className="form-group">
            <label htmlFor="name">Genre Name</label>
            <input
              type="text"
              value={name}
              placeholder="Name"
              className="form-control col-4"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">Category Select</label>
              <select className="form-control" value={categoryState} onChange={(e) => {setCategoryState(e.target.value); console.log(e.target.value, categoryState)}}>
                <option value='Artist'>Artist</option>
                <option value='Genre'>Genre</option>
                <option value='Instrument'>Instrument</option>
              </select>
            </div>
            <small id="emailHelp" className="form-text text-muted">
              Be sure to set the proper name
            </small>
          </div>
          <button type="submit" className="btn btn-light">
            Create
          </button>
        </form>
        <div className="col-2"></div>
      </div>
    </>
  );
};

export default GenrePost;

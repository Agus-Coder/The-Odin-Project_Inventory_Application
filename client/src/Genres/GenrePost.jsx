import { useContext } from "react";
import { useState } from "react";
import { genreObjeto, artistObjeto, instrumentObjeto } from "../Context/Context";
import FormTest from "./formTest";
import './GenrePost.css'

const GenrePost = () => {
  const [categoryState, setCategoryState] = useState("artist");
  const artist = useContext(artistObjeto);
  const genre = useContext(genreObjeto);
  const instrument = useContext(instrumentObjeto);

  console.log(categoryState);

  function handlePost(e) {
    e.preventDefault();

    let data;

    if (categoryState == "artist") {
      data = artist;
      console.log(data);
    } else if (categoryState == "genre") {
      data = genre;
      console.log(data);
    } else if (categoryState == "instrument") {
      data = instrument;
      console.log(data);
    }

    fetch(`http://localhost:3000/${categoryState}/create`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    console.log(data);

    location.reload();
  }

  return (
    <>
      <div className=" GenrePost">
        <form onSubmit={handlePost}> 
        {/* With "onSubmit={() => handlePost()}" wont work*/}
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Category Select</label>
            <select
              className="form-control"
              value={categoryState}
              onChange={(e) => {
                setCategoryState(e.target.value);
              }}
            >
              <option value="artist">Artist</option>
              <option value="genre">Genre</option>
              <option value="instrument">Instrument</option>
            </select>
          </div>

          <div className="form-group">
            <FormTest itemCategory={categoryState} />
          </div>
          <button type="submit" className="btn btn-light">
            Create
          </button>
        </form>
      </div>
    </>
  );
};

export default GenrePost;

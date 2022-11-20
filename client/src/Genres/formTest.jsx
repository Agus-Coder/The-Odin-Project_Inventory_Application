import { useState } from "react";
import { useContext } from "react";
import { artistObjeto, megaObjeto, genreObjeto } from "../Context/Context";

const FormTest = ({ itemCategory }) => {
  const objeto = useContext(megaObjeto);
  const artist = useContext(artistObjeto);
  const genre = useContext(genreObjeto);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [band, setBand] = useState("");
  
  
  if (itemCategory == "artist") {
    artist.dataClass = 'artist'
    artist.name = name;
    artist.age = age;
    artist.band = band;
    
    return (
      <>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          value={name}
          placeholder="Artist's Name"
          className="form-control col-4"
          id="name"
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="age">Age</label>
        <input
          type="text"
          value={age}
          placeholder="Artist's Age"
          className="form-control col-4"
          id="age"
          onChange={(e) => setAge(e.target.value)}
        />
        <label htmlFor="band">Band</label>
        <input
          type="text"
          value={band}
          placeholder="Artist's Band"
          className="form-control col-4"
          id="band"
          onChange={(e) => setBand(e.target.value)}
        />
      </>
    );
  } else if (itemCategory == "genre") {
    genre.dataClass = 'genre'
    genre.name = name;
    return (
      <>
        <label htmlFor="name">Genre Name</label>
        <input
          type="text"
          value={name}
          placeholder="Name"
          className="form-control col-4"
          id="name"
          onChange={(e) => {console.log(e.target.value); setName(e.target.value)}}
        />

        <small id="emailHelp" className="form-text text-muted">
          Be sure to set the proper name
        </small>
      </>
    );
  } else if (itemCategory == "Instrument") {
    return console.log("nop");
  }
  return (
    <>
      <label htmlFor="name">Genre Name</label>
      <input
        type="text"
        value={name}
        placeholder="Name"
        className="form-control col-4"
        id="name"
        onChange={(e) => setName(e.target.value)}
      />

      <small id="emailHelp" className="form-text text-muted">
        Be sure to set the proper name
      </small>
    </>
  );
};

export default FormTest;

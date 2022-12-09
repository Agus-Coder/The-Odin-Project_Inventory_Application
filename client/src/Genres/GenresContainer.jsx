import { useState, useEffect } from "react";
import ItemList from "./ItemList";
import './GenresContainer.css'

function GenresContainer() {
  const [genreInfo, setGenreInfo] = useState([]);
  const [artistInfo, setArtistInfo] = useState([]);
  const [instrumentInfo, setInstrumentInfo] = useState([]);
  
  
  useEffect(() => {
    fetch("http://localhost:3000/genre/list")
      .then((res) => res.json()) //este paso ya te convierte el json en un array de objs
      .then((res) => setGenreInfo(res));
  }, []);
  
  useEffect(() => {
    fetch("http://localhost:3000/artist/list")
      .then((res) => res.json()) //este paso ya te convierte el json en un array de objs
      .then((res) => setArtistInfo(res))
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/instrument/list")
      .then((res) => res.json()) //este paso ya te convierte el json en un array de objs
      .then((res) => setInstrumentInfo(res))
  }, []);

  return (
    <div className="bg-dark text-light GenresContainer">
      <div className="row justify-content-md-center">
        {genreInfo.map((el) => (
          <ItemList el={el} key={el._id}/>
        ))}
      </div>
      <div className="row justify-content-md-center">
        {artistInfo.map((el) => (
          <ItemList el={el} key={el._id}/>
        ))}
      </div>
      <div className="row justify-content-md-center">
        {instrumentInfo.map((el) => (
          <ItemList el={el} key={el._id}/>
        ))}
      </div>
    </div>
  );
}

export default GenresContainer;

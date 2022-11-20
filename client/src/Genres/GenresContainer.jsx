import { useState, useEffect } from "react";
import GenresList from "./GenresList";

function GenresContainer() {
  const [info, setInfo] = useState([]);
  const [artistInfo, setArtistInfo] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/inventory/genre/list")
      .then((res) => res.json()) //este paso ya te convierte el json en un array de objs
      .then((res) => setInfo(res))
      .then(console.log(info));
  }, []);
  
  useEffect(() => {
    fetch("http://localhost:3000/inventory/artist/list")
      .then((res) => res.json()) //este paso ya te convierte el json en un array de objs
      .then((res) => setArtistInfo(res))
      .then(console.log(artistInfo));
  }, []);

  return (
    <div className="col-8 bg-dark text-light">
      <div className="row justify-content-md-center">
        {info.map((el) => (
          <GenresList el={el} />
        ))}
      </div>
      <div className="row justify-content-md-center">
        {artistInfo.map((el) => (
          <GenresList el={el} />
        ))}
      </div>
    </div>
  );
}

export default GenresContainer;

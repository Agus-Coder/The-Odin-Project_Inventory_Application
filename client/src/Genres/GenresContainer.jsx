import { useState, useEffect } from "react";
import GenresList from "./GenresList";

function GenresContainer() {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/inventory/genre/list")
      .then((res) => res.json()) //este paso ya te convierte el json en un array de objs
      .then((res) => setInfo(res));
  }, []);

  return (
    <div className="container-fluid bg-dark text-light">
      <div className="row">
        {info.map((el) => (
          <GenresList el={el} />
        ))}
      </div>
    </div>
  );
}

export default GenresContainer;

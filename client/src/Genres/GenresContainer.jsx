import { useState, useEffect } from "react";
import GenresList from "./GenresList";

/* En el map para mostrar cosas tenes que hacer
      
      {info.map((el) => 
        <h1>{el.name}</h1>;
      )}
        esta mal usar

        {info.map((el) => { // esta llave que esta aca genera error, entiendo, porque el codigo interpreta la generacion de un JS en lugar de html
        <h1>{el.name}</h1>;
      })}
*/

function GenresContainer() {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/inventory/genre/list")
      .then((res) => res.json()) //este paso ya te convierte el json en un array de objs
      .then((res) => setInfo(res));
  }, []);

  return (
    <div className="container-fluid bg-dark text-light">
      {info.map((el) => <GenresList el={el}/>)}
    </div>
  );
}

export default GenresContainer;

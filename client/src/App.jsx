import { useState } from "react";
import { useEffect } from "react";
import "./App.css";

function App() {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/inventory/genre/list")
      .then((res) => res.json()) //este paso ya te convierte el json en un array de objs
      .then((res) => setInfo(res));
  }, []);

  return (
    <div>
      {info.map((el) => (
        <h1 key={el.id}>{el.name}</h1>
      ))}
      {/* En el map para mostrar cosas tenes que hacer
      
      {info.map((el) => 
        <h1>{el.name}</h1>;
      )}
        esta mal usar

        {info.map((el) => { // esta llave que esta aca genera error, entiendo, porque el codigo interpreta la generacion de un JS en lugar de html
        <h1>{el.name}</h1>;
      })}
      */}
    </div>
  );
}

export default App;

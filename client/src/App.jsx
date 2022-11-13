import "./App.css";
import GenresContainer from "./Genres/GenresContainer";
import NavBar from "./NavBar/NavBar";
import { BrowserRouter } from "react-router-dom";
import GenrePost from "./Genres/GenrePost";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <GenresContainer />
      <GenrePost/>
    </BrowserRouter>
  );
}

export default App;

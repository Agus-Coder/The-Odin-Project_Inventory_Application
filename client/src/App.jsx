import "./App.css";
import NavBar from "./NavBar/NavBar";
import { BrowserRouter } from "react-router-dom";
import InventoryContainer from "./InventoryContainer/InventoryContainer";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <InventoryContainer />
    </BrowserRouter>
  );
}

export default App;

import "./App.css";
import NavBar from "./NavBar/NavBar";
import { BrowserRouter } from "react-router-dom";
import InventoryContainer from "./InventoryContainer/InventoryContainer";
import Footer from "./Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <InventoryContainer />
      <Footer/>
    </BrowserRouter>
  );
}

export default App;

import "./App.css";
import NavBar from "./NavBar/NavBar";
import { BrowserRouter } from "react-router-dom";
import InventoryContainer from "./InventoryContainer/InventoryContainer";
import Footer from "./Footer/Footer";
import SignUpForm from "./Users/UserForm";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <InventoryContainer />
      <Footer/>
      <SignUpForm/>
    </BrowserRouter>
  );
}

export default App;

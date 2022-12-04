import "./App.css";
import NavBar from "./NavBar/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InventoryContainer from "./InventoryContainer/InventoryContainer";
import Footer from "./Footer/Footer";
import SignUpForm from "./Users/UserForm";
import Login from "./Login/Login";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/inventory/log-in" element={<Login />} />
        <Route path="/inventory/" element={<InventoryContainer />} />
        <Route path="/inventory/createAccount" element={<SignUpForm />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

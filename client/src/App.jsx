import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import InventoryContainer from "./InventoryContainer/InventoryContainer";
import Home from "./Pages/Home";
import UserForm from "./Users/UserForm";
import LogIn from "./Pages/LogIn";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/sign-up" element={<UserForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

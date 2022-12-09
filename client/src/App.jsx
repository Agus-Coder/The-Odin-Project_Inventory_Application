import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InventoryContainer from "./InventoryContainer/InventoryContainer";

import UserForm from "./Users/UserForm";
import LogIn from "./Pages/LogIn";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/inventory/" element={<InventoryContainer />} />
        <Route path="/createAccount" element={<UserForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  let data = {};
  data.username = username;
  data.password = password;

  async function createUser(evt) {
    evt.preventDefault();

    const result = await fetch(`http://localhost:3000/sign-up`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (result.ok) {
      navigate("/login");
    } else {
      console.log("Wrong info!");
    }
  }

  return (
    <div className="LogInBody">
      <div className="formContainer">
        <form>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            value={username}
            placeholder="Username"
            className="form-control col-4"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="text"
            value={password}
            placeholder="password"
            className="form-control col-4"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn btn-light" onClick={createUser}>
            Create Account
          </button>
        </form>
      </div>
      <div className="sideDecoration"></div>
    </div>
  );
};

export default UserForm;

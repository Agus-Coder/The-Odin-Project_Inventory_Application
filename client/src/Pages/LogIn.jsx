import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./LogIn.css";

const LogIn = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  let data = {}

  data.username = username
  data.password = password

  const LogInTry = (e) => {

    e.preventDefault()

    fetch(`http://localhost:3000/login`, {
      method: "POST",
      // credentials: "include",
      mode: "cors",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    console.log("works!");
  };

  return (
    <div className="LogInBody">
      <div className="formContainer">
        <form>
          {/* <!-- Email input --> */}
          <div className="form-outline mb-4">
            <input
              placeholder="@instruments.com"
              type="username"
              id="form2Example1"
              className="form-control inputStyles"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <label className="form-label" htmlFor="form2Example1">
              Email address
            </label>
          </div>

          {/* <!-- Password input --> */}
          <div className="form-outline mb-4">
            <input
              type="password"
              id="form2Example2"
              className="form-control inputStyles"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <label className="form-label" htmlFor="form2Example2">
              Password
            </label>
          </div>

          {/* <!-- 2 column grid layout htmlFor inline styling --> */}
          <div className="row mb-4">
            <div className="col d-flex justify-content-center">
              {/* <!-- Checkbox --> */}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="form2Example31"
                  unchecked
                />
                <label className="form-check-label" htmlFor="form2Example31">
                  Remember me{" "}
                </label>
              </div>
            </div>

            <div className="col">
              {/* <!-- Simple link --> */}
              <a href="#!">Forgot password?</a>
            </div>
          </div>

          {/* <!-- Submit button --> */}
          <button className="buttonStyles" onClick={LogInTry}>
            <strong>Sign in</strong>
          </button>

          {/* <!-- Register buttons --> */}
          <div className="text-center">
            <p>
              Not a member? <Link to="/sign-up">Register</Link> 
            
            </p>
          </div>
        </form>
      </div>
      <div className="sideDecoration"></div>
    </div>
  );
};

export default LogIn;

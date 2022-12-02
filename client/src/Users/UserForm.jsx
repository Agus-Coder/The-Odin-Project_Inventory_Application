import { useState } from "react";

const UserForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

    let data ={}
    data.username = username;
    data.password = password;

const createUser = ()=>{
    fetch(`http://localhost:3000/inventory/sign-up`, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
}

  return (
    <>
      <form action="" method="post">
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
        <button type="submit" className="btn btn-light" onClick={createUser}>Create Account</button>
      </form>
    </>
  );
};

export default UserForm;

const Login = () => {

    const LogInTry = ()=>{
        fetch(`http://localhost:3000/inventory/log-in`, {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(data),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          });
    }


    return(
        <>
        <h1>Please Login</h1>
        <form action="/log-in" method="post">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" placeholder="Username"/>
            <label htmlFor="password">Password</label>
            <input type="text" name="password" />
            <button>Log In</button>
        </form>
        </>
    )
}


export default Login
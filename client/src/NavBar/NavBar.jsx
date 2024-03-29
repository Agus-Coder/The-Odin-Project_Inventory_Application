import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { onlineUser } from "../Context/Context";

function logOut(){
  localStorage.clear();
  location.reload();
}

function NavBar() {

const user = useContext(onlineUser)
console.log(user.username);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link to={"/"}>
          <Navbar.Brand>Storm Devs</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>Instruments</Nav.Link>
            <Nav.Link>Artists</Nav.Link>
            <Nav.Link>Genres</Nav.Link>
            <Nav.Link><button onClick={()=>{logOut()}}>Log Out</button></Nav.Link>
            <p>{user.username}</p>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

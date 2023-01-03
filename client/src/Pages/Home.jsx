import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import InventoryContainer from "../InventoryContainer/InventoryContainer";
import LogIn from "./LogIn";

const Home = () => {
  function hasJWT() {
    let flag = false;

    //check user has JWT token
    localStorage.getItem("userToken") ? (flag = true) : (flag = false);

    return flag;
  }

  if (hasJWT()) {
    return (
      <>
        <NavBar />
        <InventoryContainer />
        <Footer />
      </>
    );
  } else {
    return <LogIn />;
  }
};

export default Home;

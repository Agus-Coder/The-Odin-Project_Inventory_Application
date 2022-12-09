import GenresContainer from "../Genres/GenresContainer";
import GenresPost from "../Genres/GenrePost";
import "./InventoryContainer.css";

const InventoryContainer = () => {
  return (
    <div className="InventoryContainer">
      <GenresContainer />
      <GenresPost />
    </div>
  );
};

export default InventoryContainer;

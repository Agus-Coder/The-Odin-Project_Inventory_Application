import GenresContainer from "../Genres/GenresContainer";
import GenresPost from "../Genres/GenrePost";

const InventoryContainer = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <GenresContainer />
        <GenresPost />
        <div className="col-1 bg-info bg-opacity-50"></div>
      </div>
    </div>
  );
};

export default InventoryContainer;

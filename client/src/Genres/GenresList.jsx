import DeleteGenreButton from "./DeleteGenreButton";

function GenresList({ el }) {
  return (
    <div
      className="card col-2 bg-dark text-light border border-light"
      key={`${el._id}`}
    >
      <div className="card-body">
        <h5 className="card-title">{el.name}</h5>
        <p className="card-text">Info about {el.name}</p>
        <DeleteGenreButton el={el} />
      </div>
    </div>
  );
}

export default GenresList;

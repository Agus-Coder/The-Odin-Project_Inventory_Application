import DeleteButton from "./DeleteButton";

function ItemList({ el }) {
  if (el.dataClass == "artist" || el.dataClass == "genre") {
    return (
      <div className="card col-3 bg-dark text-light border border-light">
        <div className="card-body">
          <h5 className="card-title">{el.name}</h5>
          <p className="card-text">Info about {el.name}</p>
          <DeleteButton el={el} />
        </div>
      </div>
    );
  } else if (el.dataClass == "instrument") {
    return (
      <div className="card col-3 bg-dark text-light border border-light">
        <div className="card-body">
          <h5 className="card-title">{el.model}</h5>
          <p className="card-text">More {el.category} info</p>
          <p className="card-text">More {el.brand} info</p>
          <DeleteButton el={el} />
        </div>
      </div>
    );
  }
}

export default ItemList;

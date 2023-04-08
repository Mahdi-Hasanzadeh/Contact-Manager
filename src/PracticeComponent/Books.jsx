import { useState } from "react";
import { Link } from "react-router-dom";

const Books = (props) => {
  const [state, setState] = useState({
    name: "",
    price: 0,
  });

  const handleFormData = (event) => {
    console.log(event.target);
    const { value, name } = event.target;
    setState((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (state.name && state.price) {
      props.addBook(state.name, state.price);
      setState((prevData) => {
        return {
          name: "",
          price: "",
        };
      });
    }
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <label htmlFor="Name" className="col-2 form-col-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                className="form-control"
                value={state.name}
                onChange={handleFormData}
              />
            </div>
            <div className="col-6">
              <label htmlFor="price" className="col-2 form-col-label">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="Price"
                className="form-control"
                value={state.price}
                onChange={handleFormData}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              <button className="btn btn-info">Add Book</button>
            </div>
          </div>
        </div>
      </form>
      {props.books.map((book) => {
        return (
          <div key={book.id} className="d-flex gap-2">
            <h3>{book.name}</h3>
            <button
              onClick={() => {
                props.onDelete(book.id);
              }}
              className="btn btn-danger btn-sm"
            >
              <span className="fa fa-trash"></span>
            </button>
            <Link to={`/books/${book.id}`}>
              <button className="btn btn-warning">
                <span className="fa fa-eye"></span>
              </button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
export default Books;

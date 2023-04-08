import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";

import { ContactContext } from "./contactContext.js";

const Contact = (props) => {
  const location = useLocation();
  const { confirmDelete } = useContext(ContactContext);
  return (
    <div className="col-12 col-md-5">
      <div className="card">
        <div className="card-body">
          <div className="row d-flex justify-content-around align-items-center">
            {
              <>
                <div className="col-3">
                  <img
                    src={require("../assets/MahdiHasanzadeh.jpg")}
                    alt=""
                    className="img-fluid rounded"
                  />
                </div>
                <div className="col-8">
                  <ul className="list-group">
                    <li className="list-group-item text-center ">
                      <span className="fw-bold">
                        Fullname <br /> {props.contact.fullName}
                      </span>
                    </li>
                    <li className="list-group-item text-center">
                      <span className="fw-bold">
                        Telephone
                        <br />
                        {props.contact.telephone}
                      </span>
                    </li>
                    <li className="list-group-item text-center">
                      Email
                      <br />
                      {props.contact.email}
                    </li>
                  </ul>
                </div>
                {location.pathname === "/Contact" ? (
                  <div className="col-1 d-flex flex-column align-items-center gap-2 ">
                    <Link to={`/Contact/${props.contact.id}${location.search}`}>
                      <button className="btn btn-warning">
                        <span className="fa fa-eye"></span>
                      </button>
                    </Link>
                    <Link
                      to={`/addContact/${props.contact.id}${location.search}`}
                    >
                      <button className="btn btn-success">
                        <span className="fa fa-edit"></span>
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        confirmDelete(props.contact.fullName, props.contact.id);
                      }}
                      className="btn btn-danger"
                    >
                      <span className="fa fa-trash"></span>
                    </button>
                  </div>
                ) : location.pathname === "/Contact/" ? (
                  <div className="col-1 d-flex flex-column align-items-center gap-2 ">
                    <Link to={`/Contact/${props.contact.id}${location.search}`}>
                      <button className="btn btn-warning">
                        <span className="fa fa-eye"></span>
                      </button>
                    </Link>
                    <Link
                      to={`/addContact/${props.contact.id}${location.search}`}
                    >
                      <button className="btn btn-success">
                        <span className="fa fa-edit"></span>
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        confirmDelete(props.contact.fullName, props.contact.id);
                      }}
                      className="btn btn-danger"
                    >
                      <span className="fa fa-trash"></span>
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </>
            }
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;

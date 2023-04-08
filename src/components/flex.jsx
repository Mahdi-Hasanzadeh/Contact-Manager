import React from "react";

import { FormFeedback, Form, Input } from "reactstrap";
import { useImmer } from "use-immer";
import * as Yup from "yup";
const contactSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("Please Enter your Name")
    .length(10, "at least 10 characters"),
});

const Flexbox = () => {
  const [errors, setErrors] = React.useState();
  const [person, setPerson] = useImmer({
    firstName: "",
    lastName: "",
    email: "",
    agree: "",
    telephoneNumber: "",
    contact: "",
    touched: {
      firstName: false,
      lastName: false,
      email: false,
      telephoneNumber: false,
      agree: false,
    },
  });

  const validate = (firstName, lastName, email, telNumber) => {
    const errors = {
      firstName: "",
      lastName: "",
      email: "",
      telNumber: "",
    };
    if (person.touched.firstName && firstName.length < 3) {
      errors.firstName = "Firs Name Should be at least 3 characters ";
    } else if (person.touched.firstName && firstName.length > 15) {
      errors.firstName = "First Name Should be not more than 15 characters ";
    }
    // if (person.touched.lastName && lastName.length < 5) {
    //   errors.lastName = "Last Name Should be at least 5 characters ";
    // } else if (person.touched.firstName && firstName.length > 15) {
    //   errors.firstName = "Last Name Should be not more than 15 characters ";
    // }

    // const reg = /^\d+$/;
    // if (this.state.touched.telNumber && !reg.test(telNumber)) {
    //   errors.telNumber = "Telephone number Should Contain only numbers ";
    // }

    // if (
    //   this.state.touched.email &&
    //   email.split("").filter((x) => x === "@").length !== 1
    // ) {
    //   errors.email = "invalid Email ";
    // }
    return errors;
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setPerson((draft) => {
      draft[name] = type === checked ? checked : value;
    });

    // setPerson((prevData) => {

    //   return {
    //     ...prevData,
    //     [name]: type === checked ? checked : value,
    //   };
    // });
  };

  const show = () => {
    console.log(person);
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setPerson((draft) => {
      draft.touched[name] = true;
    });

    // setPerson((prevData) => {
    //   return {
    //     ...prevData,
    //     touched: {
    //       ...person.touched,
    //       [name]: true,
    //     },
    //   };
    // });
  };

  console.table(person);

  return (
    <React.Fragment>
      <nav className="navbar navbar-dark navbar-expand-md rounded-3 bg-primary">
        <div className="container ">
          {/* <a className="navbar-brand">Restaurant</a> */}
          <button
            className="navbar-toggler"
            data-bs-target="#myNav"
            data-bs-toggle="collapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className="collapse navbar-collapse" id="myNav">
          <ul className="navbar-nav">
            <li className="navbar-item">
              <a className="nav-link">Home</a>
            </li>
            <li className="navbar-item">
              <a className="nav-link">Contact</a>
            </li>
            <li className="navbar-item">
              <a className="nav-link">About</a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container-fluid">
        <div className="row p-2">
          <div className="col-12 col-md-6">
            <Form>
              <div className="p-2 row">
                <label
                  htmlFor="firstName"
                  className="col-12 col-md-2 col-form-label"
                >
                  First Name
                </label>
                <div className="col-md-10">
                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    className="form-control"
                    onChange={handleChange}
                    value={person.firstName}
                    onBlur={handleBlur}
                  />
                  <FormFeedback>Name should be 10 characters</FormFeedback>
                </div>
              </div>
              <div className="p-2 row">
                <label
                  htmlFor="lastName"
                  className="col-12 col-md-2 col-form-label"
                >
                  Last Name
                </label>
                <div className="col-12 col-md-10">
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    className="form-control"
                    onChange={handleChange}
                    value={person.lastName}
                    onBlur={handleBlur}
                  />
                </div>
              </div>
              <div className="p-2 row">
                <label
                  htmlFor="email"
                  className="col-12 col-md-2 col-form-label"
                >
                  Email
                </label>
                <div className="col-12 col-md-10">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={person.email}
                  />
                </div>
              </div>
              <div className="p-2 row">
                <label
                  htmlFor="telephoneNumber"
                  className="col-12 col-md-2 col-form-label"
                >
                  Telephone
                </label>
                <div className="col-md-10">
                  <input
                    type="tel"
                    name="telephoneNumber"
                    id="telephoneNumber"
                    className="form-control"
                    placeholder="Telephone Number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={person.telephoneNumber}
                  />
                </div>
              </div>
              <div className="p-2 row">
                <div className="col-md-6 offset-md-2">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      id="agree"
                      name="agree"
                      checked={person.checked}
                      className="form-check-input"
                      onChange={handleChange}
                    />
                    <label htmlFor="agree">
                      <strong> May we contact you?</strong>
                    </label>
                  </div>
                </div>
                <div className="col-md-3 offset-md-1 p-1 p-md-0">
                  <select
                    value={person.contact}
                    onChange={handleChange}
                    name="contact"
                    id="contact"
                    className="form-control"
                  >
                    <option value="Select">Contact Way</option>
                    <option value="Tel.">Tel.</option>
                    <option value="Email">Email</option>
                  </select>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <button onClick={show} className="btn btn-primary">
        Show
      </button>
    </React.Fragment>
  );
};

export default Flexbox;

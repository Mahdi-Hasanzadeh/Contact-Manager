import { Link, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FormFeedback, Input } from "reactstrap";
import { ContactContext } from "./contactContext";
import { useContext } from "react";
import { toast } from "react-toastify";

import Spinner from "./Spinner";

const AddContact = () => {
  const [updating, setUpdating] = useState(false);
  const [contact, setContact] = useState();
  const { addContact, groups, loading, setLoading, updateContact } =
    useContext(ContactContext);

  const location = useLocation();
  const { contactId } = useParams();

  const [formData, setFormData] = useState({
    fullName: "",
    photo: "",
    telephone: "",
    email: "",
    group: "",
    touched: {
      fullName: false,
      photo: false,
      telephone: false,
      email: false,
      group: false,
    },
  });

  const handleBlur = (event) => {
    const { name } = event.target;

    setFormData((prevData) => {
      return {
        ...prevData,
        touched: {
          ...prevData.touched,
          [name]: true,
        },
      };
    });
  };

  const validation = (fullName, photo, telephone, email) => {
    const errors = {
      fullName: "",
      photo: "",
      telephone: "",
      email: "",
    };

    if (formData.touched.fullName && fullName.length < 3) {
      errors.fullName = "FullName Should be at least 3 characters ";
    } else if (formData.touched.fullName && fullName.length > 15) {
      errors.fullName = "Full Name should be at max 15 characters ";
    }

    const reg = /^\d+$/;
    if (formData.touched.telephone && !reg.test(telephone)) {
      errors.telephone = "Telephone number Should Contain only numbers ";
    } else if (formData.touched.telephone && telephone.length < 10) {
      errors.telephone = "too short";
    } else if (formData.touched.telephone && telephone.length > 12) {
      errors.telephone = "too long";
    }

    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (formData.touched.email && !mailformat.test(email)) {
      errors.email = "Invalid Email. valid Email: name@gmail.com ";
    }

    const urlPattern =
      /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (formData.touched.photo && !urlPattern.test(photo)) {
      errors.photo = "Invalid URL. URL starts with (http://) ";
    }
    return errors;
  };

  const handleChange = (event) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
  };

  const errors = validation(
    formData.fullName,
    formData.photo,
    formData.telephone,
    formData.email
  );

  const createContact = (event) => {
    event.preventDefault();
    setFormData((prevData) => {
      return {
        ...prevData,
        touched: {
          fullName: true,
          telephone: true,
          photo: true,
          email: true,
          group: true,
        },
      };
    });
    if (
      errors.fullName === "" &&
      errors.photo === "" &&
      errors.telephone === "" &&
      errors.email === "" &&
      formData.fullName !== "" &&
      formData.email !== "" &&
      formData.photo !== "" &&
      formData.telephone !== ""
    ) {
      if (updating) {
        if (
          contact.fullName === formData.fullName &&
          contact.photo === formData.photo &&
          contact.telephone === formData.telephone &&
          contact.email === formData.email &&
          contact.group === formData.group
        ) {
          toast.error("Contact already exists");
          return;
        }
        updateContact(formData, contactId);
      } else {
        addContact(formData);
      }
      setFormData((prevData) => {
        return {
          fullName: "",
          photo: "",
          telephone: "",
          email: "",
          group: "",
          touched: {
            fullName: false,
            photo: false,
            telephone: false,
            email: false,
            group: false,
          },
        };
      });
    } else {
      if (toast.isActive() === false) toast.error("Fill out the Form");
    }
  };

  const getContactById = async (id) => {
    setLoading((prevData) => true);
    try {
      const response = await fetch(`http://localhost:9000/contacts/${id}`);
      if (response.status === 200) {
        const data = await response.json();
        setContact(data);
        setFormData((prevData) => {
          return {
            ...data,
            touched: {
              fullName: false,
              photo: false,
              telephone: false,
              email: false,
              group: false,
            },
          };
        });
        setLoading((prevData) => false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading((prevData) => false);
    }
  };

  useEffect(() => {
    setLoading((prevData) => true);
    if (contactId !== ":contactId") {
      setUpdating((prevData) => true);
      setTimeout(() => {
        getContactById(contactId);
      }, 2500);
    } else {
      setLoading((prevData) => false);
    }
  }, []);

  return (
    <div className="container">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="row">
            <div className="col-12 col-md-8">
              <form>
                <div className="row mt-2">
                  <label htmlFor="fullname" className="col-2 col-form-label">
                    FullName
                  </label>
                  <div className="col-10">
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Full Name"
                      name="fullName"
                      id="fullname"
                      onChange={handleChange}
                      value={formData.fullName}
                      valid={errors.fullName === ""}
                      invalid={errors.fullName !== ""}
                      onBlur={handleBlur}
                      required
                    />
                    <FormFeedback>{errors.fullName}</FormFeedback>
                  </div>
                </div>
                <div className="row mt-2">
                  <label
                    htmlFor="photoAddress"
                    className="col-2 col-form-label"
                  >
                    Photo
                  </label>
                  <div className="col-10">
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Photo Address"
                      name="photo"
                      id="photoAddress"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={formData.photo}
                      valid={errors.photo === ""}
                      invalid={errors.photo !== ""}
                    />
                    <FormFeedback> {errors.photo} </FormFeedback>
                  </div>
                </div>
                <div className="row mt-2">
                  <label htmlFor="telephone" className="col-2 col-form-label">
                    Telephone
                  </label>
                  <div className="col-10">
                    <Input
                      type="text"
                      placeholder="Telephone Number"
                      name="telephone"
                      id="telephone"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      valid={errors.telephone === ""}
                      invalid={errors.telephone !== ""}
                      value={formData.telephone}
                    />
                    <FormFeedback>{errors.telephone}</FormFeedback>
                  </div>
                </div>
                <div className="row mt-2">
                  <label htmlFor="email" className="col-2 col-form-label">
                    Email
                  </label>
                  <div className="col">
                    <Input
                      type="text"
                      placeholder="Email Address"
                      id="email"
                      name="email"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      valid={errors.email === ""}
                      invalid={errors.email !== ""}
                      value={formData.email}
                    />
                    <FormFeedback>{errors.email}</FormFeedback>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-10 offset-2">
                    <select
                      name="group"
                      id="group"
                      value={formData.groups}
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value="choose">
                        {formData.group || "Choose a group"}
                      </option>
                      {groups.map((group) => {
                        if (group.name !== formData.group) {
                          return (
                            <option key={group.id} value={group.name}>
                              {group.name}
                            </option>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </select>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-4 offset-3">
                    <button onClick={createContact} className="btn btn-success">
                      {updating ? "Update" : "Save Contact"}
                    </button>
                  </div>
                  <div className="col-5">
                    <Link
                      to={`/Contact/${location.search}`}
                      className="btn btn-danger"
                    >
                      Back to Contacts
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-12 col-md-4"></div>
        </>
      )}
    </div>
  );
};

export default AddContact;

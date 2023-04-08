import { useEffect, useState } from "react";

import { useParams, Link, useLocation } from "react-router-dom";

import Spinner from "./Spinner.jsx";
import NotFound from "./NoContactFound.jsx";
import Contact from "./Contact.jsx";
const SpecificContact = () => {
  const [contact, setContact] = useState();
  const [contactNotFound, setContactNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const { contactId } = useParams();

  const location = useLocation();

  const getContactById = async (contactId) => {
    try {
      const response = await fetch(
        `http://localhost:9000/contacts/${contactId}`
      );

      if (response.status === 200) {
        const data = await response.json();
        setContact(data);
        setLoading(false);
      } else {
        setLoading(false);
        setContactNotFound(true);
        const error = {
          message: "not found",
        };
        throw error;
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getContactById(contactId);
  }, [contactId]);

  return (
    <>
      <Link to={`/Contact/${location.search}`} className="btn btn-danger m-2 ">
        Back
      </Link>
      {loading ? (
        <Spinner />
      ) : (
        <div className="d-flex justify-content-center">
          {contactNotFound ? <NotFound /> : <Contact contact={contact} />}
        </div>
      )}
    </>
  );
};
export default SpecificContact;

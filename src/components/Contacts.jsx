import { useSearchParams, Link } from "react-router-dom";
import { useContext } from "react";
import { ContactContext } from "./contactContext.js";
import Contact from "./Contact.jsx";
import Spinner from "./Spinner";
import NotFound from "./NoContactFound";
const Contacts = () => {
  const { loading, filterContacts } = useContext(ContactContext);

  return (
    <>
      <div className="container-fluid">
        <div>
          <Link to="/addContact/:contactId" className="btn btn-success m-2 ">
            Add Contact
          </Link>
        </div>
        <div className="row d-flex justify-content-around flex-wrap gap-1">
          {loading ? (
            <Spinner />
          ) : filterContacts.length > 0 ? (
            filterContacts.map((c) => {
              return <Contact key={c.id} contact={c} />;
            })
          ) : (
            <NotFound />
          )}
        </div>
      </div>
    </>
  );
};
export default Contacts;

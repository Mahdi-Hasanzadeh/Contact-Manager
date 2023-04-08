import { useContext } from "react";
import { ContactContext } from "./contactContext";
const NotFound = () => {
  const { failedToFetch } = useContext(ContactContext);

  return (
    <div className="col-12 text-center bg-warning rounded-4 w-75">
      <h3 className="py-2">
        {failedToFetch
          ? "Failed to fetch,Check Your internet Connection"
          : "No Contact Found"}
      </h3>
      <img
        src={require("../assets/notFound.gif")}
        alt="not found"
        className="img-fluid"
      />
    </div>
  );
};

export default NotFound;

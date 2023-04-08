//import { Navbar } from "reactstrap";
import { ContactContext } from "./contactContext";
import { useContext } from "react";
import {
  NavLink,
  Link,
  Outlet,
  useSearchParams,
  useLocation,
} from "react-router-dom";

const Navbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const { filteredContacts } = useContext(ContactContext);
  const handleFilter = (event) => {
    let string = event.target.value;
    if (string) {
      setSearchParams((prevData) => {
        return {
          filter: string,
        };
      });
    } else {
      setSearchParams({});
    }

    filteredContacts(string);
  };

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light navbar-light p-2 rounded-2">
        <Link to="/" className="navbar-brand word-wrap">
          Contacts Managing
        </Link>
        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse flex-wrap" id="nav">
          <ul className="navbar-nav p-2">
            <li className="nav-item ">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link linkActive" : "nav-link"
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/Menu"
                className={({ isActive }) =>
                  isActive ? "nav-link linkActive" : "nav-link"
                }
              >
                Menu
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/About"
                className={({ isActive }) =>
                  isActive ? "nav-link linkActive" : "nav-link"
                }
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/Contact"
                className={({ isActive }) =>
                  isActive ? "nav-link linkActive" : "nav-link"
                }
              >
                Contact
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/game"
                className={({ isActive }) =>
                  isActive ? "nav-link linkActive" : "nav-link"
                }
              >
                Game
              </NavLink>
            </li>
          </ul>
          {location.pathname === "/Contact" ? (
            <div className="d-flex justify-content-center">
              <input
                type="search"
                placeholder="Search"
                className="form-control"
                value={searchParams.get("filter") || ""}
                onChange={handleFilter}
              />
              <button className="btn btn-primary rounded-3  mx-1 mt-2 mt-sm-0">
                Search
              </button>
            </div>
          ) : location.pathname === "/Contact/" ? (
            <div className="d-flex justify-content-center">
              <input
                type="search"
                placeholder="Search"
                className="form-control"
                value={searchParams.get("filter") || ""}
                onChange={handleFilter}
              />
              <button className="btn btn-primary rounded-3  mx-1 mt-2 mt-sm-0">
                Search
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};
export default Navbar;

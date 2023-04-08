import { NavLink, Outlet, useSearchParams } from "react-router-dom";

const Navbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilter = (event) => {
    let filter = event.target.value;
    if (filter) {
      setSearchParams((prevData) => {
        return {
          filter: filter,
        };
      });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="container">
      <nav className="navbar navbar-expand-md">
        <div className="navbar-brand">Library</div>
        <button
          className="navbar-toggler"
          data-bs-target="#myNav"
          data-bs-toggle="collapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="myNav">
          <ul className="navbar-nav">
            <li className="nav-item">
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
                to="/books"
                className={({ isActive }) =>
                  isActive ? "nav-link linkActive" : "nav-link"
                }
              >
                Books
              </NavLink>
            </li>
          </ul>
          <input
            type="text"
            placeholder="search"
            className="form-control w-50 "
            value={searchParams.get("filter") || ""}
            onChange={handleFilter}
          />
        </div>
      </nav>
      <Outlet />
    </div>
  );
};
export default Navbar;

import i from "../assets/MahdiHasanzadeh.jpg";

const Content = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className=" d-flex justify-content-around flex-wrap  gap-2">
            <div className="card col-12 col-md-5">
              <div className="card-body">
                <div className="row d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                  <div className="col-6 d-flex justify-content-center align-items-center">
                    <img
                      src={i}
                      height="250px"
                      width="250px"
                      alt=""
                      className="img-fluid rounded align-self-center"
                    />
                  </div>

                  <div className="col">
                    <ul className="list-group  ">
                      <li className="list-group-item ">
                        FullName: Mahdi Hasanzadeh
                      </li>
                      <li className="list-group-item">
                        Telephone: 09029342619
                      </li>
                      <li className="list-group-item">
                        Email:mahdi786trygame@gmail.com
                      </li>
                    </ul>
                  </div>
                  <div className="col d-flex justify-content-around gap-1">
                    <button className="btn btn-info ">
                      <span className="fa fa-eye"></span>
                    </button>
                    <button className="btn btn-info">
                      <span className="fa fa-edit"></span>
                    </button>
                    <button className="btn btn-danger">
                      <span className="fa fa-trash"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="card col-12 col-md-5 ">
              <div className="card-body">
                <div className="row d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                  <div className="col-6 d-flex justify-content-center align-items-center">
                    <img
                      src={i}
                      height="250px"
                      width="250px"
                      alt=""
                      className="img-fluid rounded align-self-center"
                    />
                  </div>

                  <div className="col">
                    <ul className="list-group  ">
                      <li className="list-group-item ">
                        FullName: Mahdi Hasanzadeh
                      </li>
                      <li className="list-group-item">
                        Telephone: 09029342619
                      </li>
                      <li className="list-group-item">
                        Email:mahdi786trygame@gmail.com
                      </li>
                    </ul>
                  </div>
                  <div className="col d-flex justify-content-around gap-1">
                    <button className="btn btn-info ">
                      <span className="fa fa-eye"></span>
                    </button>
                    <button className="btn btn-info">
                      <span className="fa fa-edit"></span>
                    </button>
                    <button className="btn btn-danger">
                      <span className="fa fa-trash"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="card ">
              <div className="card-body">
                <div className="row d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                  <div className="col-6 d-flex justify-content-center align-items-center">
                    <img
                      src={i}
                      height="250px"
                      width="250px"
                      alt=""
                      className="img-fluid rounded align-self-center"
                    />
                  </div>

                  <div className="col">
                    <ul className="list-group  ">
                      <li className="list-group-item ">
                        FullName: Mahdi Hasanzadeh
                      </li>
                      <li className="list-group-item">
                        Telephone: 09029342619
                      </li>
                      <li className="list-group-item">
                        Email:mahdi786trygame@gmail.com
                      </li>
                    </ul>
                  </div>
                  <div className="col d-flex justify-content-around gap-1">
                    <button className="btn btn-info ">
                      <span className="fa fa-eye"></span>
                    </button>
                    <button className="btn btn-info">
                      <span className="fa fa-edit"></span>
                    </button>
                    <button className="btn btn-danger">
                      <span className="fa fa-trash"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;

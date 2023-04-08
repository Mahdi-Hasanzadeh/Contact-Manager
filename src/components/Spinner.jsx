const Spinner = () => {
  return (
    <div className="container">
      <div className="text-center">
        <h3>loading...</h3>
        <img
          src={require("../assets/Cube-1s-200px.gif")}
          alt=""
          className="img-fluid"
        />
      </div>
    </div>
  );
};
export default Spinner;

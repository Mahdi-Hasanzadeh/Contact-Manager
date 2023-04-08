const Die = (props) => {
  return (
    <>
      <div className="box">
        <button
          onClick={() => {
            props.handleIsHeld(props.id);
          }}
          className="btn btn-lg"
          style={{
            backgroundColor: props.isHeld ? "lightgreen" : "lightblue",
          }}
        >
          {props.value}
        </button>
      </div>
    </>
  );
};

export default Die;

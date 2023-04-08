import { Component, useEffect } from "react";

import Clock from "./CLock.jsx";
import { useReducer, useRef, useMemo, useState } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "Increment": {
      return {
        ...state,
        count: state.count + action.payload,
      };
      break;
    }
    case "Decrement": {
      return {
        ...state,
        count: state.count - action.payload,
      };
      break;
    }
    default:
      return state;
  }
};

const Main = () => {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    name: "mahdi",
  });

  useEffect(() => {
    console.log("Use Effect");
  });

  const increment = () => {
    dispatch({
      type: "Increment",
      payload: 1,
    });
  };

  const [themeDark, setThemeDark] = useState(false);

  const styles = useMemo(() => {
    return {
      backgroundColor: themeDark ? "gray" : "white",
    };
  }, [themeDark]);

  const decrement = () => {
    dispatch({
      type: "Decrement",
      payload: 1,
    });
  };
  useEffect(() => {
    inputRef.current.placeholder = "Enter Your Name";
    inputRef.current.focus();
    renderCount.current = renderCount.current + 1;
  });

  const inputRef = useRef();
  const renderCount = useRef(0);
  return (
    <div style={styles} className="container row">
      <div className="col-6">
        <p>Render Count: {renderCount.current}</p>
        <p>{state.count}</p>
        <button onClick={decrement} className="btn btn-warning">
          Decrease
        </button>
        <button className="btn btn-info" onClick={increment}>
          Increase
        </button>

        <input type="text" ref={inputRef} />
      </div>
      <button
        className="btn btn-success"
        onClick={() => {
          setThemeDark((prevData) => !prevData);
        }}
      >
        Dark Mode
      </button>
    </div>
  );
};
export default Main;

import { useEffect } from "react";

const Clock = (props) => {
  /**
   * * useEffect with empty array dependency will be executed only once when the
   * * component is mounted
   */
  useEffect(() => {
    console.log("use Effect Mount");
    return () => {
      // * anonymous function that will be run when the componet umounted from the dom
      console.log("use Effect unmount");
    };
  }, []);
  /**
   * * useeffect with array dependency that have props or state will be executed
   * * only when a change occur in props or state
   */
  useEffect(() => {
    console.log("use Effect Updating");
  }, [props.color]);

  return (
    <>
      <h3 style={{ color: props.color ? "red" : "black" }}>
        clock is:{props.date.toLocaleTimeString()}
      </h3>
      ;
    </>
  );
};
export default Clock;

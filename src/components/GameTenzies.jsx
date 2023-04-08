import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Spinner from "./Spinner";
import Die from "./Die.jsx";

const Tenzies = () => {
  const [dice, setDice] = useState([]);
  const [rollCount, setRollCount] = useState(0);
  const [won, setWon] = useState(false);
  const [show, setShow] = useState(false);
  const rollDice = () => {
    let arr = [];

    for (let i = 0; i < 12; i++) {
      arr.push({
        value: Math.ceil(Math.random() * 9),
        isHeld: false,
        id: nanoid(),
      });
    }
    return arr;
  };

  const roll = () => {
    if (document.getElementById("btn").innerHTML === "Roll") {
      setRollCount((prevData) => prevData + 1);
      console.log(rollCount);
      setDice((prevData) =>
        prevData.map((item) => {
          return item.isHeld
            ? { ...item }
            : { ...item, value: Math.ceil(Math.random() * 9) };
        })
      );
    } else {
      setDice(rollDice());
      setWon((prevData) => false);
      setRollCount(0);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setDice(rollDice());
      setShow((prevData) => true);
    }, 4000);
  }, []);

  useEffect(() => {
    if (dice.length > 0) {
      const allHeld = dice.every((die) => die.isHeld === true);
      const allValue = dice.every((die) => die.value === dice[0].value);
      //console.log(allHeld);
      if (allHeld && allValue) {
        setWon((prevData) => true);
      }
    }
  }, [dice]);

  const handleIsHeld = (id) => {
    setDice((prevData) =>
      prevData.map((item) => {
        return item.id === id ? { ...item, isHeld: !item.isHeld } : item;
      })
    );
  };

  return (
    <>
      <div className="container-fluid container-tenzies text-center text-white">
        <div className="d-flex justify-content-center flex-column">
          {!won && (
            <>
              <h3>Tenzies Game</h3>
              <div className="desc">
                <p>
                  Roll until all dice are the same.Click each die to freeze it
                  at its current value between rolls.
                </p>
              </div>
            </>
          )}
        </div>
        {won ? (
          <div>
            <h3>
              You Win <br /> Congratulations
            </h3>
            <h2>Roll Count: {rollCount}</h2>
          </div>
        ) : dice.length > 0 ? (
          <div className="container-fluid game-container row ">
            {dice.map((item) => {
              return (
                <Die
                  key={item.id}
                  handleIsHeld={handleIsHeld}
                  value={item.value}
                  isHeld={item.isHeld}
                  id={item.id}
                />
              );
            })}
          </div>
        ) : (
          <Spinner />
        )}

        {show && (
          <div className="col-12">
            <button
              id="btn"
              onClick={roll}
              className="btn btn-secondary w-25 rounded-2 "
            >
              {won ? "New Game" : "Roll"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Tenzies;

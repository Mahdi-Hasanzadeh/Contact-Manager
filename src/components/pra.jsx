import React from "react";
import myImg from "../assets/کوبیده.jfif";
const P = () => {
  return (
    <React.Fragment>
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <p class="title">FLIP CARD</p>
            <p>Hover Me</p>
          </div>
          <div class="flip-card-back">
            <img src={myImg} alt="" className="rounded-2" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default P;

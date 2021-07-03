import React from "react";

const CorrectData = (props) => {
  return (
    <section>
      <h1>
        <span className="place">{props.name}</span>
        <span className="region">{props.region}</span>
      </h1>
      <p>{props.time}</p>
      <div>
        <p className="temp">{props.temp}°</p>
        <p className="condition">{props.condition}</p>
        <img src={props.icon} alt="weather condition icon" />
      </div>
    </section>
  );
};

export default CorrectData;

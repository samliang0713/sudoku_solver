import React from "react";

const Button = (props) => {
  return (
    <div className="buttonWrap">
      <button onClick={props.onButtonClick}>{props.text}</button>
    </div>
  );
};

export default Button;

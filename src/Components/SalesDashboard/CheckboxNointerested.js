import React from "react";

const CheckboxNointerested = ({ id, type, name, handleClick, isChecked }) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      onChange={handleClick}
      checked={isChecked}
      style={{width:15,height:15}}
    />
  );
};

export default CheckboxNointerested;

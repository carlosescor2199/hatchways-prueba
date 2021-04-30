import React from "react";
import "./styles.css";

function CustomInput({ name, value, onChange, placeholder, onKeyPress }: any) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
    ></input>
  );
}

export default CustomInput;

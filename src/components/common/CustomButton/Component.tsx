import React from "react";
import "./styles.css";

function CustomButtom({ text, onClick }: any) {
  return <button type="button" onClick={onClick}>{text}</button>;
}

export default CustomButtom;

import React from "react";

function ListTest({ grade, num }: any) {
  return (
    <li className="list-item">
      <span>
        Test {num}: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{grade}%
      </span>
    </li>
  );
}

export default ListTest;

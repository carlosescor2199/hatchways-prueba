import React, { useState, useEffect } from "react";
import { IStudent } from "../../interfaces/Students";
import CustomButtom from "../common/CustomButton/Component";
import CustomInput from "../common/CustomInput";
import ListTest from "../ListTests/Component";
import "./styles.css";

function CardStudent(props: { student: IStudent }) {
  const [viewScores, setViewScores] = useState<boolean>(false);
  const [tag, setTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (props.student.tags) {
      if (props.student.tags.length < tags.length) {
        props.student.tags = tags;
        setTag("")
      }
    }
  }, [props.student, tags]);

  function handleClick() {
    setViewScores(!viewScores);
  }

  const calAverage = () => {
    let sum = 0;
    for (var i = 0; i < props.student.grades.length; i++) {
      sum += parseInt(props.student.grades[i], 10); //don't forget to add the base
    }
    return sum / props.student.grades.length;
  };

  function handleKeyPressEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (tag !== "") {
        setTags([...tags, tag]);
      }
    }
  }

  function onChangeTag(e: React.ChangeEvent<HTMLInputElement>) {
    setTag(e.target.value);
  }

  return (
    <div className="box">
      <div className="avatar-container">
        <img className="avatar" src={props.student.pic} alt="" />
      </div>
      <div className="content-container">
        <h1 className="fullname">
          {props.student.firstName} {props.student.lastName}
        </h1>
        <ul className="list">
          <li className="list-item">
            <span>Email: {props.student.email}</span>
          </li>

          <li className="list-item">
            <span>Company: {props.student.company}</span>
          </li>
          <li className="list-item">
            <span>Skill: {props.student.skill}</span>
          </li>
          <li className="list-item">
            <span>Average: {calAverage()}%</span>
          </li>
          <li className="list-item">
            <ul className="container-test">
              {viewScores &&
                props.student.grades.map((grade, num) => (
                  <ListTest grade={grade} num={num + 1} key={num} />
                ))}
            </ul>
          </li>
          {props.student.tags && props.student.tags.length > 0 && (
            <li className="list-item">
              {props.student.tags.map((tag, num) => (
                <span className="tag" key={num}>
                  {tag}
                </span>
              ))}
            </li>
          )}
          <li className="list-item">
            <div className="container-input-tag">
              <CustomInput
                placeholder="Add a tag"
                value={tag}
                onChange={onChangeTag}
                onKeyPress={handleKeyPressEnter}
              />
            </div>
          </li>
        </ul>
      </div>
      <div className="container-button">
        <CustomButtom text={viewScores ? "-" : "+"} onClick={handleClick} />
      </div>
    </div>
  );
}

export default CardStudent;

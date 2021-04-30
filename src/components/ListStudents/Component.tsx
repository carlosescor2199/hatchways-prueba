import React, { useEffect, useState } from "react";
import axios from "axios";
import { IStudent } from "../../interfaces/Students";
import CardStudent from "../CardStudent";
import "./styles.css";
import CustomInput from "../common/CustomInput";

function ListStudents() {
  const initialState: IStudent[] = [
    {
      id: "",
      city: "",
      company: "",
      email: "",
      firstName: "",
      lastName: "",
      grades: [],
      pic: "",
      skill: "",
      tags: [],
    },
  ];

  const [students, setStudents] = useState<IStudent[]>(initialState);
  const [search, setSearch] = useState<string>("");
  const [searchTag, setSearchTag] = useState("");
  const [searchStudents, setSearchStudents] = useState(initialState);

  useEffect(() => {
    getStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getStudents() {
    const res = await axios.get("https://api.hatchways.io/assessment/students");

    const newStudents = res.data.students.map((student: IStudent) => {
      return {
        ...student,
        tags: [],
      };
    });
    setStudents(newStudents);
  }

  const handleChangeByName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let value: string = "";
    value += e.target.value;
    setSearch(e.target.value);
    if (value !== "") {
      value = value.toLocaleLowerCase();
      const newStudents = students.filter(
        (student) =>
          student.firstName.toLocaleLowerCase().includes(value) ||
          student.lastName.toLocaleLowerCase().includes(value)
      );
      setSearchStudents(newStudents);
    }
  };

  const handleChangeByTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let value: string = "";
    value += e.target.value;
    setSearchTag(e.target.value);
    let newStudents: IStudent[] = [];
    if (value !== "") {
      value = value.toLocaleLowerCase();
      students.forEach((student) => {
        if (student.tags) {
          const newStudent = student.tags.filter((tag) =>
            tag.toLocaleLowerCase().includes(value)
          );
          if (newStudent.length > 0) {
            newStudents.push(student);
          }
        }
      });
    }
    setSearchStudents(newStudents);
  };

  return (
    <div className="container">
      <CustomInput
        placeholder="Search by name"
        value={search}
        onChange={handleChangeByName}
      />
      <div style={{ marginTop: "1%" }}></div>
      <CustomInput
        placeholder="Search by tag"
        value={searchTag}
        onChange={handleChangeByTag}
      />
      <div className="list-container">
        {search !== "" || searchTag !== ""
          ? searchStudents &&
            searchStudents.map((student: IStudent) => (
              <CardStudent key={student.id} student={student} />
            ))
          : students &&
            students.map((student: IStudent) => (
              <CardStudent key={student.id} student={student} />
            ))}
      </div>
    </div>
  );
}

export default ListStudents;

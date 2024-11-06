import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, Nav } from "react-bootstrap";

function CRUD() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [names, setNames] = useState("");
  const [year, setYear] = useState(0);
  const [dob, setDOB] = useState("");
  const [rollnumber, setRollnumber] = useState(0);

  const showmodal = () => {
    setShow(true);
  };
  const closemodal = () => {
    setShow(false);
  };

  useEffect(() => {
    axios.get("http://localhost:3000/students").then((res) => {
      setData(res.data);
    });
  }, []);

  const handlesubmit = () => {
    axios
      .post("http://localhost:3000/students", {
        names,
        dob,
        year,
        rollnumber,
      })
      .then((res) => {
        setShow(false)
        console.log("success");
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mt-3 p-1">
      <button onClick={showmodal} className="btn btn-primary mb-4">
        Add students Data
      </button>
      <table className="table table-striped border">
        <thead>
          <tr>
            <th>Roll No.</th>
            <th>Student Name</th>
            <th>Year</th>
            <th>DOB</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((m) => (
            <tr>
              <td>{m.names}</td>
              <td>{m.rollnumber}</td>
              <td>{m.year}</td>
              <td>{m.dob}</td>
              <td>
                <button className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={show} onHide={closemodal}>
        <ModalHeader>Add Students</ModalHeader>
        <ModalBody>
          <div className="mt-2">
            <label className="form-label" htmlFor="">
              Name
            </label>
            <input
              onChange={(e) => setNames(e.target.value)}
              placeholder="Entet name"
              className="form-control"
              type="text"
            />
          </div>
          <div className="mt-2">
            <label className="form-label" htmlFor="">
              Roll NO.
            </label>
            <input
              onChange={(e) => setRollnumber(e.target.value)}
              placeholder="Enter Roll No."
              className="form-control"
              type="text"
            />
          </div>
          <div className="mt-2">
            <label className="form-label" htmlFor="">
              Year
            </label>
            <input
              onChange={(e) => setYear(e.target.value)}
              placeholder="Enter Year of Study"
              className="form-control"
              type="number"
            />
          </div>
          <div className="mt-2">
            <label className="form-label" htmlFor="">
              DOB
            </label>
            <input
              onChange={(e) => setDOB(e.target.value)}
              placeholder="enter DOB"
              className="form-control"
              type="date"
            />
          </div>

          <button onClick={handlesubmit} className="btn btn-secondary mt-3">
            SUBMIT
          </button>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default CRUD;

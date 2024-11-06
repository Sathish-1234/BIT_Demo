import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, Form, Button, Modal } from "react-bootstrap";

const API_URL = "http://10.40.27.90:3000/students";

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ names: "", rollnumber: "", dob: "", year: "" });
  const [editing, setEditing] = useState(false);
  const [editRollNumber, setEditRollNumber] = useState(null);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    fetchStudents();
  }, []);


  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      
      try {
        await axios.put(`${API_URL}/${editRollNumber}`, formData);
        fetchStudents();
        setEditing(false);
        setFormData({ names: "", rollnumber: "", dob: "", year: "" });
        setShowModal(false);
      } catch (error) {
        console.error("Error updating student:", error);
      }
    } else {
      
      try {
        await axios.post(API_URL, formData);
        fetchStudents();
        setFormData({ names: "", rollnumber: "", dob: "", year: "" });
        setShowModal(false);
      } catch (error) {
        console.error("Error adding student:", error);
      }
    }
  };

 
  const handleEdit = (student) => {
    setEditing(true);
    setEditRollNumber(student.rollnumber);
    setFormData({
      names: student.names,
      rollnumber: student.rollnumber,
      dob: student.dob,
      year: student.year,
    });
    setShowModal(true);
  };

  const handleDelete = async (rollnumber) => {
    try {
      await axios.delete(`${API_URL}/${rollnumber}`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <Container>
      <h1 className="my-4 text-center">Student Details</h1>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add Student
      </Button>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll Number</th>
            <th>Date of Birth</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.rollnumber}>
              <td>{student.names}</td>
              <td>{student.rollnumber}</td>
              <td>{student.dob}</td>
              <td>{student.year}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(student)}>
                  Edit
                </Button>{" "}
                <Button variant="danger" size="sm" onClick={() => handleDelete(student.rollnumber)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editing ? "Edit Student" : "Add Student"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="names"
                placeholder="Enter name"
                value={formData.names}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formRollNumber">
              <Form.Label>Roll Number</Form.Label>
              <Form.Control
                type="number"
                name="rollnumber"
                placeholder="Enter roll number"
                value={formData.rollnumber}
                onChange={handleChange}
                required
                disabled={editing}
              />
            </Form.Group>

            <Form.Group controlId="formDob">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formYear">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="number"
                name="year"
                placeholder="Enter year"
                value={formData.year}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              {editing ? "Update Student" : "Add Student"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default App;

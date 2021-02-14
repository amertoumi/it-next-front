import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Table, Col, Button } from "react-bootstrap";
// layout for this page
import Admin from "layouts/Admin.js";
import NewSkill from '../../components/Skills/newSkill';
import Header from "components/Headers/Header.js";
import api from "../api";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [type_skills, setType_Skills] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/type_skills")
      .then((response) => response.data["hydra:member"])
      .then((data) => setType_Skills(data))
      .catch((error) => console.log(error.response));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/skills")
      .then((response) => response.data["hydra:member"])
      .then((data) => setSkills(data))
      .catch((error) => console.log(error.response));
  }, []);

  return (
    <>
      <Header />
      <NewSkill />
      <Container fluid className="mt-3">
        <Col md="12">
          <Card className="card-plain table-plain-bg">
            <Card.Header>
              <Card.Title as="h2">Table For All Skills</Card.Title>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover">
                <thead>
                  <tr>
                    <th className="border-0">ID</th>
                    <th className="border-0">Name</th>
                    <th className="border-0">Type</th>
                    <th className="border-0">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {skills.map((skill) => (
                    <tr key={skill.id}>
                      <td>{skill.id}</td>
                      <td>{skill.name}</td>
                      <td>{skill.type}</td>
                      <td>
                        <Button variant="warning">Edit</Button>
                        <Button variant="danger" className="ml-3">
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Container>
    </>
  );
}

Skills.layout = Admin;

export default Skills;

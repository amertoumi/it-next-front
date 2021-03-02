import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Col, Table, Button,} from "react-bootstrap";
import Admin from "layouts/Admin.js";
import NewSkill from "../../components/Skills/newSkill";
import Header from "components/Headers/Header.js";
import NewSkillType from "../../components/Skills/newSkillType";
import "../../assets/css/GlobalStyle.css";
import { API_HOST, API_SKILLS_PATH } from "../../API";
import Api from "../../pages/api";
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

// Get List of all Skills
function SkillsList() {
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    let URL = API_HOST + API_SKILLS_PATH;
      axios
      .get(URL)
      .then((response) => response.data["hydra:member"])
      .then((data) => setSkills(data))
      .catch((error) => console.log(error.response));
    
  }, [skills]);

  
  
// Remove Skill by ID
  function handleRemoveSkill(id) {
    try {
      Api.DeleteSkill(id);
      setError("");
    } catch (error) {
      setError(" Cannot remove skill ");
    }
  }

  return (
    <>
      <Header />
      <NewSkillType />
      <NewSkill />
      {/* <SkillsContextProvider>
        <SkillsTable />
      </SkillsContextProvider> */}
      <Container fluid className="mt-3">
        <Col md="12">
          <Card className="card-plain table-plain-bg">
            <Card.Header>
              <Card.Title as="h2">Table For All SkillsList</Card.Title>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover">
                <thead>
                  <tr>
                    <th className="border-0">
                      <span id="span">Name</span>
                    </th>
                    <th className="border-0">
                      <span id="span">Type</span>
                    </th>
                    <th className="border-0">
                      <span id="span">Action</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  
                  {skills.map((skill) => (
                    <tr key={skill.id}>
                      <td>{skill.name}</td>
                      <td>{skill.type.name}</td>
                      <td>
                        <Button variant="info"> <EditIcon />{' '}Edit</Button>
                        <Button
                          variant="danger"
                          className="ml-3"
                          onClick={() => handleRemoveSkill(skill.id)}
                        >
                          <DeleteForeverIcon/>{' '}Delete
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

SkillsList.layout = Admin;

export default SkillsList;

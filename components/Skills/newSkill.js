import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, FormGroup, Label, Input } from "reactstrap";
import Api from "../../pages/api";

const NewSkill = (props) => {
  const [skillFields, setSkillFields] = React.useState({
    name: "",
    type: "",
  });

  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget;
    setSkillFields({ ...skillFields, [name]: value });
  };

  //list type skills
  const [type_skills, setType_Skills] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/type_skills")
      .then((response) => response.data["hydra:member"])
      .then((data) => setType_Skills(data))
      .catch((error) => console.log(error.response));
  }, []);

  const [error, setError] = React.useState("");

/*   const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await Api.CreateSkills(skillFields);
      setError("");
      setIs_auth(true);
      console.log("new skill inserted to db");
    } catch (error) {
      setError(" les informations sont incorrect");
    }
  }; */

  //test handle submit with console 
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(skillFields);
  };

  return (
    <Container fluid className="mt-3">
      <Label className="mb-sm-0 ml-5">
        <h2>Create New Skill</h2>
      </Label>

      <Form inline onSubmit={handleSubmit}>
        <FormGroup className="mt-3 mb-2 mr-sm-2 mb-sm-0 ml-5">
          <Label for="skillName" className="mr-sm-2">
            Skill Name
          </Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Enter the skill name"
            value={skillFields.name}
            onChange={handleChange}
            /* className={"form-control" + (error && " is-invalid")} */
          />
          {/* {error && <p className="invalid-feedback">{error}</p>} */}
          <Label for="exampleSelectMulti" className="mr-sm-2 ml-3">
            
          </Label>
          <FormGroup check>
          {type_skills.map((type) => (
            <Label check key={type.id}>
              <Input 
              type="radio" 
              name="type"
              id="type"
              value={skillFields.type}
              onChange={handleChange} />
              <span>{type.name}</span>
            </Label>
          ))}
          </FormGroup>

          {/* <Input
            type="select"
            name="type"
            id="exampleSelectMulti"
            value={skillFields.type}
            onChange={handleChange}
            placeholder="select type "
            className={"form-control" + (error && " is-invalid")}
          >
            <option defaultValue hidden value=""></option>

            {type_skills.map((type) => (
              <option key={type.id}>{type.name}</option>
            ))}
          </Input> */}
          {/* {error && <p className="invalid-feedback">{error}</p>} */}

          <Button color="primary" type="submit" className="ml-5">
            Create
          </Button>
        </FormGroup>
      </Form>
    </Container>
  );
};
export default NewSkill;

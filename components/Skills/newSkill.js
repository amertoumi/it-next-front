import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, FormGroup, Label, Input } from "reactstrap";
import Api from "../../pages/api";

const ListTypeSkills = (props) => {
  
  const [skillFields, setSkillFields] = React.useState({
    name: "",
    typeSkills: "",
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await Api.CreateSkills(skillFields);
      setError("");
      setIs_auth(true);
      console.log("new skill inserted to db");
    } catch (error) {
      setError(" les informations sont incorrect");
    }
  };

  return (
    <Container fluid>
      <Form inline onSubmit={handleSubmit}>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
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
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-3 mb-sm-0">
          <Label for="exampleSelectMulti" className="mr-sm-2 ml-3">
            Select New Skill 
          </Label>
          <Input
            type="select"
            name="typeSkills"
            id="exampleSelectMulti"
            value={skillFields.typeSkills}
            onChange={handleChange}
            placeholder="select type "
          /* className={"form-control" + (error && " is-invalid")} */
          >
           <option defaultValue hidden value=""></option>

            {type_skills.map((type) => (
                    <option key={type.id}>
                    {type.name}
                    </option>
                      
                  ))}
           

          </Input>
          {/* {error && <p className="invalid-feedback">{error}</p>} */}
        </FormGroup>

        <Button color="primary" type="submit">
          Create
        </Button>
      </Form>
    </Container>
  );
};
export default ListTypeSkills;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, FormGroup, Label, Input } from "reactstrap";
import Api from "../../pages/api";

const ListTypeSkills = (props) => {
  const [skillFields, setSkillFields] = React.useState({
    name: "",
    type: "",
  });

  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget;
    setSkillFields({ ...skillFields, [name]: value });
  };

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
  const [typeskills, setTypeSkills] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/config/typemission/list")
      .then((response) => response.data)
      .then((data) => setTypeSkills(data))
      //.catch((error) => console.log(error.response));
  }, []);

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
            id="exampleEmail"
            placeholder="Enter the skill name"
            value={skillFields.name}
            onChange={handleChange}
            /* className={"form-control" + (error && " is-invalid")} */
          />
          {/* {error && <p className="invalid-feedback">{error}</p>} */}
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-3 mb-sm-0">
          <Label for="exampleSelectMulti" className="mr-sm-2 ml-3">
            Select Skill Type
          </Label>
          <Input
            type="select"
            name="type"
            id="exampleSelectMulti"
            value={skillFields.type}
            onChange={handleChange}
            /* className={"form-control" + (error && " is-invalid")} */
          >
            <option defaultValue hidden value="">
                
            {/* {typeskills.map((skill) => (
                <option key={skill.id}>
                {skill.id}
                </option>
                    
                ))} */}
            </option>
            
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

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, FormGroup, Label, Input } from "reactstrap";
import { API_HOST, API_TYPE_SKILLS_PATH } from "../../API";
import Api from "../../pages/api";

const NewSkill = () => {
  const [skillFields, setSkillFields] = useState({
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
    let URL = API_HOST + API_TYPE_SKILLS_PATH;
    axios
      .get(URL)
      .then((response) => response.data["hydra:member"])
      .then((data) => setType_Skills(data))
      .catch((error) => console.log(error.response));
  }, []);

  const [error, setError] = useState("");

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
          <Label for="exampleSelectMulti" className="mr-sm-2 ml-3"></Label>
          <Input
            type="select"
            name="type"
            id="exampleSelectMulti"
            value={skillFields.type}
            onChange={handleChange}
            placeholder="select type "
            className={"form-control" + (error && " is-invalid")}
          >
            <option defaultValue hidden value="">
              Select type here
            </option>
            {type_skills.map((type) => (
              <option key={type.id} value={`/api/type_skills/` + type.id}>
                {type.name}
              </option>
            ))}
          </Input>
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

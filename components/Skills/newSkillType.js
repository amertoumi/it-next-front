import React, { useState } from "react";
import { Container, Form, Button, FormGroup, Label, Input } from "reactstrap";
import Api from "../../pages/api";

const NewSkillType = () => {
  const [error, setError] = useState("");
  const [skillTypeField, setSkilltypeField] = useState({ name: "" });

  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget;
    setSkilltypeField({ ...skillTypeField, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await Api.CreateSkillType(skillTypeField);
      setError("");
      console.log("new skill type inserted to db");
      //console.log(skillTypeField)
    } catch (error) {
      setError(" les informations sont incorrect");
    }
  };

  return (
    <Container fluid className="mt-3">
      <Label className="mb-sm-0 ml-5">
        <h2>Create New Skill Type</h2>
      </Label>
      <Form inline onSubmit={handleSubmit}>
        <FormGroup className="mt-3 mb-2 mr-sm-2 mb-sm-0 ml-5">
          <Label for="skillName" className="mr-sm-2">
            Add New Skill Type
          </Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Enter the skill type here"
            value={skillTypeField.typeName}
            onChange={handleChange}
          />
          <Button color="primary" type="submit" className="ml-5">
            Add Type
          </Button>
        </FormGroup>
      </Form>
    </Container>
  );
};
export default NewSkillType;

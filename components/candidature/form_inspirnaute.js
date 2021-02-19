import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Container,
} from "reactstrap";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import Api from "../../pages/api";

const SkillsBox = dynamic(() =>
  import("../../components/Skills/skillsCheckBox")
);

const Inspirenaute_Form = (props) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [error, setError] = React.useState("");
  //handle Post selected skills
  const onSubmit = async (data, event) => {
    event.preventDefault();

    try {
      await Api.SentSelectedSkills(data);
      setError("");
      setIs_auth(true);
      console.log("sent checked skills");
    } catch (error) {
      setError(" cannot sent selected skills");
    }
  };
  return (
    <Container>
      <Form className="col-6 mt-3" role="form" onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="name"
            name="name"
            id="name"
            placeholder="Enter your name"
            ref={register({required: "Required"})}
          />
        </FormGroup>
        <FormGroup>
          <Label for="lastName">Last Name</Label>
          <Input
            type="lastName"
            name="lastName"
            id="lastName"
            placeholder="Enter your LastName"
            ref={register({required: "Required"})}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            ref={register({required: "Required"})}
          />
        </FormGroup>
        <FormGroup>
          <Label for="country">Country</Label>
          <Input 
          type="select" 
          name="country" 
          id="country"
          ref={register({required: "Required"})}
          >
            <option default>
              Select your Country
            </option>
            <option>Tunisia</option>
            <option>France</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="city">City</Label>
          <Input
            type="text"
            name="city"
            id="city"
            placeholder="Enter your city"
            ref={register({required: "Required"})}
          />
        </FormGroup>
        <FormGroup>
          <Label for="address">Address</Label>
          <Input
            type="text"
            name="address"
            id="address"
            placeholder="Enter your adrdess"
            ref={register({required: "Required"})}
          />
        </FormGroup>
        <FormGroup>
          <Label for="phone">Phone</Label>
          <Input
            type="text"
            name="phone"
            id="phone"
            placeholder="Enter your Phone Number"
            ref={register({required: "Required"})}
          />
        </FormGroup>
        <FormGroup>
          <FormGroup>
            <Label for="exampleText">My Skills</Label>
            <SkillsBox />
          </FormGroup>
          <Label for="exampleText">Others Skills</Label>
          <Input 
            type="textarea" 
            name="text" 
            id="exampleText" 
            ref={register({required: "Required"})}/>
        </FormGroup>
        <FormGroup>
          <Label for="exampleFile">File</Label>
          <Input 
          type="file" 
          name="file" 
          id="exampleFile" 
          ref={register({required: "Required"})}
          />
        </FormGroup>
        <Button className="btn btn-success center">Submit</Button>
      </Form>
    </Container>
  );
};

export default Inspirenaute_Form;

import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Container } from 'reactstrap';
import dynamic from 'next/dynamic'

const SkillsBox = dynamic(() => import('../../components/Skills/skillsCheckBox'))

const Example = (props) => {
  return (
      <Container>
    <Form className="col-6 mt-3">
    <FormGroup>
        <Label for="name">Name</Label>
        <Input type="name" name="name" id="name" placeholder="Enter your name" />
      </FormGroup>
      <FormGroup>
        <Label for="lastName">Last Name</Label>
        <Input type="lastName" name="lastName" id="lastName" placeholder="Enter your LastName" />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input type="email" name="email" id="email" placeholder="Enter your email" />
      </FormGroup>
      <FormGroup>
        <Label for="country">Country</Label>
        <Input type="select" name="country" id="country" >
          <option default hide>Select your Country</option>
          <option>Tunisia</option>1
          <option>France</option>
        </Input> 
      </FormGroup>
      <FormGroup>
        <Label for="city">City</Label>
        <Input type="text" name="city" id="city" placeholder="Enter your city" />
      </FormGroup>
      <FormGroup>
        <Label for="address">Address</Label>
        <Input type="text" name="address" id="address" placeholder="Enter your adrdess" />
      </FormGroup>
      <FormGroup>
        <Label for="phone">Phone</Label>
        <Input type="text" name="phone" id="phone" placeholder="Enter your Phone Number" />
      </FormGroup>
      <FormGroup>
        <Label for="exampleText">Others Skills</Label>
        <Input type="textarea" name="text" id="exampleText" />
      </FormGroup>
      <FormGroup>
        <Label for="exampleFile">File</Label>
        <Input type="file" name="file" id="exampleFile" />
     </FormGroup>
      <FormGroup >
        <SkillsBox />
      </FormGroup>
      <Button className="btn btn-success center">Submit</Button>
    </Form>
    </Container>
  );
}

export default Example;
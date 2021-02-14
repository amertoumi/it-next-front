import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input } from 'reactstrap';


const [type_skills, setType_Skills] = useState([]);

export default function NewSkill() {
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/type_skills")
            .then((response) => response.data["hydra:member"])
            .then((data) => setType_Skills(data))
            .catch((error) => console.log(error.response));
    }, []);
    return (
        /*  {type_skills.map(item=>item.name)} */
        <Form>
            <FormGroup>
                <Label for="exampleSelect">Select</Label>
                <Input type="select" name="select" id="exampleSelect">
                    {type_skills.map(type =>
                        <option>{type.name}</option>
                    )}
                </Input>
            </FormGroup>
        </Form>
    )
}
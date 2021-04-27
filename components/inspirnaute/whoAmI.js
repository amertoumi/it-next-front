import React, { useState } from "react";
import Axios from '../../services/axiosServices';
import { API_HOST,API_UPDATE_PROFIL } from "../../API";
import ls from "local-storage";
import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Row,
  Col,
} from "reactstrap";
import './whoAmi.css';

const WhoAmI = () => {
  const id_current_user = ls.get("currentUser");
  const [description, setDescription] = useState("");
  const [finishAt, setFinishAt] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dayRate, setDayRate] = useState("");
  const [startAt, setStartAt] = useState("");

  const SubmitData = () => {
    var formdata = new FormData();
    formdata.append("dispoStart", startAt);
    formdata.append("dispoEnd", finishAt);
    formdata.append("description", description);

    var url = API_HOST + API_UPDATE_PROFIL + id_current_user;

    if (formdata) {
      Axios.post(url, formdata)
      .then((response) => response);
      SuccessAccus();
    } else {
      ErrorAccus();
    }
  };

  return (
    <Container>
      <Form>
        <FormGroup>
          <Label for="exampleText" className="mt-3">
            Who am I ?
          </Label>
          <Input
            required
            type="textarea"
            name="description"
            id="description"
            rows="7"
            value={description}
            onInput={(e) => setDescription(e.target.value)}
          />
        </FormGroup>
        <FormGroup >
          <FormText color="muted" className="bginfo">
            <p>Information only visible to you and the inspire crew</p>
          </FormText>
        </FormGroup>
        <FormGroup>
          <Label for="phoneNumber">Phone Number:</Label>
          <Input
            required
            type="text"
            name="phone"
            id="phoneNumber"
            placeholder=""
            value={phoneNumber}
            onInput={(e) => setPhoneNumber(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="dayRate">Day rate:</Label>
          <Input
            required
            type="text"
            name="dayRate"
            id="dayRate"
            placeholder=""
            value={dayRate}
            onInput={(e) => setDayRate(e.target.value)}
          />
        </FormGroup>
        <Row>
          <Col>
            <FormGroup>
              <Label for="startAt">I Start at:</Label>
              <Input
                required
                type="text"
                name="startAt"
                id="startAt"
                placeholder=""
                value={startAt}
                onInput={(e) => setStartAt(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="finishAt">I finish at:</Label>
              <Input
                type="text"
                name="finishAt"
                id="finishAt"
                placeholder=""
                value={finishAt}
                onInput={(e) => setFinishAt(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>

        <Button onClick={SubmitData} className="button">Save</Button>
      </Form>
    </Container>
  );
};

export default WhoAmI;

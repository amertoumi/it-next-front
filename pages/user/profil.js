import React from 'react';
import User from "layouts/User.js";
import jwtDecode from "jwt-decode";
import {API_HOST, API_UPDATE_PROFIL} from '../../API';
import dynamic from "next/dynamic";
import Swal from "sweetalert2";

const ProfilHeader = dynamic(() =>
  import("../../components/Headers/ProfilHeader")
);
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

function UserPanel() {
  const token = window.localStorage.getItem("authToken");
  const { id: id_Current_User } = jwtDecode(token);
  const [description, setDescription]= React.useState("");
  const [startAt, setStartAt]= React.useState("");
  const [finishAt, setFinishAt] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [dayRate, setDayRate] = React.useState("");

  function SuccessAccus() {
    Swal.fire({
      title: "Success!!",
      text: "Done, your data is inserted :)",
      icon: "success",
      confirmButtonText: "Cool",
    });
  }
  function ErrorAccus() {
    Swal.fire({
      title: "Error !!",
      text:
        "Oups :/ Cannot add data",
      icon: "error",
      confirmButtonText: "Try Again",
    });
  }

  // Add infos to profil table by current user
  const SubmitData = () => {
  var formdata = new FormData();
  formdata.append("dispoStart", startAt);
  formdata.append("dispoEnd", finishAt);
  formdata.append("description", description);
  //formdata.append("phoneNumber", phoneNumber);
  //formdata.append("dayRate", dayRate);

  var url = API_HOST + API_UPDATE_PROFIL+id_Current_User;
  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

   if (formdata) {
    fetch(url, requestOptions).then((response) => response);
    SuccessAccus();
  } else {
    ErrorAccus();
  }
};
  return (
    <>
      <ProfilHeader />
      <Container>
        <Row className="mt-3 mb-3">
          <Col>
            <Form>
              <FormGroup >
                <Label for="exampleText">Who am I ?</Label>
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
              <FormGroup>
                <FormText color="muted">
                  Information only visible to you and the inspire crew
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

              <Button onClick={SubmitData}>Save</Button>
            </Form>
          </Col>
          <Col>
            <div className="mt-5">
            <h1>Block to be Upload video here...</h1>
            </div>
            <div className="mt-7">
                <p>Dear inspirnaute, to start out, you can, if you wish record a video to explain in <b>30 seconds</b>
                your background, who you are, what you like and what you expect from your next mission.</p>
            </div>
            <div>
                <p>
                    Usually, videos generate excitement with our customers and increase your visibility. So
                     <b>prepare your best smile and good lighting, and it's up to you!</b>
                     (Don't worry, you can repart the video as many times as you want).
                </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

UserPanel.getInitialProps = async (ctx) => {
  //const token =  window.localStorage.getItem("authToken");
  const nossr = {ssr: false}
  return { nossr }
}

UserPanel.layout = User;

export default UserPanel;

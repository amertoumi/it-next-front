import React from 'react';
import User from "layouts/User.js";
import jwtDecode from "jwt-decode";
import {API_HOST, API_LAST_FILE, API_UPDATE_PROFIL} from '../../API';
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
import {MDBContainer, MDBIframe} from "mdbreact";

const record_btn = {
  background: '#E94545 0% 0% no-repeat padding-box',
  border: '2px solid #E94545',
  borderRadius: '23px',
  opacity: 1,
  width: '30%',
  height: '35px',
  font: 'normal normal 12px/19px Roboto',
  letterSpacing: '0px'
}

const upload_btn = {
  background: '#1D268C 0% 0% no-repeat padding-box',
  borderRadius: '23px',
  opacity: 1,
  width: '30%',
  height: '35px',
  font: 'normal normal 12px/19px Roboto',
  letterSpacing: '0px'
}

const delete_btn = {
  background: '#D8D9DE 0% 0% no-repeat padding-box',
  borderRadius: '23px',
  opacity: 1,
  width: '30%',
  height: '35px',
  font: 'normal normal 12px/19px Roboto',
  letterSpacing: '0px'
}

const div_video = {
  background: '#F0F0F4 0% 0% no-repeat padding-box',
  borderRadius: '17px',
  padding: '40px 40px 122px 40px',
  opacity: 1
}

const div_video2 = {
  background: '#F0F0F4 0% 0% no-repeat padding-box',
  border: '1px dashed #1D166F',
  borderRadius: '10px',
  opacity: 1
}

const div_btn_video = {
  margin: '25px -20px -90px 0px'
}

const record_text = {
  textAlign: 'left',
  font: 'normal normal medium 20px/61px Roboto',
  letterSpacing: '0px',
  color: '#1D268C',
  opacity: 1
}

function UserPanel(props) {
  var video = API_HOST + '/videos/' + props.data[0].name

  // This function gets called at build time
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
            <Form>
              <FormGroup>
                <Label style={record_text}>Record video</Label>
                <div style={div_video}>
                  <div style={div_video2}>
                    <MDBContainer className="text-center">
                      <MDBIframe src={video}/>
                    </MDBContainer>
                  </div>
                  <div style={div_btn_video}>
                    <Button style={record_btn}>Record video</Button>
                    <Button style={upload_btn}>Upload a video</Button>
                    <Button style={delete_btn}>Delete video</Button>
                  </div>
                </div>
                <div style={{marginTop: '2rem'}}>
                  <p>Dear inspirnaute, to start out, you can, if you wish record a video to explain in <b> 30 seconds </b>
                    your background, who you are, what you like and what you expect from your next mission.</p>
                </div>
                <div>
                  <p>
                    Usually, videos generate excitement with our customers and increase your visibility. So
                    <b> prepare your best smile and good lighting, and it's up to you! </b>
                    (Don't worry, you can repart the video as many times as you want).
                  </p>
                </div>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

UserPanel.getInitialProps = async function() {
  // const token = window.localStorage.getItem("authToken");
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2MTcwMjU2MzIsImV4cCI6MTYxNzAyOTIzMiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiTWFoZGkiLCJpZCI6Mn0.pPDGgsJwep_Kwx8f5UrWsDlhpOAWIW7TjHsAaBDAy7KidnRyJiqNUW8g0wBiUKUol8OUtqGeP7O2La9nLRdt38nwlQ3HIQoZfa0oBfcV5lnYhnFiKWuQMm78Bvc_49wTX8kG8_t3IQwHtjNarw9MaEzeki86YUDiaf8J8E4FrsWRD3PugIQEaUIv1frE3wLJzTnMbYXLefcBWFIAASXZjAGaXGZ94gLp5F5RH7nDlxsFv_k0lA7Lph-RffpHknLWk1U_21WG8TS40p8ZhxxgPJSsWNz15UioY_dOlKXeLo1E1MW89nRS0mx8eX77szveTwWSvJ1JQG4yv98m95P4K2lwdF3mrilYiMU4pl84tFrAmAPIn4FcG4A6awB_k_eDQlZwr4BZw2CH8dWmxdonGZYNP6w9i-SL2ZTDOVerutcbwQXq481LLqqAL93tvroU_mHROYUfSqVDJFSsuRKeYnjnLb4gHjN_IDP-M7AxVytXr8c_sqFeASWpigKiANjTP0fwhmmhUjf434taIddivIpEhg9kg8S6pi1Q9bIaBT7ZCXEKxQK8TnHut1ThTKI7I6mD9p4cC0wPoZgMB9aVEv6A_VPkyu6AkUZQqjZQUb5YPC7rCN38JJU7XAhzljH3JEiGZHw8IC0p6FcHO3DZP4Kksf5OjoRl1xWsM2jM2kY";
  const { id: id_curent_user } = jwtDecode(token);
  const res = await fetch( API_HOST + API_LAST_FILE + 'video' + '/' + id_curent_user);
  const data = await res.json()
  return { data }
}
UserPanel.layout = User;

export default UserPanel;

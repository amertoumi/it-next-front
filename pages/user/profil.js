import React, { useState } from "react";
import User from "layouts/User.js";
import {
  API_HOST,
  API_LAST_FILE,
  API_UPDATE_PROFIL,
  API_UPLOAD_FILE,
} from "../../API";
import dynamic from "next/dynamic";
import Swal from "sweetalert2";
import router from "next/router";
import VideoRecorder from "react-video-recorder";
import ls from 'local-storage';

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
import { MDBContainer, MDBIframe } from "mdbreact";
import {Axios} from '../../services/authApi';

const custom_file_upload = {
  display: "inline-block",
  cursor: "pointer",
  background: "#1D268C 0% 0% no-repeat padding-box",
  borderRadius: "23px",
  opacity: 1,
  width: "30%",
  height: "35px",
  color: "#FFFFFF",
  fontSize: "12px",
  fontFamily: "Roboto",
  letterSpacing: "0px",
  textAlign: "center",
  lineHeight: "35px",
  marginLeft: "5px",
  marginRight: "5px",
};

const custom_file_delete = {
  display: "inline-block",
  cursor: "pointer",
  background: "#D8D9DE 0% 0% no-repeat padding-box",
  borderRadius: "23px",
  opacity: 1,
  width: "30%",
  height: "35px",
  color: "#FFFFFF",
  fontSize: "12px",
  fontFamily: "Roboto",
  letterSpacing: "0px",
  textAlign: "center",
  lineHeight: "35px",
  marginLeft: "5px",
  marginRight: "5px",
};

const custom_file_record = {
  display: "inline-block",
  cursor: "pointer",
  background: "#E94545 0% 0% no-repeat padding-box",
  borderRadius: "23px",
  opacity: 1,
  width: "30%",
  height: "35px",
  color: "#FFFFFF",
  fontSize: "12px",
  fontFamily: "Roboto",
  letterSpacing: "0px",
  textAlign: "center",
  lineHeight: "35px",
  marginLeft: "5px",
  marginRight: "5px",
};

const div_video = {
  background: "#F0F0F4 0% 0% no-repeat padding-box",
  borderRadius: "17px",
  padding: "40px 40px 122px 40px",
  opacity: 1,
};

const div_video2 = {
  background: "#F0F0F4 0% 0% no-repeat padding-box",
  border: "1px dashed #1D166F",
  borderRadius: "10px",
  opacity: 1,
};

const div_btn_video = {
  margin: "25px -20px -90px 0px",
};

const record_text = {
  textAlign: "left",
  font: "normal normal medium 20px/61px Roboto",
  letterSpacing: "0px",
  color: "#1D268C",
  opacity: 1,
};

var show = false;

function UserPanel(props) {

  const token = ls.get("token");
  const id_curent_user = ls.get("currentUser");

  var video = API_HOST + "/videos/" + props.data[0]?.name;

  if (typeof props.data[0]?.name === "undefined") {
    show = false;
  } else {
    var video_id = props.data[0]?.id;
    show = true;
  }
  // This function gets called at build time
  const [description, setDescription] = React.useState("");
  const [startAt, setStartAt] = React.useState("");
  const [finishAt, setFinishAt] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [dayRate, setDayRate] = React.useState("");
  const [selectedFile, setSelectedFile] = useState(null);

/*   const UploadVideo = () => {
    console.log(selectedFile);
    var formData = new FormData();
    formData.append("video", selectedFile);
    formData.append("id_user", id_curent_user);
    var url = API_HOST + API_UPLOAD_FILE;
    var requestOptions = {
      method: "POST",
      body: formData,
      // redirect: "follow",
    };
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      console.log(selectedFile);
      fetch(url, requestOptions).then((response) => console.log(response));
      SuccessAccus();
      setSelectedFile(null);
      //router.push("/user/profil");
    } else {
      ErrorAccus();
    }
  }; */

  const getFile = (file) => {
    setSelectedFile(file);
  };

  const getVideoRecorded = (file) => {
    setSelectedFile(file);
  };

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
      text: "Oups :/ Cannot add data",
      icon: "error",
      confirmButtonText: "Try Again",
    });
  }

  // Add infos to profil table by current user
/*   const SubmitData = () => {
    const id_Current_User = ls.get("currentUser");
    var formdata = new FormData();
    formdata.append("dispoStart", startAt);
    formdata.append("dispoEnd", finishAt);
    formdata.append("description", description);

    var url = API_HOST + API_UPDATE_PROFIL + id_Current_User;
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
  }; */
/*   const onClick = async () => {
    try {
      const res = await fetch(API_HOST + "/api/delete/video/" + video_id, {
        method: "DELETE",
      });
      if (res.status === 200) {
        show = false;
        await router.push("/user/profil");
      }
    } catch (error) {
      console.error(error);
    }
  }; */
  return (
    <>
      <ProfilHeader />
      <Container>
        <Row className="mt-3 mb-3">
          <Col>
            <Form>
              <FormGroup>
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

              <Button /* onClick={SubmitData} */>Save</Button>
            </Form>
          </Col>
         {/*  <Col>
            <Label style={record_text}>Record video</Label>
            <div style={div_video}>
              {show ? (
                <div style={div_video2} key={show}>
                  <MDBContainer className="text-center">
                    <MDBIframe src={video} />
                  </MDBContainer>
                </div>
              ) : (
                <div style={div_video2} key={show}>
                  <FormText color="muted">
                    Information only visible to you and the inspire crew
                  </FormText>
                  <MDBContainer className="text-center">
                    <VideoRecorder
                      onRecordingComplete={(videoBlob) => {
                        getVideoRecorded(videoBlob);
                      }}
                    />
                    <label htmlFor="filee">
                      <i className="fas fa-video" />
                    </label>
                    <input
                      id="filee"
                      type="file"
                      name="file"
                      style={{ visibility: "hidden" }}
                      onChange={(e) => {
                        getFile(e.target.files[0]);
                      }}
                    />
                  </MDBContainer>
                </div>
              )}
              <div style={div_btn_video}>
                <label htmlFor="record-btn" style={custom_file_record}>
                  Record video
                </label>
                <input
                  id="record-btn"
                  type="button"
                  style={{ display: "none" }}
                  onClick={UploadVideo}
                />
                <label htmlFor="file-upload" style={custom_file_upload}>
                  Upload a video
                </label>
                <input
                  id="file-upload"
                  type="button"
                  style={{ display: "none" }}
                  onClick={UploadVideo}
                />
                <label htmlFor="delete_btn-upload" style={custom_file_delete}>
                  Delete video
                </label>
                <input
                  id="delete_btn-upload"
                  type="button"
                  onClick={onClick}
                  style={{ display: "none" }}
                />
              </div>
            </div>
            <div style={{ marginTop: "2rem" }}>
              <p>
                Dear inspirnaute, to start out, you can, if you wish record a
                video to explain in <b> 30 seconds </b>
                your background, who you are, what you like and what you expect
                from your next mission.
              </p>
            </div>
            <div>
              <p>
                Usually, videos generate excitement with our customers and
                increase your visibility. So
                <b>
                  {" "}
                  prepare your best smile and good lighting, and it's up to you!{" "}
                </b>
                (Don't worry, you can repart the video as many times as you
                want).
              </p>
            </div>
          </Col> */}
        </Row>
      </Container>
    </>
  );

}

/* UserPanel.getInitialProps = async function () {
   const token = ls.get("token");
  const id_curent_user = ls.get("currentUser");
  
  const res = await fetch(
    API_HOST + API_LAST_FILE + "video" + "/" + id_curent_user
  );
  const data = await res.json();
  return { data };
}; */

UserPanel.layout = User;

export default UserPanel;

import React, { useState, useEffect, useContext } from "react";
import { API_HOST, API_UPDATE_PROFIL, API_UPLOAD_FILE, API_delete_VIDEO } from "../../API";
import VideoRecorder from "react-video-recorder";
import ls from "local-storage";
import Axios from '../../services/axiosServices';
import { Context as VideoContext } from "../../Context/Video/videoContext";
import { MDBContainer } from "mdbreact";
import { useTheme } from "@material-ui/core/styles";
import { Button, useMediaQuery, DialogTitle, DialogContentText, DialogContent, DialogActions, Dialog } from "@material-ui/core";
import { Label, Col, Container } from "reactstrap";
import "./videoBlock.css";

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
    background: "#A5A7B1 0% 0% no-repeat padding-box",
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

const Videoblock = () => {
  
  const [selectedFile, setSelectedFile] = useState(null);
  const { fetch_video, state } = useContext(VideoContext);
  const [dependency1, setDependency1] = useState(1);
  const [dependency2, setDependency2] = useState(1);

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getVideoRecorded = (file) => {
    setSelectedFile(file);
  };

  //Upload video
  const UploadVideo = () => {
    const id_current_user = ls.get("currentUser");
    var formData = new FormData();
    formData.append("video", selectedFile);
    formData.append("idProfile", id_current_user);
    var url = API_HOST + API_UPLOAD_FILE;
    
    if (selectedFile) {
      Axios.post(url, formData).then((res) => console.log(res.data));
      setDependency1((prev) => prev + 1);
      setSelectedFile(null);
    } else {
      console.log("error");
    }
  };

  //Delete video
  const removeVideo = async (id) => {
    const url = API_HOST + API_delete_VIDEO + id;
    try {
      Axios.delete(url).then((response) => console.log(response.data));
      //setDependency1((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    try {
      fetch_video();
    } catch (error) {
      console.log(error);
    }
  }, [dependency1, dependency2]);

  return (
    <Container>
      <Col>
        <Label style={record_text} className="mt-3">
          Record your video
        </Label>
        <div style={div_video}>
          {!state.video?.name ? (
            <div style={div_video2}>
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
                    setSelectedFile(e.target.files[0]);
                  }}
                />
              </MDBContainer>
            </div>
          ) : (
            <div style={div_video2}>
              <MDBContainer className="text-center">
                <iframe
                  src={`http://localhost:8000/videos/${state.video?.name}`}
                />
              </MDBContainer>
            </div>
          )}

          <div style={div_btn_video}>
            <label htmlFor="record-btn" style={custom_file_record}>
              <i className="fas fa-record-vinyl pr-2"></i>Record video
            </label>
            <input
              id="record-btn"
              type="button"
              style={{ display: "none" }}
              onClick={UploadVideo}
            />
            <label htmlFor="file-upload" style={custom_file_upload}>
              <i className="fas fa-cloud-upload-alt pr-2"></i>Upload a video
            </label>
            <input
              id="file-upload"
              type="button"
              style={{ display: "none" }}
              onClick={UploadVideo}
            />
            <label htmlFor="delete_btn-upload" style={custom_file_delete}>
              <i className="fas fa-trash-alt pr-2"></i>Delete video
            </label>
            <input
              id="delete_btn-upload"
              type="button"
              onClick={() => {
                handleClickOpen();
                removeVideo(state.video.id);
              }}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <div style={{ marginTop: "2rem" }}>
          <p>
            Dear inspirnaute, to start out, you can, if you wish record a video
            to explain in <b> 30 seconds </b>
            your background, who you are, what you like and what you expect from
            your next mission.
          </p>
        </div>
        <div>
          <p>
            Usually, videos generate excitement with our customers and increase
            your visibility. So
            <b>
              {" "}
              prepare your best smile and good lighting, and it's up to you!{" "}
            </b>
            (Don't worry, you can repart the video as many times as you want).
          </p>
        </div>
      </Col>
      {/* Start Block Confirm Dialog for remove video */}
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            <h4>Warning : Remove Video</h4>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <h5>Are you sure?</h5>
              <p>Confirm to proceed</p>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Disagree
            </Button>
            <Button
              onClick={() => {
                handleClose();
                removeVideo(state.video.id);
                setDependency2((prev) => prev + 1);
              }}
              color="primary"
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {/* End Block Confirm Dialog for remove video */}
    </Container>
  );
};

export default Videoblock;

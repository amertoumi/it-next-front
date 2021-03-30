import React, { useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import jwtDecode from "jwt-decode";
import axios from "axios";
import Divider from '@material-ui/core/Divider';
import { Container, Row, Col } from "reactstrap";
import {
  API_HOST,
  API_DETAILS_USER,
  API_UPDATE_PROFILHEADER,
  API_SKILLS_PATH,
} from "../../API";
import { TextField, Button, Avatar, IconButton } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Swal from "sweetalert2";

const MiddleEditBlock = dynamic(() => import("./MiddleEditBlock"));

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  }
}));
const bgHeaderBlock ={
    backgroundColor: "#202460",
}
function EditFormCv () {

  const classes = useStyles();
  const token = window.localStorage.getItem("authToken");
  const infos = jwtDecode(token);
  const { id: id_Current_User } = jwtDecode(token);
  const [disable, setDisable] = React.useState(true);
  const [skills, setSkills] = React.useState([]);
  const [skillsProfil, setProfilSkills] = React.useState([]);
  const [cv, setCV] = React.useState({
    name: "",
    email: "",
    poste: "",
    nbrAnneeExp: "",
    phone: "",
    country: "",
    link: "",
    file: [],
  });

  const Edithandler = (event) => {
    setDisable(!disable);
  };

  const allSkillsArray = skills.map(function (obj) {
    return obj.name;
  });

    console.log("all skills array")
    console.log(allSkillsArray)
    console.log("Profil skills")
    console.log(skillsProfil)

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
  function getAllSkills() {
    var URL = API_HOST + API_SKILLS_PATH;
    var config = {
      method: "get",
      url: URL,
      headers: {},
    };
    axios(config)
      .then((response) => response)
      .then((response) => setSkills(response.data["hydra:member"]))
      .catch((error) => error.response);
    setProfilSkills(cv.skills);
  }

  function getProfilDetails (){
    var URL = API_HOST + API_DETAILS_USER + id_Current_User;
    var config = {
      method: "get",
      url: URL,
      headers: {},
    };

    axios(config)
      .then((response) => response)
      .then((response) => setCV(response.data["details"]))

      .catch((error) => error.response);
  }

  useEffect(() => {
      getAllSkills();
      getProfilDetails();
    
  }, []);


  const SubmitCV = () => {
    var formdata = new FormData();
    formdata.append("name", cv.name);
    formdata.append("poste", cv.poste);
    formdata.append("email", cv.email);
    formdata.append("country", cv.country);
    formdata.append("nbrAnneeExp", cv.nbrAnneeExp);
    formdata.append("phone", cv.phone);
    formdata.append("link", cv.link);

    var url = API_HOST + API_UPDATE_PROFILHEADER + id_Current_User;
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    if (formdata) {
      fetch(url, requestOptions).then((response) => response);
      SuccessAccus();
      setDisable(true);
    } else {
      ErrorAccus();
    }
  };

  if (typeof window !== "undefined") {
    return (
      <Container>
        <Container className="pt-7">
            <React.Fragment style={bgHeaderBlock}>
            <Row className="container-fluid">
            <Col>
              <Link href="/user/profil">
                <Button variant="outlinned">
                  <ArrowBackIosIcon />
                  PROFILE / EDIT RESUME
                </Button>
              </Link>
            </Col>
            <Col className="d-flex justify-content-end">
              <Button
                variant="contained"
                color="primary"
                className="mb-3 mr-5"
                style={{ backgroundColor: "green", color: "white" }}
              >
                View Resume
              </Button>
            </Col>
          </Row>
          <Row className="container-fluid">
            <Col className="col-sm-4 mt-5">
              <Row>
                <img
                  alt="..."
                  className="rounded-circle ml-5"
                  height="140px"
                  width="140px"
                  src={require("assets/img/theme/team-4-800x800.jpg")}
                />
              </Row>
              <Row>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="icon-button-file"
                  type="file"
                />
                <label htmlFor="icon-button-file">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>{" "}
                  Change your profile picture
                </label>
              </Row>
            </Col>
            <Col className="col-sm-8">
              <Row>
                <Col>
                  <Button
                    variant="contained"
                    color="primary"
                    className="mb-3 mr-5"
                    onClick={Edithandler}
                  >
                    {disable ? (
                      <>
                        <EditIcon className="mr-2" />
                        Edit
                      </>
                    ) : (
                      "Cancel"
                    )}
                  </Button>
                  {!disable ? (
                    <Button
                      className="mb-3"
                      variant="contained"
                      style={{ backgroundColor: "green", color: "white" }}
                      onClick={SubmitCV}
                    >
                      Save
                    </Button>
                  ) : null}
                </Col>
              </Row>
              <form className={classes.root} noValidate autoComplete="off">
                <Row>
                  <Col>
                    <label>Name</label>
                    <TextField
                      id="outlined-basic"
                      label=""
                      variant="outlined"
                      value={cv.name || null}
                      disabled={disable}
                      size="small"
                      inputProps={{ className: classes.textColor }}
                      onChange={(e) => {
                        e.preventDefault(),
                          setCV({ ...cv, name: e.target.value });
                      }}
                    />
                    <label>Current Position</label>
                    <TextField
                      id="outlined-basic"
                      label=""
                      variant="outlined"
                      value={cv.poste || null}
                      disabled={disable}
                      size="small"
                      inputProps={{ className: classes.textColor }}
                      onChange={(e) => {
                        e.preventDefault(),
                          setCV({ ...cv, poste: e.target.value });
                      }}
                    />

                    <label>Years of experiences</label>
                    <TextField
                      id="outlined-basic"
                      label=""
                      variant="outlined"
                      value={cv.nbrAnneeExp || null}
                      disabled={disable}
                      size="small"
                      inputProps={{ className: classes.textColor }}
                      onChange={(e) => {
                        e.preventDefault(),
                          setCV({ ...cv, nbrAnneeExp: e.target.value });
                      }}
                    />
                    <label>Landing Place</label>
                    <TextField
                      id="outlined-basic"
                      label=""
                      variant="outlined"
                      value={cv.country || null}
                      disabled={disable}
                      size="small"
                      inputProps={{ className: classes.textColor }}
                      onChange={(e) => {
                        e.preventDefault(),
                          setCV({ ...cv, country: e.target.value });
                      }}
                    />
                  </Col>
                  <Col>
                    <label>Phone</label>
                    <TextField
                      id="outlined-basic"
                      label=""
                      variant="outlined"
                      value={cv.phone || null}
                      disabled={disable}
                      size="small"
                      inputProps={{ className: classes.textColor }}
                      onChange={(e) => {
                        e.preventDefault(),
                          setCV({ ...cv, phone: e.target.value });
                      }}
                    />
                    <label>Email</label>
                    <TextField
                      id="outlined-basic"
                      label=""
                      variant="outlined"
                      value={cv.email || null}
                      disabled={disable}
                      size="small"
                      inputProps={{ className: classes.textColor }}
                      onChange={(e) => {
                        e.preventDefault(),
                          setCV({ ...cv, email: e.target.value });
                      }}
                    />
                    <label>Link</label>
                    <TextField
                      id="outlined-basic"
                      label=""
                      variant="outlined"
                      value={cv.link || null}
                      disabled={disable}
                      size="small"
                      inputProps={{ className: classes.textColor }}
                      onChange={(e) => {
                        e.preventDefault(),
                          setCV({ ...cv, link: e.target.value });
                      }}
                    />
                  </Col>
                </Row>
              </form>
            </Col>
          </Row>
            </React.Fragment>

          <Row className="d-flex flex-column mt-3">
              <Col>
                <h3>Skills</h3>
                <Divider variant="middle" />
              </Col>
              <Col>
              <div>skills to be here....</div>
            </Col>
              
              
          </Row>
        </Container>
      </Container>
    );
  } else null;

}

export default EditFormCv;

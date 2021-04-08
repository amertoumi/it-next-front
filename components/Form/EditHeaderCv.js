import React, { useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import jwtDecode from "jwt-decode";
import axios from "axios";
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
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import Swal from "sweetalert2";
import ls from 'local-storage';

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  inputText: {
    color: "white"
  },
  disabledInput: {
    "& .MuiInputBase-root.Mui-disabled": {
      color: "white",
    }
  },
  input: {
    display: 'none',
  },
  labelInput: {
      color: "#8E89B3"
  },
  ViewResumeButton: {
    width: '180px',
    height: '35px',
    background: '#259879 0% 0% no-repeat padding-box',
    color: 'white',
    borderRadius: '30px',
    opacity: 1
    
  },
  RoundedButton : {
      borderRadius:' 50%'
  }
}));

function EditHeaderCv () {

  const classes = useStyles();
  const token = ls.get("authToken");
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

    return (
        <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundImage:
            "url(" + require("assets/img/theme/profile-cover.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <span className="mask bg-gradient-default opacity-8" />
      
      <Container fluid>
            <Row className="mt-5">
            <Col>
              <Link href="/user/profil">
                <Button variant="outlinned" >
                  <ArrowBackIosIcon style={{color:"white"}}/>
                  <span style={{color:"white"}}>PROFILE / EDIT RESUME</span>
                </Button>
              </Link>
            </Col>
            <Col className="d-flex justify-content-end">
              <Link href="/user/view_cv">
              <Button
                className={classes.ViewResumeButton}
              >
                View Resume
              </Button>
              </Link>
            </Col>
          </Row>
          <Row >
            <Col className="col-sm-4 mt-5 pl-5">
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
                <label htmlFor="icon-button-file" className={classes.labelInput}>
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
                    size="small"
                    className="mb-3 mr-5 ml-4"
                    onClick={Edithandler}
                  >
                    {disable ? (
                      <>
                        <EditIcon className="mr-2" />
                        Edit
                      </>
                    ) : (
                        <>
                        <CancelIcon className="mr-2"/>
                      Cancel
                      </>
                    )}
                  </Button>
                  {!disable ? (
                    <Button
                      className="mb-3"
                      variant="contained"
                      size="small"
                      style={{ backgroundColor: "green", color: "white" }}
                      onClick={SubmitCV}
                    >
                      <SaveIcon className="mr-2"/>Save
                    </Button>
                  ) : null}
                </Col>
              </Row>
              <form className={classes.root} noValidate autoComplete="off">
                <Row>
                  <Col >
                  <div>
                  <label className={classes.labelInput} >Name</label>
                  </div>
                    <div>
                    <TextField
                      className={classes.disabledInput}
                      id="name"
                      label=""
                      variant="outlined"
                      value={cv.name || null}
                      disabled={disable}
                      size="small"
                      onChange={(e) => {
                        e.preventDefault(),
                          setCV({ ...cv, name: e.target.value });
                      }}
                      
                    />
                    </div>
                    <div>
                    <label className={classes.labelInput}>Current Position</label>
                    </div>
                    <div>
                    <TextField
                      className={classes.disabledInput}
                      id="currentpost"
                      label=""
                      variant="outlined"
                      value={cv.poste || null}
                      disabled={disable}
                      size="small"
                      onChange={(e) => {
                        e.preventDefault(),
                          setCV({ ...cv, poste: e.target.value });
                      }}
                    />
                    </div>
                    <div>
                    <label className={classes.labelInput}>Years of experiences</label>
                    </div>
                    <div>
                    <TextField
                      className={classes.disabledInput}
                      id="years"
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
                    </div>
                    <div>
                    <label className={classes.labelInput}>Landing Place</label>
                    </div>
                    <div>
                    <TextField
                    className={classes.disabledInput}
                      id="place"
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
                    </div>
                  </Col>
                  <Col>
                  <div>
                    <label className={classes.labelInput}>Phone</label>
                    </div>
                    <div>
                    <TextField
                    className={classes.disabledInput}
                      id="phone"
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
                    </div>
                    <div>
                    <label className={classes.labelInput}>Email</label>
                    </div>
                    <div>
                    <TextField
                    className={classes.disabledInput}
                      id="email"
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
                    </div>
                    <div>
                    <label className={classes.labelInput}>Link</label>
                    </div>
                    <div>
                    <TextField
                    className={classes.disabledInput}
                      id="link"
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
                    </div>
                  </Col>
                </Row>
              </form>
            </Col>
          </Row> 
      </Container>
      </div>
    </>
    );
}


export default EditHeaderCv;

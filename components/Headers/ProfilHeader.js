import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { API_HOST, API_DETAILS_USER, API_UPLOAD_LOGO } from "../../API";
import Link from "next/link";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Swal from "sweetalert2";
import { Container, Row, Col } from "reactstrap";
import jwtDecode from "jwt-decode";
import axios from "axios";
import ls from "local-storage";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  textWhite: {
    color: 'white',
  }
});

function ProfilHeader() {
  const classes = useStyles();
  const [CurrentUser, setCurrentUser] = React.useState([]);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const token = ls.get("authToken");

  function SuccessAccus() {
    Swal.fire({
      title: "Success!",
      text: "Thanks :) Your logo is uploaded",
      icon: "success",
      confirmButtonText: "Cool",
    });
  }
  function ErrorAccus() {
    Swal.fire({
      title: "Error !!",
      text: "Oups :/ Cannot upload logo",
      icon: "error",
      confirmButtonText: "Try Again",
    });
  }
  React.useEffect(() => {
    const token = ls.get("authToken");
    //const { id: id_Current_User } = jwtDecode(token);
    const dcd = jwtDecode(token);
    const id_Current_User = dcd.id;
    var URL = API_HOST + API_DETAILS_USER + id_Current_User;

    var config = {
      method: "get",
      url: URL,
      headers: {},
    };

    axios(config)
      .then((response) => response)
      .then((response) => setCurrentUser(response.data["details"]))
      .catch((error) => console.log(error.response));
  }, []);


  //console.log(CurrentUser)

  const UploadLogo = () => {
    var formdata = new FormData();
    formdata.append("File", selectedFile);
    formdata.append("type", "logo");

    var url = API_HOST + API_UPLOAD_LOGO;
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    if (selectedFile) {
      fetch(url, requestOptions).then((response) => response);
      SuccessAccus();
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
          <Row>
            <div className="d-flex">
              <div className="d-flex justify-content-between">
                <div>
                  <Col className="" sm="3">
                    <div >
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <div className="mt-5">
                          <img
                            alt="..."
                            className="rounded-circle"
                            height="140px"
                            width="140px"
                            src={require("assets/img/theme/team-4-800x800.jpg")}
                          />
                        </div>
                      </a>
                    </div>
                  </Col>
                </div>
                <div>
                  <Col>
                    <CardContent >
                      <Typography gutterBottom variant="h5" component="h2" className={classes.textWhite} >
                        {CurrentUser.name} {CurrentUser.lastName}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="h2" className={classes.textWhite}>
                        {CurrentUser.poste}
                      </Typography>
                      <Typography gutterBottom variant="h8" component="h6" className={classes.textWhite}>
                        ({CurrentUser.nbrAnneeExp} years of experience)
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        className={classes.textWhite}
                      >
                        Place: {CurrentUser.country},{CurrentUser.city}
                      </Typography>
                    </CardContent>
                    <div >
                        <div>
                        <label
                          for="files"
                          type="files"
                          className="btn ml-3"
                          onClick={UploadLogo}
                          className={classes.textWhite}
                        >
                          <i className="fas fa-save"></i>
                        </label>
                        <label htmlFor="file" >
                          
                          <i class="far fa-camera" className={classes.textWhite}></i>
                        </label>
                        <input
                          id="file"
                          type="file"
                          name="file"
                          style={{ visibility: "hidden" }}
                          onChange={(e) => {
                            setSelectedFile(e.target.files[0]);
                          }}
                        ></input>
                        
                          <div className={classes.textWhite}>Change your picture</div>
                        
                        </div>
                        
                      </div>
                  </Col>
                </div>
              </div>
              <div>
                <Col>
                  <Card>
                    <CardActionArea>
                      <Row>
                        <Col>
                          <CardMedia>
                            <Col>
                              <CardMedia>
                                <Col className="order-sm-1">
                                  <div className="mt-3">
                                    <Link href="/user/view_cv">
                                    <Button>
                                      <i className="far fa-user mr-4 "></i>View
                                      Resume{" "}
                                      <i className="fas fa-arrow-alt-circle-right ml-3"></i>
                                    </Button>
                                    </Link>
                                  </div>
                                </Col>
                              </CardMedia>
                            </Col>
                            <hr></hr>

                            <Col>
                              <CardMedia>
                                <Col className="order-sm-1 ">
                                  <div className="mb-3">
                                    <Link href="/user/edit_cv">
                                      <Button>
                                        <i className="fas fa-pen mr-4"></i>Edit
                                        Resume{" "}
                                        <i className="fas fa-arrow-alt-circle-right ml-3"></i>
                                      </Button>
                                    </Link>
                                  </div>
                                </Col>
                              </CardMedia>
                            </Col>
                          </CardMedia>
                        </Col>
                      </Row>
                    </CardActionArea>
                  </Card>
                </Col>
              </div>
              <div>
                <Col>
                  <Card>
                    <CardActionArea>
                      <Row>
                        <Col>
                          <Col>
                            <CardMedia>
                              <Col className="">
                                <div>
                                  <p>
                                    Complete your profile
                                    <br /> and keep it updated
                                  </p>
                                </div>
                                <CardContent>
                                  <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="h2"
                                    className="text-center"
                                  >
                                    80 %
                                  </Typography>
                                </CardContent>
                              </Col>
                            </CardMedia>
                          </Col>
                        </Col>
                      </Row>
                    </CardActionArea>
                  </Card>
                </Col>
              </div>
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default ProfilHeader;

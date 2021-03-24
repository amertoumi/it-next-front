import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {API_HOST, API_DETAILS_USER, API_UPLOAD_LOGO } from '../../API';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// reactstrap components
import { Container, Row, Col } from "reactstrap";
import jwtDecode from 'jwt-decode';
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

function ProfilHeader() {
    const classes = useStyles();
    const [CurrentUser, setCurrentUser] = React.useState([]);
    const [selectedFile, setSelectedFile] = React.useState(null);
       
    React.useEffect(()=>{
        //console.log(id_Current_User)
        
        const token = window.localStorage.getItem("authToken");
        const infos = jwtDecode(token)
        const {id: id_Current_User} = jwtDecode(token)
        var URL = API_HOST + API_DETAILS_USER +id_Current_User
        var config = {
            method: 'get',
            url: URL,
            headers: { }
          };
          
            axios(config)
            .then((response) => response)
            .then((response)=> setCurrentUser(response.data['details']))
            .catch((error) => console.log(error.response));
            
          
      }, []);

    const UploadLogo =() =>{
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
      fetch(url, requestOptions)
      .then((response) => response);
      
    }
    }
  
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
            <Col>
              <Card>
                <CardActionArea>
                  <Row className="pt-3">
                    <Col>
                      <CardMedia>
                        <Col className="order-sm-1 ml-7" sm="3">
                          <div className="card-profile-image">
                            <a
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
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
                      </CardMedia>
                      
                      <div className="pt-7">
                                <label for="files" class="btn"><i class="fas fa-camera">
                                    </i> Add picture</label>
                                    <input 
                                    type="file"
                                    style={{visibility:'hidden'}}
                                    ></input>
                                {/* <input 
                                type="file"
                                name="file"
                                id="file" 
                                style={{visibility:'hidden'}}
                                onChange={(e) => {
                                    setSelectedFile(e.target.files[0]);
                                }} /> */}
                            </div>
                            <div>
                                <Button 
                                type="submit"
                                onClick={UploadLogo}
                                > save</Button>
                            </div>
                    </Col>
                    <Col className="pr-4">
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="h2">
                        {CurrentUser.name}{" "}{CurrentUser.lastName}
                            {/* {CurrentUser? CurrentUser.details.email: 'ffffff'} */} 
                        </Typography>
                        <Typography gutterBottom variant="h8" component="h6">
                            
                    {CurrentUser.poste}{" "}({CurrentUser.nbrAnneeExp} years of experience)
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          Landing place: {CurrentUser.country},{CurrentUser.city}
                          
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                            
                          </Typography>
                        
                      </CardContent>
                    </Col>
                  </Row>
                </CardActionArea>
              </Card>
            </Col>
            <Col>
              <Row className="text-center d-flex justify-content-end">
                <Col>
                  <Card>
                    <CardActionArea>
                      <Row className="pt-3">
                        <Col>
                          <CardMedia>
                            <Col>
                              <CardMedia>
                                <Col className="order-sm-1">
                                  <div className="mt-3">
                                    <Button>
                                      <i className="far fa-user mr-4 "></i>View
                                      Resume{" "}
                                      <i className="fas fa-arrow-alt-circle-right ml-3"></i>
                                    </Button>
                                  </div>
                                </Col>
                              </CardMedia>
                            </Col>
                            <hr></hr>
                            <Col>
                              <CardMedia>
                                <Col className="order-sm-1 ">
                                  <div className="mb-2">
                                    <Button>
                                      <i className="fas fa-pen mr-4"></i>Edit Resume{" "}
                                      <i className="fas fa-arrow-alt-circle-right ml-3"></i>
                                    </Button>
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
                <Col>
                  <Card>
                    <CardActionArea>
                      <Row>
                        <Col className="pt-3">
                          <Col>
                            <CardMedia>
                              <Col className="order-sm-1 pr-4">
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
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default ProfilHeader;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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

    React.useEffect(()=>{
        
        const token = window.localStorage.getItem("authToken");
        const infos = jwtDecode(token)
        const {id: id_Current_User} = jwtDecode(token)
        console.log(id_Current_User)
        /* authApi.setup();
     const users = axios.get('http://localhost:8000/infos/profil')
                        .then((res)=>console.log(res.data)) */
      }, [])
    
      //Get user details when is connected
/* const DetailsCurrentUser =(id) => {
    var URL = API_HOST + API_DETAILS_USER +'/'+id
    var config = {
      method: 'get',
      url: URL,
      headers: { }
    };
    axios(config)
    .then((response)=> console.log(response.data));
} */

  const classes = useStyles();
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
                  <Row className="pt-3 pb-3">
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
                    </Col>
                    <Col className="pr-4">
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Lizard
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2">
                          Front end developer
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          Lizards are a widespread group of squamate reptiles
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
                      <Row className="pt-3 pb-3">
                        <Col>
                          <CardMedia>
                            <Col>
                              <CardMedia>
                                <Col className="order-sm-1 ">
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
                                  <div className="mb-3">
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
                          <Col></Col>
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

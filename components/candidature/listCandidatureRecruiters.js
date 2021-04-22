import React, { useState, useEffect } from "react";
import Axios from '../../services/axiosServices';
import { API_HOST, API_ENTREPRISES_PATH, API_LIST_ENTREPRISES_PATH } from "../../API";
import Api from "../../pages/api";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// layout for this page
import Admin from "layouts/Admin.js";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

// core components
function Recruiters_Candidatures_List() {
  const [listCandidatures, setListCandidatures] = useState([]);
  const [profilDetails, setProfilDetails] = useState({});
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

//Update Profil status
  function handleProfilStatus(id) {
    const newcv = listCandidatures.map((cv) => {
      if (cv.userId === id) {
        const updatedItem = {
          ...cv,
          isActive: !cv.isActive,
        };

        return updatedItem;
      }
      return cv;
    });

    setListCandidatures(newcv);
  }

  //Update Entreprise status
  function handleAcceptCandidat(id) {
    Api.ActivateUser(id);
  }

  //Get All Entreprise Candidatures
  function getAllEntrepriseCandidatures(){
    var URL = API_HOST + API_LIST_ENTREPRISES_PATH;
    Axios.get(URL)
      .then((response) => response.data)
      .then((data) => setListCandidatures(data))
      .catch((error) => console.log(error.response));
  }

  // Get Entreprise By ID
    async function GetEntrepriseById(id) {
      var URL = API_HOST + API_ENTREPRISES_PATH + "/" + id;
      try {
        dataProfil = await Axios.get(URL)
          .then((response) => response.data)
          .then((data) => setProfilDetails(data))
          .then(setOpen(true));
      } catch (error) {
        return error.message;
      }
    }

  useEffect(() => {
    getAllEntrepriseCandidatures();

  }, []);


  return (
    <>
      <Container className="mt-3" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Inspirnautes Candidatures</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Campany Name</th>
                    <th scope="col">Professional Email</th>
                    <th scope="col">Manager Name</th>
                    <th scope="col">Manager Poste</th>
                    <th scope="col">Status</th>
                    <th scope="col"><span className="ml-6">Action</span></th>
                  </tr>
                </thead>
                <tbody>
                  {listCandidatures.map((cv, indx) => {
                    return (
                      <tr key={cv.id}>
                        <td>
                          <span className="mb-0 text-sm text-center">
                            {cv.username}
                          </span>
                        </td>
                        <td>
                          {" "}
                          <span className="mb-0 text-sm text-center">
                            {cv.email}
                          </span>
                        </td>
                        <td>
                          {" "}
                          <span className="mb-0 text-sm text-center">
                            {cv.name}
                          </span>
                        </td>
                        <td>
                          {" "}
                          <span className="mb-0 text-sm text-center">
                            {cv.poste}
                          </span>
                        </td>
                        <td>
                          <span className="mb-0 text-sm text-center">
                            {cv.isActive ? (
                              <Badge color="" className="badge-dot">
                                <i className="bg-success" />
                                Accepted
                              </Badge>
                            ) : (
                              <Badge color="" className="badge-dot mr-4">
                                <i className="bg-warning" />
                                Pending
                              </Badge>
                            )}
                          </span>
                        </td>
                        <td>
                          <Button
                            className="mr-3"
                            variant="info"
                            variant="contained"
                            color="info"
                            onClick={() => GetEntrepriseById(cv.entrepriseId)}
                          >
                            Details
                          </Button>
                          {cv.isActive ? (
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => {
                                handleProfilStatus(cv.userId),
                                handleAcceptCandidat(cv.userId);
                              }}
                            >
                              Refuse
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => {
                                handleProfilStatus(cv.userId),
                                handleAcceptCandidat(cv.userId);
                              }}
                            >
                              Accept
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open} style={{ height: "80%", width: "500px" }}>
            <div className={classes.paper}>
              <h2 className="text-center">
                {" "}
                Candidature : {profilDetails.type}
              </h2>
              <hr />
              <Row>
                <Col>
                  <h5 id="transition-modal-title">Campany Name: </h5>
                </Col>
                <Col>{profilDetails.username}</Col>
              </Row>
              <Row>
                <Col>
                  <h5 id="transition-modal-title">Campany Domain: </h5>
                </Col>
                <Col>{profilDetails.domain}</Col>
              </Row>
              <Row>
                <Col>
                  <h5 id="transition-modal-title">Profesional email: </h5>
                </Col>
                <Col>{profilDetails.email}</Col>
              </Row>
              <Row>
                <Col>
                  <h5 id="transition-modal-title">Manager Name: </h5>
                </Col>
                <Col>{profilDetails.name}</Col>
              </Row>
              <Row>
                <Col>
                  <h5 id="transition-modal-title">Manager Poste: </h5>
                </Col>
                <Col>{profilDetails.poste}</Col>
              </Row>
              <Row>
                <Col>
                  <h5 id="transition-modal-title">Phone Number: </h5>
                </Col>
                <Col>{profilDetails.phoneNumber}</Col>
              </Row>
              <hr />
              <Row>
                <div className="text-center ml-8 mb-3">
                <span
                  style={{ fontSize: "20px", textDecoration: "underline"}}
                  
                >
                  Questions Part
                </span>
                </div>
              </Row>
              <Row>
                <Col className="col-lg-9 mb-2">
                  <h6 id="transition-modal-title">
                    * You look to recruit one employee or several employees :
                  </h6>
                </Col>
                <Col>{profilDetails.recruitEmployee == true ? "Yes" : "No"}</Col>
              </Row>
              <Row>
                <Col className="col-lg-9 mb-2">
                  <h6 id="transition-modal-title">
                    * You look for self-employed or several self-employed :
                  </h6>
                </Col>
                <Col>{profilDetails.selfEmployed == true ? "Yes" : "No"}</Col>
              </Row>
              <Row>
                <Col className="col-lg-9 mb-2">
                  <h6 id="transition-modal-title">
                    * Are you working with independent :
                  </h6>
                </Col>
                <Col>{profilDetails.independent == true ? "Yes" : "No"}</Col>
              </Row>
              <Row>
                <Col className="col-lg-9 mb-2">
                  <h6 id="transition-modal-title">
                    * Are you Like working with independent :
                  </h6>
                </Col>
                <Col>{profilDetails.likeIndependent == true ? "Yes" : "No"}</Col>
              </Row>
              <Row>
                <Col className="col-lg-9 mb-2">
                  <h6 id="transition-modal-title">
                    * Are you working with remote consultants :
                  </h6>
                </Col>
                <Col>{profilDetails.remoteConsultant == true ? "Yes" : "No"}</Col>
              </Row>
              <Row>
                <Col className="col-lg-9 mb-2">
                  <h6 id="transition-modal-title">
                    * Expand an engineering team or develop an already existing project :
                  </h6>
                </Col>
                <Col>
                  {profilDetails.expandTeam == true ? "Yes" : "No"}
                </Col>
              </Row>
              <Row>
                <Col className="col-lg-9 mb-2">
                  <h6 id="transition-modal-title">
                    * You wish to start a new project :
                  </h6>
                </Col>
                <Col>
                  {profilDetails.newProject == true ? "Yes" : "No"}
                </Col>
              </Row>
              <Row>
                <Col className="col-lg-9 mb-2">
                  <h6 id="transition-modal-title">
                    * You want to make your first hire of an engineer:
                  </h6>
                </Col>
                <Col>
                  {profilDetails.hireIng == true ? "Yes" : "No"}
                </Col>
              </Row>
            </div>
          </Fade>
        </Modal>
      </Container>
    </>
  );
}

Recruiters_Candidatures_List.layout = Admin;

export default Recruiters_Candidatures_List;

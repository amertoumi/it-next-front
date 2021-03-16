import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_HOST, API_PROFILS_PATH, API_LIST_PROFILS_PATH } from "../../API";
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
function Freelancers_Candidatures_List() {
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

  //Update Profil status
  function handleAcceptCandidat(id) {
    Api.ActivateUser(id);
  }



  //List table of Pending Candidature
  useEffect(() => {
    let URL = API_HOST + API_LIST_PROFILS_PATH;
    axios
      .get(URL)
      .then((response) => response.data)
      .then((response) => setListCandidatures(response))
      .catch((error) => console.log(error.response));
  }, []);

  // Get Freelancer By ID
  async function GetFreelancerById(id) {
    var URL = API_HOST + API_PROFILS_PATH + "/" + id;
    try {
      dataProfil = await axios(URL)
        .then((response) => response.data)
        .then((data) => setProfilDetails(data))
        .then(setOpen(true));
    } catch (error) {
      return error.message;
    }
  }

  return (
    <>
      <Container className="mt-3" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Inspirnautes Candidatures</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Poste</th>
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
                            {cv.poste}
                          </span>
                        </td>
                        <td>
                          <span className="text-center">
                            {cv.isActive ? (
                              <Badge color="" className="badge-dot">
                                <p><i className="bg-success" />
                                Accepted</p>
                              </Badge>
                            ) : (
                              <Badge color="" className="badge-dot mr-4">
                                <p>
                                <i className="bg-warning" />
                                Pending
                                </p>
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
                            onClick={() => GetFreelancerById(cv.profilId)}
                          >
                            Details
                          </Button>
                          {cv.isActive ? (
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => {
                                handleAcceptCandidat(cv.userId),
                                handleProfilStatus(cv.userId);
                              }}
                            >
                              Refuse
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => {
                                handleAcceptCandidat(cv.userId),
                                handleProfilStatus(cv.userId);
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
              <h1 className="text-center">
                {" "}
                Candidature : {profilDetails.type}
              </h1>
              <hr />
              <Row>
                <Col>
                  <h5 id="transition-modal-title">Name: </h5>
                </Col>
                <Col>{profilDetails.username}</Col>
              </Row>
              <Row>
                <Col>
                  <h5 id="transition-modal-title">Last Name: </h5>
                </Col>
                <Col>{profilDetails.lastname}</Col>
              </Row>
              <Row>
                <Col>
                  <h5 id="transition-modal-title">Phone Number: </h5>
                </Col>
                <Col>{profilDetails.phone}</Col>
              </Row>
              <Row>
                <Col>
                  <h5 id="transition-modal-title">Email: </h5>
                </Col>
                <Col>{profilDetails.email}</Col>
              </Row>
              <Row>
                <Col>
                  <h5 id="transition-modal-title">country: </h5>
                </Col>
                <Col>{profilDetails.country}</Col>
              </Row>
              <Row>
                <Col>
                  <h5 id="transition-modal-title">City: </h5>
                </Col>
                <Col>{profilDetails.city}</Col>
              </Row>
              <Row>
                <Col>
                  <h5 id="transition-modal-title">Address: </h5>
                </Col>
                <Col>{profilDetails.address}</Col>
              </Row>
              <Row>
                <Col>
                  <h5 id="transition-modal-title">Poste : </h5>
                </Col>
                <Col>{profilDetails.poste}</Col>
              </Row>
              <Row>
                <Col>
                  <h5 id="transition-modal-title">Experience Years : </h5>
                </Col>
                <Col>{profilDetails.nbrAnneeExp}</Col>
              </Row>
              <Row>
                <Col>
                  <h5 id="transition-modal-title">Daily Pricing : </h5>
                </Col>
                <Col>{profilDetails.tarif}</Col>
              </Row>
              <Row>
                <Col>
                  <h5 id="transition-modal-title">Skills : </h5>
                </Col>
                <Col>{profilDetails.mySkills}</Col>
              </Row>
              <Row>
                <Col>
                  <h5 id="transition-modal-title">Other Skills : </h5>
                </Col>
                <Col>{profilDetails.otherSkills} </Col>
              </Row>
            </div>
          </Fade>
        </Modal>
      </Container>
    </>
  );
}

Freelancers_Candidatures_List.layout = Admin;

export default Freelancers_Candidatures_List;

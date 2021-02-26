import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_HOST, API_PROFILS_PATH } from "../../API";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import Header from "components/Headers/Header.js";

//Make style function
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  CVpaper: {
    width: "300px",
    height: "500px",
  },
}));

function Candidatures_List() {
  const classes = useStyles();
  const [listCandidatures, setListCandidatures] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [error, setError] = useState("");

  const handleClickOpen = (id) => () => {
    console.log(id)
    setOpen(true);
    /* setScroll(scrollType); */
  };

  const handleClose = () => {
    setOpen(false);
  };

  //Update Profil status
  function handleProfilStatus(id) {
    const newcv = listCandidatures.map((cv) => {
      if (cv.id === id) {
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

  //List table of Pending Candidature
  useEffect(() => {
    let URL = API_HOST + API_PROFILS_PATH;
    axios
      .get(URL)
      .then((response) => response.data["hydra:member"])
      .then((data) => setListCandidatures(data))
      .catch((error) => console.log(error.response));
  }, [listCandidatures]);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt-3" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Candidatures Pending table</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Category</th>
                    <th scope="col">Status</th>
                    <th scope="col">CV Attachment</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a
                          className="avatar rounded-circle mr-3"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("assets/img/theme/bootstrap.jpg")}
                          />
                        </a>
                        <Media>
                          <span className="mb-0 text-sm">Freelancer Name</span>
                        </Media>
                      </Media>
                    </th>
                    <td>email.test@com</td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-warning" />
                        pending
                      </Badge>
                    </td>
                    <td>
                      <div className="avatar-group">
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip742438047"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("assets/img/theme/team-1-800x800.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip742438047"
                        >
                          Ryan Tompson
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip941738690"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("assets/img/theme/team-2-800x800.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip941738690"
                        >
                          Romina Hadid
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip804044742"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("assets/img/theme/team-3-800x800.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip804044742"
                        >
                          Alexander Smith
                        </UncontrolledTooltip>
                        <a
                          className="avatar avatar-sm"
                          href="#pablo"
                          id="tooltip996637554"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("assets/img/theme/team-4-800x800.jpg")}
                          />
                        </a>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip996637554"
                        >
                          Jessica Doe
                        </UncontrolledTooltip>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">60%</span>
                        <div>
                          <Progress
                            max="100"
                            value="60"
                            barClassName="bg-danger"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Another action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Something else here
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                  
                    {listCandidatures.map((cv, indx) => {
                      return (
                        <tr key={indx}>
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
                              {cv.type}
                            </span>
                          </td>
                          <td>
                            <span className="mb-0 text-sm text-center">
                              {String(cv.isActive) === "false" ? (
                                <Badge color="" className="badge-dot mr-4">
                                  <i className="bg-warning" />
                                  Pending
                                </Badge>
                              ) : (
                                <Badge color="" className="badge-dot">
                                  <i className="bg-success" />
                                  Accepted
                                </Badge>
                              )}
                            </span>
                          </td>
                          <td>
                            {" "}
                            <span className="mb-0 text-sm text-center">
                              {cv.name}
                            </span>
                          </td>
                          <td>
                            {/* <Button
                              variant="info"
                              variant="contained"
                              color="primary"
                              onClick={handleClickOpen(cv.id)}
                            >
                              <EditIcon className="mr-2" /> Edit
                            </Button> */}
                            {String(cv.isActive) === "false" ?
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleProfilStatus(cv.id)}
                                  >
                                    Accept
                                  </Button> : 
                                  <Button
                                  variant="contained"
                                  color="secondary"
                                  onClick={() => handleProfilStatus(cv.id)}
                                >
                                  Refuse
                                </Button>
                            }
                          </td>
                          {/* <Dialog
                  open={open}
                  onClose={handleClose}
                  scroll={scroll}
                  aria-labelledby="form-dialog-title"
                  aria-describedby="scroll-dialog-description"
                >
                  <DialogTitle id="scroll-dialog-title" className="text-center">
                    Subscribe Profil
                    {listCandidatures.map((cv, indx) => (
                      <React.Fragment key={indx}> {cv.type}</React.Fragment>
                    ))}
                  </DialogTitle>
                  <DialogContent dividers={scroll === "paper"}>
                    <DialogContentText
                      id="scroll-dialog-description"
                      tabIndex={-1}
                    >
                      {listCandidatures.map((cv, key) => {
                        if (cv.id) {
                          return (
                            <React.Fragment key={key}>
                              <div>
                                <span className="font-weight-bold"mb-3>Name :</span>
                                {cv.name}
                              </div>
                              <div>
                                <span className="font-weight-bold" mb-3>Email :</span>
                                {cv.email}
                              </div>
                              <div>
                                <span className="font-weight-bold" mb-3>Poste :</span>
                                {cv.poste}
                              </div>
                              <div>
                                <span className="font-weight-bold" mb-3>Tarif :</span>
                                {cv.tarif}
                              </div>
                              <div>
                                <span className="font-weight-bold" mb-3>Expérience :</span>
                                {cv.nbrAnneeExp}
                              </div>
                              <span className="font-weight-bold" mb-3>Skills :</span>
                              {cv.mySkills.map((skill, indx) => (
                                <ul key={indx}>
                                  <li>{skill}</li>
                                </ul>
                              ))}
                              <div>
                                <span className="font-weight-bold" mb-3>Other Skills :</span>
                                <p>{cv.otherSkills}</p>
                              </div>
                              <div>
                                <span className="font-weight-bold" mb-3> Attachment :</span>
                                <p>
                                  for more information you can get the cv
                                  attachment from here:
                                </p>
                                <p>cv will appear here...</p>
                              </div>
                              <div>
                                <p>
                                  So, after reading all information about this
                                  Profil candidature <br />
                                  you can accept or refus it.
                                </p>
                              </div>
  
                              <DialogActions>
                              {String(cv.isActive) === "false" ?
                                  <Button>
                                    <span>Candidat is also pending!!</span>
                                  </Button> : 
                                  <Button>
                                   <span style={{color:'green'}}>
                                     Candidat is already Accpeted !!
                                    </span>
                                  </Button>
                                } 
                                {String(cv.isActive) === "false" ?
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleProfilStatus(cv.id)}
                                  >
                                    Accept
                                  </Button> : 
                                  <Button
                                  variant="contained"
                                  color="secondary"
                                  onClick={() => handleProfilStatus(cv.id)}
                                >
                                  Refuse
                                </Button>
                                } 
                              </DialogActions>
                            </React.Fragment>
                          );
                        }
                        
                      })}
                    </DialogContentText>
                  </DialogContent>
                </Dialog> */}
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
      </Container>
    </>
  );
}

Candidatures_List.layout = Admin;

export default Candidatures_List;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_HOST, API_PROFILS_PATH } from "../../API";
import Button from "@material-ui/core/Button";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Header from "components/Headers/Header.js";

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
} from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
import api from "../../pages/api";

// core components
function Freelancers_Candidatures_List() {
  const [listCandidatures, setListCandidatures] = useState([]);
  const [profilDetails, setProfilDetails] = useState({});
  const theme = useTheme();

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
      //console.log(listCandidatures)
      
  }, []);

// Get Freelancer By ID
 async function GetFreelancerById(id){
     console.log(id);
    var URL = API_HOST + API_PROFILS_PATH +'/'+id
    try {
        let dataProfil = await axios(URL)
        .then((response) => response.data)
        console.log(dataProfil.email)
    }
    catch (error){
        return error.message;
    }
   }

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
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Category</th>
                    <th scope="col">Status</th>
                    <th scope="col">CV Attachment</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
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
                          <Button
                            className="mr-3"
                            variant="info"
                            variant="contained"
                            color="info"
                            onClick={() => GetFreelancerById(cv.id)}
                          >
                             Details
                          </Button>
                          {String(cv.isActive) === "false" ? (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleProfilStatus(cv.id)}
                            >
                              Accept
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => handleProfilStatus(cv.id)}
                            >
                              Refuse
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
      </Container>
    </>
  );
}

Freelancers_Candidatures_List.layout = Admin;

export default Freelancers_Candidatures_List;
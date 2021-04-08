import React, { useEffect, useState } from "react";
import Recruiter from "layouts/Recruiter.js";
import Link from "next/link";
import dynamic from "next/dynamic";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { Container, Col, Row, Button } from "reactstrap";
import { TexFields } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { API_HOST, API_LIST_ENTREPRISES_PATH } from "../../API";
import ls from 'local-storage';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
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
  },
}));

const Profil_Recruiter = () => {
    const classes = useStyles();
    const [disable, setDisable] = useState(true);
    const [company, setCompany] = useState({
        name: "",
        lastName: "",
        entrepriseName: "",
        email: "",
        poste: "",
        phone: "",
        country: "",
        domain: "",
        
    });

    const Edithandler = (event) => {
        setDisable(!disable);
      };

    // get profil Details
    function getProfilDetails (){
        const token = ls.get("authToken");
        const { id: id_Current_User } = jwtDecode(token);
        var URL = API_HOST + API_LIST_ENTREPRISES_PATH ;
        var config = {
        method: "get",
        url: URL,
        headers: {},
        };

    axios(config)
      .then((response) => response)
      .then((response) => setCompany(response.data))

      .catch((error) => error.response);
}

    useEffect(()=> {
        getProfilDetails();
    }, [])
    console.log(company)
  return (
     <div className="pt-7">
        <div className="d-flex justify-content-center">
          <h3>Recruiter profil</h3>
        </div>
        <div className="d-flex justify-content-around">
          <div>
  
              <form className={classes.root} noValidate autoComplete="off">
                  <div>
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
                  </div>
  
              <div>
                  <label className={classes.labelInput} >Manager Name</label>
              </div>
              <div>
              <TextField 
                  id="outlined-basic" 
                  variant="outlined"
                  className={classes.disabledInput}
                  disabled={disable}
                  /* value={company.name} */
              />
              </div>
              <div>
                  <label className={classes.labelInput} >Manager LastName</label>
              </div>
              <div>
              <TextField 
                  id="outlined-basic" 
                  variant="outlined"
                  className={classes.disabledInput}
                  disabled={disable}
                  /* value={company[0].name} */
              />
              </div>
              <div>
                  <label className={classes.labelInput} >Entreprise Name</label>
              </div>
              <div>
              <TextField 
                  id="outlined-basic"  
                  variant="outlined"
                  className={classes.disabledInput}
                  disabled={disable}
                  /* value={company[0].username} */
              />
              </div>
              <div>
                  <label className={classes.labelInput} >Email professional</label>
              </div>
              <div>
              <TextField 
                  id="outlined-basic" 
                  variant="outlined"
                  className={classes.disabledInput}
                  disabled={disable}
                  /* value={company[0].email} */
              />
              </div>
              </form>
          </div>
          <div>
          <form className={classes.root} noValidate autoComplete="off">
          <div>
                  <label className={classes.labelInput} >Telephone Number</label>
              </div>
              <div>
              <TextField 
                  id="outlined-basic" 
                  label="Outlined" 
                  variant="outlined"
                  className={classes.disabledInput}
                  disabled={disable}
              />
              </div>
              <div>
                  <label className={classes.labelInput} >Manager Poste</label>
              </div>
              <div>
              <TextField 
                  id="outlined-basic" 
                  label="Outlined" 
                  variant="outlined"
                  className={classes.disabledInput}
                  disabled={disable}
              />
              </div>
              <div>
                  <label className={classes.labelInput} >Domain</label>
              </div>
              <div>
              <TextField 
                  id="outlined-basic" 
                  label="Outlined" 
                  variant="outlined"
                  className={classes.disabledInput}
                  disabled={disable}
              />
              </div>
              <div>
                  <label className={classes.labelInput} >Country</label>
              </div>
              <div>
              <TextField 
                  id="outlined-basic" 
                  label="Outlined" 
                  variant="outlined"
                  className={classes.disabledInput}
                  disabled={disable}
              />
              </div>
              </form>
          </div>
        </div>
        <div className="d-flex flex-column mt-3 ml-5">
            <div>
                <h6>You look for:</h6>
            </div>
            <div>
                <h6>You have already worked with:</h6>
            </div>
            <div>
                <h6>You wish :</h6>
            </div>
        </div>
      </div>

    
  );
};

Profil_Recruiter.layout = Recruiter;

export default Profil_Recruiter;

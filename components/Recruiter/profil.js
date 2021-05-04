import React, { useEffect, useState, useContext } from 'react';
import ls from "local-storage";
import Axios from '../../services/axiosServices';
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import EditIcon from "@material-ui/icons/Edit";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Container, Col, Row, Button } from "reactstrap";
import { Context as AuthContext } from '../../Context/Auth/AuthContext';
import { FormLabel, FormControl, FormHelperText, NativeSelect, TextField } from "@material-ui/core";
import { API_HOST, API_RECRUITER_DETAILS_PATH, API_EDIT_RECRUITER_PATH, API_POST_RECRUITER_PATH, API_DOMAIN_RECRUITER_PATH } from '../../API';

const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
      inputText: {
        color: "white",
      },
      disabledInput: {
        "& .MuiInputBase-root.Mui-disabled": {
          color: "white",
        },
      },
      input: {
        display: "none",
      },
      labelInput: {
        color: "#8E89B3",
      },
      ViewResumeButton: {
        width: "180px",
        height: "35px",
        background: "#259879 0% 0% no-repeat padding-box",
        color: "white",
        borderRadius: "30px",
        opacity: 1,
      },
      RoundedButton: {
        borderRadius: " 50%",
      },
      formControl: {
          margin: theme.spacing(1),
          minWidth: 120,
        },
        selectEmpty: {
          marginTop: theme.spacing(2),
        },
    },
  }));

export default function Profil () {
  const classes = useStyles();
  const [value, setValue] = React.useState();
  const [disable, setDisable] = useState(true);
  const [checked, setChecked] = useState();
  const [company, setCompany] = useState([]);
  const [domain, setDomain] = useState([]);
  const [post, setPost] = useState([]);
  const {state}=useContext(AuthContext);

  const Edithandler = (event) => {
    setDisable(!disable);
  };
  const AntSwitch = withStyles((theme) => ({
    root: {
      width: 28,
      height: 16,
      padding: 0,
      display: "flex",
    },
    switchBase: {
      padding: 2,
      color: theme.palette.grey[500],
      "&$checked": {
        transform: "translateX(12px)",
        color: theme.palette.common.white,
        "& + $track": {
          opacity: 1,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
        },
      },
    },
    thumb: {
      width: 12,
      height: 12,
      boxShadow: "none",
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  }))(Switch);

  // get profil Details
  function getProfilDetails() {

    const id = ls.get("currentUser");
    var URL = API_HOST + API_RECRUITER_DETAILS_PATH + id;

      Axios.get(URL)
        .then((response) => response)
        .then((response) => setCompany(response.data))
      .catch((error) => error.response);
  }

  //get Domain Recruiter
  function getDomainRecruiter() {
    var URL = API_HOST + API_DOMAIN_RECRUITER_PATH;
    Axios.get(URL)
      .then((response) => response)
      .then((response) => setDomain(response.data["hydra:member"]))

      .catch((error) => error.response);
  }

  //get Post Recruiter
  function getPostRecruiter() {
    var URL = API_HOST + API_POST_RECRUITER_PATH;
    Axios.get(URL)
      .then((response) => response)
      .then((response) => setPost(response.data["hydra:member"]))
      .catch((error) => error.response);
  }

  useEffect(() => {
    getProfilDetails();
    getDomainRecruiter();
    getPostRecruiter();
    
  }, []);
  
  function submitNewCompany() {
    const id_Current_User =ls.get("currentUser");
    var formdata = new FormData();
    formdata.append("name", company.name);
    formdata.append("lastName", company.lastName);
    formdata.append("username", company.username);
    formdata.append("email", company.email);
    formdata.append("phoneNumber", company.phoneNumber);
    formdata.append("poste", company.poste);
    formdata.append("domain", company.domain);
    formdata.append("country", company.country);
    formdata.append("recruitEmployee", company.recruitEmployee);
    formdata.append("selfEmployed", company.selfEmployed);
    formdata.append("independent", company.independent);
    formdata.append("likeIndependent", company.likeIndependent);
    formdata.append("remoteConsultant", company.remoteConsultant);
    formdata.append("expandTeam", company.expandTeam);
    formdata.append("newProject", company.newProject);
    formdata.append("hireIng", company.hireIng);
    formdata.append("idPostRecruiter", company.postRecruiter);
    formdata.append("idDomainRecruiter", company.domainRecruiter);

    var url = API_HOST + API_EDIT_RECRUITER_PATH + id_Current_User;

    Axios.post(url, formdata)
    .then((response) => console.log(response));
    setDisable(true);
   console.log(formdata)
  };

  return (
    <div className="pt-7">
      <div className="d-flex justify-content-center">
        <h3>Recruiter profil</h3>
      </div>
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
                  <CancelIcon className="mr-2" />
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
                onClick={()=>submitNewCompany()}
              >
                <SaveIcon className="mr-2" />
                Save
              </Button>
            ) : null}
          </Col>
        </Row>
      </div>
      <div className="d-flex justify-content-around">
        <div>
          <form className={classes.root} noValidate autoComplete="off">
            <div>
              <label className={classes.labelInput}>Manager Name</label>
            </div>
            <div>
              <TextField
                variant="outlined"
                className={classes.disabledInput}
                disabled={disable}
                value={company.name || ""}
                onChange={(e) => {
                    setCompany({ ...company, name: e.target.value });
                }}
              />
            </div>
            <div>
              <label className={classes.labelInput}>Manager LastName</label>
            </div>
            <div>
              <TextField
                variant="outlined"
                className={classes.disabledInput}
                disabled={disable}
                value={company.lastName || ""}
                onChange={(e) => {
                    setCompany({ ...company, lastName: e.target.value });
                }}
              />
            </div>
            <div>
              <label className={classes.labelInput}>Entreprise Name</label>
            </div>
            <div>
              <TextField
                variant="outlined"
                className={classes.disabledInput}
                disabled={disable}
                value={company.username || ""}
                onChange={(e) => {
                    setCompany({ ...company, username: e.target.value });
                }}
              />
            </div>
            <div>
              <label className={classes.labelInput}>Email professional</label>
            </div>
            <div>
              <TextField
                variant="outlined"
                className={classes.disabledInput}
                disabled={disable}
                value={company.email || ""}
                onChange={(e) => {
                    setCompany({ ...company, email: e.target.value });
                }}
              />
            </div>
          </form>
        </div>
        <div>
          <form className={classes.root} noValidate autoComplete="off">
            <div>
              <label className={classes.labelInput}>Telephone Number</label>
            </div>
            <div>
              <TextField
                variant="outlined"
                className={classes.disabledInput}
                disabled={disable}
                value={company.phoneNumber || ""}
                onChange={(e) => {
                    setCompany({ ...company, phoneNumber: e.target.value });
                }}
              />
            </div>
            <div>
              <label className={classes.labelInput}>Manager Poste</label>
            </div>
            <div>
              <TextField
                variant="outlined"
                className={classes.disabledInput}
                disabled={disable}
                value={company.poste || ""}
                onChange={(e) => {
                    setCompany({ ...company, poste: e.target.value });
                }}
              />
            </div>
            <div>
              <label className={classes.labelInput}>Country</label>
            </div>
            <div>
              <TextField
                variant="outlined"
                className={classes.disabledInput}
                disabled={disable}
                value={company.country || ""}
                onChange={(e) => {
                    setCompany({ ...company, country: e.target.value });
                }}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="d-flex justify-content-around">
      <div>
      <FormControl className={classes.formControl}>
        <NativeSelect
          name="age"
          className={classes.selectEmpty}
          inputProps={{ "aria-label": "age" }}
          disabled={disable}
          value={company.postRecruiter?.id}
          onChange={(e) => {
              setCompany({ ...company, postRecruiter:e.target.value});
          }}
        >
            
          {
              post.map((item, id)=>{
                  return (
                      <option
                        key={id}
                        value={item.id}
                        >
                          {item.name}
                      </option>
                  )
              })
          }
          
        </NativeSelect>
        <FormHelperText>Actual Post </FormHelperText>
      </FormControl>
      </div>
      <div>
      <FormControl className={classes.formControl}>
        <NativeSelect
          name="age"
          className={classes.selectEmpty}
          inputProps={{ "aria-label": "age" }}
          disabled={disable}
          value={company.domainRecruiter?.id}
          onChange={(e) => {
              setCompany({ ...company, domainRecruiter:e.target.value});
          }}
        >     
          {
              domain.map((item, id)=>{
                  return (
                      <option
                        key={id}
                        value={item.id}
                        >
                          {item.name}
                      </option>
                  )
              })
          }
          
        </NativeSelect>
        <FormHelperText>Agence Domain </FormHelperText>
      </FormControl>
      </div>
      </div>
      <div className="d-flex flex-column mt-3 ml-5">
        <div>
          <div>
            <h6>You look for:</h6>
          </div>
          <div>
            <FormControl component="fieldset" className="mt-3">
              <FormLabel component="legend">
                You look to recruit one employee or several employees :
              </FormLabel>
              <Typography component="div">
                <Grid
                  component="label"
                  container
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>Non</Grid>
                  {console.log(company.recruitEmployee)}  
                  <Grid item>
                    <AntSwitch
                      checked={company.recruitEmployee}
                      disabled={disable}
                      name="checked1"
                      onChange={(event) => {
                        setCompany({
                          ...company,
                          recruitEmployee: event.target.checked,
                        });
                      }}
                    />
                  </Grid>
                  <Grid item>Oui</Grid>
                </Grid>
              </Typography>
            </FormControl>
          </div>

          <div>
            <FormControl component="fieldset" className="mt-3">
              <FormLabel component="legend">
                You look for self-employed or several self-employed :
              </FormLabel>
              <Typography component="div">
                <Grid
                  component="label"
                  container
                  alignItems="center"
                  spacing={1}
                  
                >
                  
                  <Grid item>Non</Grid>
                  <Grid item>
                    <AntSwitch
                      checked={company.selfEmployed}
                      disabled={disable}
                      name="checked2"
                      onChange={(event) => {
                        setCompany({
                          ...company,
                          selfEmployed: event.target.checked,
                        });
                      }}
                    />
                  </Grid>
                  <Grid item>Oui</Grid>
                </Grid>
              </Typography>
            </FormControl>
          </div>
        </div>
        <div>
          <h6>You have already worked with:</h6>
        </div>
        <div>
          <FormControl component="fieldset" className="mt-3">
            <FormLabel component="legend">Independents :</FormLabel>
            <Typography component="div">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>Non</Grid>
                <Grid item>
                  <AntSwitch
                    checked={company.independent}
                    disabled={disable}
                    name="independent"
                    onChange={(event) => {
                      setCompany({
                        ...company,
                        independent: event.target.checked,
                      });
                    }}
                  />
                </Grid>
                <Grid item>Oui</Grid>
              </Grid>
            </Typography>
          </FormControl>
        </div>
        <div>
          <FormControl component="fieldset" className="mt-3">
            <FormLabel component="legend">
              Independents and you liked :
            </FormLabel>
            <Typography component="div">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>Non</Grid>
                <Grid item>
                  <AntSwitch
                    checked={company.likeIndependent}
                    disabled={disable}
                    name="likeIndependent"
                    onChange={(event) => {
                      setCompany({
                        ...company,
                        likeIndependent: event.target.checked,
                      });
                    }}
                  />
                </Grid>
                <Grid item>Oui</Grid>
              </Grid>
            </Typography>
          </FormControl>
        </div>
        <div>
          <FormControl component="fieldset" className="mt-3">
            <FormLabel component="legend">Remote consultants :</FormLabel>
            <Typography component="div">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>Non</Grid>
                <Grid item>
                  <AntSwitch
                    checked={company.remoteConsultant}
                    disabled={disable}
                    name="remoteConsultant"
                    onChange={(event) => {
                      setCompany({
                        ...company,
                        remoteConsultant: event.target.checked,
                      });
                    }}
                  />
                </Grid>
                <Grid item>Oui</Grid>
              </Grid>
            </Typography>
          </FormControl>
        </div>
        <div>
          <h6>You wish :</h6>
        </div>
        <div>
          <FormControl component="fieldset" className="mt-3">
            <FormLabel component="legend">
              Expand an engineering team or develop an already existing project
              :
            </FormLabel>
            <Typography component="div">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>Non</Grid>
                <Grid item>
                  <AntSwitch
                    checked={company.expandTeam}
                    disabled={disable}
                    name="expandTeam"
                    onChange={(event) => {
                      setCompany({
                        ...company,
                        expandTeam: event.target.checked,
                      });
                    }}
                  />
                </Grid>
                <Grid item>Oui</Grid>
              </Grid>
            </Typography>
          </FormControl>
        </div>
        <div>
          <FormControl component="fieldset" className="mt-3">
            <FormLabel component="legend">Start a new project :</FormLabel>
            <Typography component="div">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>Non</Grid>
                <Grid item>
                  <AntSwitch
                    checked={company.newProject}
                    disabled={disable}
                    name="newProject"
                    onChange={(event) => {
                      setCompany({
                        ...company,
                        newProject: event.target.checked,
                      });
                    }}
                  />
                </Grid>
                <Grid item>Oui</Grid>
              </Grid>
            </Typography>
          </FormControl>
        </div>
        <div>
          <FormControl component="fieldset" className="mt-3">
            <FormLabel component="legend">
              Make your first hire of an engineer :
            </FormLabel>
            <Typography component="div">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>Non</Grid>
                <Grid item>
                  <AntSwitch
                    checked={company.hireIng}
                    disabled={disable}
                    name="hireIng"
                    onChange={(event) => {
                      setCompany({ ...company, hireIng: event.target.checked });
                    }}
                  />
                </Grid>
                <Grid item>Oui</Grid>
              </Grid>
            </Typography>
          </FormControl>
        </div>
      </div>
    </div>
  );
}
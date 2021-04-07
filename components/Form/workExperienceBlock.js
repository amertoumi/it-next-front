import React, { useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import {
  API_HOST,
  API_WORK_BY_PROFIL_PATH,
  API_REMOVE_WORK_EXP_PATH,
  API_UPDATE_WORk_PATH,
} from "../../API";
import workexpApi from './workexpApi';
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import { Row, Col } from "reactstrap";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { TextField, Button } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: "30px",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "center",
  },
  column: {
    flexBasis: "33.33%",
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  accordion: {
    marginTop: "15px",
    backgroundColor: "#c2d4d4",
  },
  accordionAction: {
    display: "contents",
  },
  disabledInput: {
    "& .MuiInputBase-root.Mui-disabled": {},
    marginBottom: "10px",
  },
  btnSkills : {
    color: '#0F1447',
    backgroundColor: 'white',
    width: '120px',
    height: '44px',
    border: '2px solid #0F1447',
    borderRadius: '30px',
    opacity: 1,
  }
}));

export default function WorkExpBlock() {
  const classes = useStyles();
  const [work, setWork] = React.useState([]);
  const token = window.localStorage.getItem("authToken");
  const { id: id_Current_User } = jwtDecode(token);
  const [disable, setDisable] = React.useState(true);
  const [sizeWork, setSizeWork] = React.useState();
  const [state, setState] = React.useState(true);
  const Edithandler = (event) => {
    setDisable(!disable);
  };
 console.log(workexpApi)
  const fetchWork = () => {
    var URL = API_HOST + API_WORK_BY_PROFIL_PATH + id_Current_User;
    axios.get(URL).then((response) => setWork(response.data));
  };

  useEffect(() => {
    fetchWork();
  }, []);


  //Remove work experience by ID
  const removeWorkExp = (id) => {
    var URL = API_HOST + API_REMOVE_WORK_EXP_PATH + id;
    axios(URL, {
      method: "DELETE",
      headers: {},
    })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error.message));
  };

  //Update work experience
  const UpdateWorkExp = (id, index) => {
    var formdata = new FormData();
    formdata.append("position", work[index].poste);
    formdata.append("entreprise", work[index].entreprise);
    formdata.append("fromDate", work[index].fromDateFormat);
    formdata.append("toDate", work[index].toDateFormat);
    formdata.append("description", work[index].description);

    var url = API_HOST + API_UPDATE_WORk_PATH + id;
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(url, requestOptions).then((response) => console.log(response));
    setDisable(true);
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className={classes.root}>
      {work.map((exp, index) => {
        return (
          <Accordion key={exp.id} className={classes.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1c-content"
              id="panel1c-header"
            >
              <div>
                <Typography className={classes.heading}>
                  <span>
                    <b>{capitalizeFirstLetter(exp.poste)}</b>
                  </span>{" "}
                  FOR{" "}
                  <span>
                    <b>{capitalizeFirstLetter(exp.entreprise)}</b>
                  </span>{" "}
                </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <div>
                <Divider className="mb-2" />
                <Row>
                  <div className="d-flex">
                    <Col>
                      <div>
                        <label className={classes.labelInput}>Position:</label>
                      </div>
                      <div>
                        <TextField
                          className={classes.disabledInput}
                          label=""
                          variant="outlined"
                          value={exp.poste || null}
                          disabled={disable}
                          size="small"
                          onChange={(e) => {
                            let item = [...work];
                            item[index] = {
                              ...work[index],
                              poste: e.target.value,
                            };
                            setWork(item);
                          }}
                        />
                      </div>
                      <div>
                        <label className={classes.labelInput}>Company:</label>
                      </div>
                      <div>
                        <TextField
                          className={classes.disabledInput}
                          label=""
                          variant="outlined"
                          value={exp.entreprise || null}
                          disabled={disable}
                          size="small"
                          onChange={(e) => {
                            let item = [...work];
                            item[index] = {
                              ...work[index],
                              entreprise: e.target.value,
                            };
                            setWork(item);
                          }}
                        />
                      </div>
                    </Col>
                    <Col>
                      <div>
                        <label className={classes.labelInput}>From:</label>
                      </div>
                      <div>
                        <TextField
                          className={classes.disabledInput}
                          label=""
                          variant="outlined"
                          value={exp.fromDateFormat || null}
                          disabled={disable}
                          size="small"
                          onChange={(e) => {
                            let item = [...work];
                            item[index] = {
                              ...work[index],
                              fromDateFormat: e.target.value,
                            };
                            setWork(item);
                          }}
                        />
                      </div>
                      <div>
                        <label className={classes.labelInput}>To:</label>
                      </div>
                      <div>
                        <TextField
                          className={classes.disabledInput}
                          label=""
                          variant="outlined"
                          value={exp.toDateFormat || null}
                          disabled={disable}
                          size="small"
                          onChange={(e) => {
                            let item = [...work];
                            item[index] = {
                              ...work[index],
                              toDateFormat: e.target.value,
                            };
                            setWork(item);
                          }}
                        />
                      </div>
                    </Col>
                  </div>
                </Row>
                <Row>
                  <Col>
                    <div>
                      <label className={classes.labelInput}>Description:</label>
                    </div>
                    <div>
                      <TextField
                        className={classes.disabledInput}
                        label=""
                        variant="outlined"
                        value={exp.description || null}
                        disabled={disable}
                        fullWidth
                        onChange={(e) => {
                          let item = [...work];
                          item[index] = {
                            ...work[index],
                            description: e.target.value,
                          };
                          setWork(item);
                        }}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </AccordionDetails>
            <Divider />
            <AccordionActions>
              <Col>
                <Button
                  
                  size="small"
                  style={{ color: "#E94545" }}
                  onClick={() => removeWorkExp(exp.id)}
                >
                  <DeleteIcon />
                  Remove
                </Button>
              </Col>
              <Col>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className="mr-2 ml-4"
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
                    variant="contained"
                    size="small"
                    style={{ backgroundColor: "green", color: "white" }}
                    onClick={() => UpdateWorkExp(exp.id, index)}
                  >
                    <SaveIcon className="mr-2" />
                    Save
                  </Button>
                ) : null}
              </Col>
            </AccordionActions>
          </Accordion>
        );
      })}
    </div>
  );
}

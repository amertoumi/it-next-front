import React, {useEffect} from 'react';
import axios from "axios";
import jwtDecode from "jwt-decode";
import {API_HOST, API_EDUCATION_BY_PROFIL, API_REMOVE_EDUCATION_PATH, API_UPDATE_EDUCATION_PATH } from '../../API';
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
import { format } from 'date-fns';

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
}));

const EducationsBlock = () => {
    const classes = useStyles();
    const [education, setEducation] = React.useState([]);
    const token = window.localStorage.getItem("authToken");
    const { id: id_Current_User } = jwtDecode(token);
    const [disable, setDisable] = React.useState(true);
    const Edithandler = (event) => {
        setDisable(!disable);
      };
    //Get All Educations
    useEffect(() => {
        var URL = API_HOST + API_EDUCATION_BY_PROFIL + id_Current_User;
        axios
          .get(URL)
          .then((response) => setEducation(response.data));
      }, [education]);

      //Remove Education by ID
  const removeEducation = (id) => {
    var URL = API_HOST + API_REMOVE_EDUCATION_PATH + id;
    axios(URL, {
      method: "DELETE",
      headers: {},
    })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error.message));
  };

  //Update Education
  const UpdateEducation = (id,index) => {
    var formdata = new FormData();
    formdata.append("school", education[index].school);
    formdata.append("degree", education[index].degree);
    formdata.append("fromDateEdu", education[index].fromDateFormat);
    formdata.append("toDateEdu", education[index].toDateFormat);
    formdata.append("descriptionEdu", education[index].descriptionEdu);

    var url = API_HOST + API_UPDATE_EDUCATION_PATH + id;
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    
    
    fetch(url, requestOptions)
    .then((response) => console.log(response));
    setDisable(true);
  };
  
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


    return ( 
        <div className={classes.root}>
      {education.map((edu, index) => {
        return (
          <Accordion key={edu.id} className={classes.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1c-content"
              id="panel1c-header"
            >
              <div>
                <Typography className={classes.heading}>
                  <span>
                    <b>{capitalizeFirstLetter(edu.degree)}</b>
                  </span>{" "}Degree{" "}on {" "}
                  
                  <span>
                    <b>{capitalizeFirstLetter(edu.school)}</b>
                  </span>{" "} School
                  
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
                        <label className={classes.labelInput}>School:</label>
                      </div>
                      <div>
                        <TextField
                          className={classes.disabledInput}
                          id="outlined-basic"
                          label=""
                          variant="outlined"
                          value={edu.school || null}
                          disabled={disable}
                          size="small"
                          onChange={(e) => {
                            let item = [...education]
                            item[index]= {...education[index], school:e.target.value}
                            setEducation(item)
                            
                          }}
                        />
                      </div>
                      <div>
                        <label className={classes.labelInput}>Degree:</label>
                      </div>
                      <div>
                        <TextField
                          className={classes.disabledInput}
                          id="outlined-basic"
                          label=""
                          variant="outlined"
                          value={edu.degree || null}
                          disabled={disable}
                          size="small"
                          onChange={(e) => {
                            let item = [...education]
                            item[index]= {...education[index], degree:e.target.value}
                            setEducation(item)
                            
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
                          id="outlined-basic"
                          label=""
                          variant="outlined"
                          value={edu.fromDateFormat || null}
                          disabled={disable}
                          size="small"
                          onChange={(e) => {
                            let item = [...education]
                            item[index]= {...education[index], fromDateFormat:e.target.value}
                            setEducation(item)
                            
                          }}
                        />
                      </div>
                      <div>
                        <label className={classes.labelInput}>To:</label>
                      </div>
                      <div>
                        <TextField
                          className={classes.disabledInput}
                          id="outlined-basic"
                          label=""
                          variant="outlined"
                          value={edu.toDateFormat || null}
                          disabled={disable}
                          size="small"
                          onChange={(e) => {
                            let item = [...education]
                            item[index]= {...education[index], toDateFormat:e.target.value}
                            setEducation(item)
                            
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
                        id="outlined-basic"
                        label=""
                        variant="outlined"
                        value={edu.descriptionEdu || null}
                        disabled={disable}
                        fullWidth
                        onChange={(e) => {
                          let item = [...education]
                          item[index]= {...education[index], descriptionEdu:e.target.value}
                          setEducation(item)
                          
                        }}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </AccordionDetails>
            <Divider />
            <AccordionActions>
              <div className="d-flex">
              <div className="col-4">
                <Button
                  size="small"
                  style={{ color: "#E94545" }}
                  onClick={() => removeEducation(edu.id)}
                >
                  <DeleteIcon />
                  Remove
                </Button>
              </div>
              
              <div className="col-8 mr-5">
              <Row>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className="mr-2 ml-3"
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
                    onClick={() => UpdateEducation(edu.id,index)}
                  >
                    <SaveIcon className="mr-2" />
                    Save
                  </Button>
                ) : null}
                </Row>
              </div>
              </div>
            </AccordionActions>
          </Accordion>
        );
      })}
    </div>
     );
}
 
export default EducationsBlock;
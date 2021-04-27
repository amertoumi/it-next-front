//import 'date-fns';
import React, {useEffect} from "react";
import {Axios} from '../../services/authApi';
import dynamic from 'next/dynamic';
import {API_HOST, API_ADD_WORK_EXP_PATH, API_ADD_EDUCATION_PATH, API_WORK_BY_PROFIL_PATH } from "../../API";
import { Container, Row, Col } from "reactstrap";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider,KeyboardDatePicker } from '@material-ui/pickers';
import ls from 'local-storage';

const WorkExpBlock = dynamic(()=>import('./workExperienceBlock'));
const EditSkillsBlock= dynamic(()=>import('./EditSkillsBlock'));
const EDUCATIONSBLOCK = dynamic(() => import ('./EducationsBlock'));

const useStyles = makeStyles(theme => ({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1)
      }
    },
    btnSave : {
      color: '#0F1447',
      backgroundColor: 'white',
      width: '120px',
      height: '35px',
      border: '2px solid #0F1447',
      borderRadius: '30px',
      opacity: 1,
    }
}));

function WorkExp_Education() {
    const [work, setWork] = React.useState([])
    const classes = useStyles();
    const id_Current_User = ls.get("currentUser");
    const [fromDate, setFromDate] = React.useState(Date.now());
    const [toDate, setToDate] = React.useState(Date.now());
    const [fromDateEdu, setFromDateEdu] = React.useState(Date.now());
    const [toDateEdu, setToDateEdu] = React.useState(Date.now());
    const [workExp, setWorkExp] = React.useState({
        poste: "",
        company: "",
        description:""
    });
    const [education, setEducation] = React.useState({
      school:"",
      degree:"",
      descriptionEdu:""
    })


   const handleFromDateChange = (date) => {
    setFromDate(date);
  }; 
  const handleToDateChange = (date) => {
    setToDate(date);
  };
  const handleFromDateEduChange = (date) => {
    setFromDateEdu(date);
  };
  const handleToDateEduChange = (date) => {
    setToDateEdu(date);
  };
 //fetch Work Experience
const fetchWork = ()  =>{
    var URL = API_HOST + API_WORK_BY_PROFIL_PATH + id_Current_User;
    
    Axios.get(URL)
    .then((response) => setWork(response.data));
}

useEffect(() => {
  fetchWork();
}, []); 

  //Add New work experience
const SubmitWorkExp = () => {
    var formdata = new FormData();
    formdata.append("position", workExp.poste);
    formdata.append("company", workExp.company);
    formdata.append("fromDate", fromDate.toISOString());
    formdata.append("toDate", toDate.toISOString());
    formdata.append("description", workExp.description);

    var url = API_HOST + API_ADD_WORK_EXP_PATH + id_Current_User;
    
    Axios.post(url, formdata)
    .then((response) => console.log(response));
  }

    //Add New education or training
  const SubmitNewEducation = () => {
      var formdata = new FormData();
      formdata.append("school", education.school);
      formdata.append("degree", education.degree);
      formdata.append("fromDateEdu", fromDateEdu.toISOString());
      formdata.append("toDateEdu", toDateEdu.toISOString());
      formdata.append("descriptionEdu", education.descriptionEdu);
  
      var url = API_HOST + API_ADD_EDUCATION_PATH + id_Current_User;
      
      Axios.post(url, formdata)
      .then((response) => console.log(response));
    }

  return (
    <Container>
      
      <div className="d-flex ">
         <Col className="col-7">
          <div className="mt-5 mb-5">
            <h5>Work Experience</h5>
          </div>
          
          <div>
            <Row className="d-flex">
              <Col>
                <h6>Add a new experience</h6>
              </Col>
              <Col className="d-fle justify-content-end">
                <div className="d-flex flex-row-reverse mr-3">
                <Button
                  className={classes.btnSave}
                  variant="contained"
                  size="small"
                  type="sumbit"
                  onClick={SubmitWorkExp}
                >
                  Save
                </Button>
                </div>
                
              </Col>
            </Row>
          </div>
          <div>
            <div>
              <lable>Position</lable>
            </div>
            <div>
              <TextField
                className="pr-3 mb-3 mt-2"
                id="position"
                label=""
                variant="outlined"
                placeholder="Enter your position"
                value={workExp.poste || null}
                size="small"
                fullWidth
                onChange={(e) => {
                    e.preventDefault(),
                      setWorkExp({ ...workExp, poste: e.target.value });
                  }}
              />
            </div>
            <div>
              <lable>Company</lable>
            </div>
            <div>
              <TextField
                className="pr-3 mb-3 mt-2"
                
                label=""
                variant="outlined"
                placeholder="Enter the name of the company"
                value={workExp.company || null}
                size="small"
                fullWidth
                onChange={(e) => {
                    e.preventDefault(),
                      setWorkExp({ ...workExp, company: e.target.value });
                  }}
              />
            </div>
            <div>
              <lable>Period</lable>
            </div>
            <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid className="mb-3">
                <Row>
            <Col>
            <KeyboardDatePicker
                id="fromDate"
                name="fromDate"
                margin="normal"
                label="From:"
                format="MM/dd/yyyy"
                value={fromDate}
                onChange={handleFromDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
            </Col>
            <Col>
            <KeyboardDatePicker
                id="toDate"
                name="toDate"
                margin="normal"
                
                label="To:"
                format="MM/dd/yyyy"
                value={toDate}
                onChange={handleToDateChange} 
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
            </Col>
            </Row>
            </Grid>
            </MuiPickersUtilsProvider>

            </div>
            <div>
              <lable>Description</lable>
            </div>
            <div>
            <TextField
                className="pr-3 mb-4 mt-2"
                
                label=""
                variant="outlined"
                value={workExp.description || null}
                placeholder="Write about role and responsabilities..."
                fullWidth
                multiline={true}
                rows={5}
                onChange={(e) => {
                    e.preventDefault(),
                      setWorkExp({ ...workExp, description: e.target.value });
                  }}
              />
          </div>
          
          <Divider variant="middle" />
          <div>
          <WorkExpBlock />
          </div>
          <Divider variant="middle" />
          <div>
            <EditSkillsBlock />
          </div>
          </div>
        </Col>
        
        <Col className="col-5">
          <div className="mt-5 mb-5">
            <h5>Education</h5>
          </div>
          <div>
            <Row className="d-flex">
              <Col>
                <h6>Add a new education or training</h6>
              </Col>
              <Col className="d-fle justify-content-end">
                <div className="d-flex flex-row-reverse mr-3">
                  <Button
                    className={classes.btnSave}
                    variant="contained"
                    size="small"
                    onClick={SubmitNewEducation}
                  >
                    Save
                  </Button>
                </div>
                
              </Col>
            </Row>
          </div>
          <div>
          <div>
              <lable>School</lable>
            </div>
            <div>
              <TextField
                className="pr-3 mb-3 mt-2"
                
                label=""
                variant="outlined"
                placeholder="Enter your school name"
                value={education.school || null} 
                size="small"
                fullWidth
                onChange={(e) => {
                    e.preventDefault(),
                      setEducation({ ...education, school: e.target.value });
                  }} 
              />
            </div>
            <div>
              <lable>Degree</lable>
            </div>
            <div>
              <TextField
                className="pr-3 mb-3 mt-2"
                
                label=""
                variant="outlined"
                placeholder="Enter your degree"
                value={education.degree || null} 
                size="small"
                fullWidth
                onChange={(e) => {
                  e.preventDefault(),
                    setEducation({ ...education, degree: e.target.value });
                }}
              />
            </div>
            <div>
              <lable>Period</lable>
            </div>
            <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid className="mb-3">
                <Row>
            <div className="pr-3 mb-3 mt-2 ml-3">
            <KeyboardDatePicker
                margin="normal"
                id="fromDateEdu"
                label="From:"
                format="MM/dd/yyyy"
                value={fromDateEdu}
                onChange={handleFromDateEduChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
            </div>
            <div className="pr-3 mb-3 mt-2 ml-3">
            <KeyboardDatePicker
                margin="normal"
                id="todateEdu"
                label="To:"
                format="MM/dd/yyyy"
                value={toDateEdu}
                onChange={handleToDateEduChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
            </div>
            </Row>
            </Grid>
            </MuiPickersUtilsProvider>
            </div>
            <div>
              <lable>Description</lable>
            </div>
            <div>
            <TextField
                className="pr-3 mb-4 mt-2"
                id="descr"
                label=""
                variant="outlined"
                value={education.descriptionEdu || null} 
                placeholder="Write about education degree or training..."
                fullWidth
                multiline={true}
                rows={5}
                onChange={(e) => {
                  e.preventDefault(),
                    setEducation({ ...education, descriptionEdu: e.target.value });
                }}
              />
          </div>
          <Divider variant="middle" />
          <div>
            <EDUCATIONSBLOCK />
          </div>
          </div>
        </Col>
      </div>
      
    </Container>
  );
};

export default WorkExp_Education;

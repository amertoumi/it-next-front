import 'date-fns';
import React from "react";
import dynamic from 'next/dynamic';
import jwtDecode from "jwt-decode";
import axios from "axios";
import {API_HOST, API_ADD_WORK_EXP_PATH, API_REMOVE_WORK_EXP_PATH } from "../../API";
import { Container, Row, Col } from "reactstrap";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  
} from '@material-ui/pickers';
const WorkExpBlock = dynamic(()=>import('./workExperienceBlock'));
const EditSkillsBlock= dynamic(()=>import('./EditSkillsBlock'));

const useStyles = makeStyles(theme => ({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1)
      }
    }
}));

const WorkExp_Education = () => {
    const classes = useStyles();
    const token = window.localStorage.getItem("authToken");
    const { id: id_Current_User } = jwtDecode(token);
    const [fromDate, setFromDate] = React.useState(Date.now());
    const [toDate, setToDate] = React.useState(Date.now());
    const [workExp, setWorkExp] = React.useState({
        poste: "",
        company: "",
        description:""
      });

   const handleFromDateChange = (date) => {
    console.log(date);
    setFromDate(date);
  }; 
  const clearFields =()=>{
    setWorkExp({poste:"",company:"", description:""});
  }
   const handleToDateChange = (date) => {
    setToDate(date);
  }; 

  const SubmitWorkExp = () => {
    var formdata = new FormData();
    formdata.append("position", workExp.poste);
    formdata.append("company", workExp.company);
    formdata.append("fromDate", fromDate.toISOString());
    formdata.append("toDate", toDate.toISOString());
    formdata.append("description", workExp.description);

    var url = API_HOST + API_ADD_WORK_EXP_PATH + id_Current_User;
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    fetch(url, requestOptions)
    .then((response) => console.log(response));
    clearFields();
  }

  return (
    <Container>
      <form onSubmit={SubmitWorkExp}>
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
                <Button
                  className="mb-3 ml-5"
                  variant="contained"
                  size="small"
                  style={{ backgroundColor: "green", color: "white" }}
                  type="sumbit" 
                >
                  Save
                </Button>
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
                id="outlined-basic"
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
                id="outlined-basic"
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
                id="date-picker-dialog"
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
                id="outlined-basic"
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
                <Button
                  className="mb-3 ml-5"
                  variant="contained"
                  size="small"
                  style={{ backgroundColor: "green", color: "white" }}
                  /* onClick={SubmitCV} */
                >
                  Save
                </Button>
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
                id="outlined-basic"
                label=""
                variant="outlined"
                placeholder="Enter your school name"
                /* value={workExp.description || null} */
                size="small"
                fullWidth
                /* onChange={(e) => {
                    e.preventDefault(),
                      setCV({ ...workExp, description: e.target.value });
                  }} */
              />
            </div>
            <div>
              <lable>Degree</lable>
            </div>
            <div>
              <TextField
                className="pr-3 mb-3 mt-2"
                id="outlined-basic"
                label=""
                variant="outlined"
                placeholder="Enter your degree"
                /* value={position} */
                size="small"
                fullWidth
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
                id="date-picker-dialog"
                label="From:"
                format="MM/dd/yyyy"
                /* value={selectedDate} 
                onChange={handleDateChange}*/
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
            </div>
            <div className="pr-3 mb-3 mt-2 ml-3">
            <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="To:"
                format="MM/dd/yyyy"
                /* value={selectedDate} 
                onChange={handleDateChange}*/
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
                id="outlined-basic"
                label=""
                variant="outlined"
                /* value={position} */
                placeholder="Write about education degree or training..."
                fullWidth
                multiline={true}
                rows={5}
              />
          </div>
          <Divider variant="middle" />
          
          </div>
        </Col>
      </div>
      </form>
    </Container>
  );
};

export default WorkExp_Education;

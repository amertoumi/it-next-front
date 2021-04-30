import React, { useContext, useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import { API_HOST, API_MISSION_BY_ID, API_EDIT_MISSION } from "../../../API";
import { useRouter } from "next/router";
import Admin from "../../../layouts/Admin";
import { Context as SkillsContext } from "../../../Context/Skills/SkillsContext";
import Axios from "../../../services/axiosServices";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Col, Button } from "reactstrap";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import EditIcon from "@material-ui/icons/Edit";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
const Inspirnautefilter = dynamic(() => import('../../../components/Admin/inspirnauteFilter'));

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

const Mission = () => {
  const classes = useStyles();
  const router = useRouter();
  const {state, FETCH_SKILLS}=useContext(SkillsContext);
  const [mission, setMission] = useState([]);
  const [disable, setDisable] = useState(true);
  //const { FETCH_MISSION_BY_ID } = useContext(RecruiterContext);

  const Edithandler = (event) => {
    setDisable(!disable);
  };
  const handleDateStart = (date) => {
    setMission({ ...mission, dateStart: date });
  };
  const handleDateEnd = (date) => {
    setMission({ ...mission, dateEnd: date });
  };
  //Submit Edited Mission
  const handleSubmit = () => {
    var formdata = new FormData();
    formdata.append("title", mission.title);
    formdata.append("description", mission.description);
    formdata.append("place", mission.place);
    formdata.append("nbrYearExperience", mission.nbrYearsExperience);
    formdata.append("dateStart", mission.dateStart.toString().slice(0, 10));
    formdata.append("dateEnd", mission.dateEnd.toString().slice(0, 10));
    formdata.append("actor", "recruiter");

    const url = API_HOST + API_EDIT_MISSION + mid;

    Axios.post(url, formdata).then((response) => console.log(response));
  };

  //const {state}=useContext(RecruiterContext);
  const { mid } = router.query;

  const FETCH_MISSION_BY_ID = () => {
    const url = API_HOST + API_MISSION_BY_ID + mid;
      Axios.get(url).then((response) => {
        setMission(response.data);
      });
  };

  useEffect(() => {
    FETCH_MISSION_BY_ID();
    FETCH_SKILLS();
  }, []);

//console.log(state.skills)
  return (
    <div className="pt-7">
      <h2 className="text-center"> Edit Mission / Select Inspirnaute</h2>
      <div>
        <div>
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
              onClick={handleSubmit}
            >
              <SaveIcon className="mr-2" />
              Save
            </Button>
          ) : null}
        </div>
      </div>
      <div className="ml-5">
        <form noValidate autoComplete="off">
          <div>
            <div className="d-flex justify-content-center">
              <div className="mr-9">
                <div>
                  <label className={classes.labelInput}>Title</label>
                </div>
                <div>
                  <TextField
                    variant="outlined"
                    className={classes.disabledInput}
                    size="small"
                    disabled={disable}
                    value={mission.title || ""}
                    onChange={(e) => {
                      setMission({ ...mission, title: e.target.value });
                    }}
                  />
                </div>
                <div>
                  <label className={classes.labelInput}>Place</label>
                </div>
                <div>
                  <TextField
                    variant="outlined"
                    className={classes.disabledInput}
                    size="small"
                    disabled={disable}
                    value={mission.place || ""}
                    onChange={(e) => {
                      setMission({ ...mission, place: e.target.value });
                    }}
                  />
                </div>
                <div>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid className="">
                      <KeyboardDatePicker
                        id="fromDate"
                        name="fromDate"
                        margin="normal"
                        label="Date Start:"
                        format="MM/dd/yyyy"
                        value={mission.dateStart}
                        onChange={handleDateStart}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid className="">
                      <KeyboardDatePicker
                        id="toDate"
                        name="toDate"
                        margin="normal"
                        label="Date End:"
                        format="MM/dd/yyyy"
                        value={mission.dateEnd}
                        onChange={handleDateEnd}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </div>
              </div>
              <div className="">
                <div>
                  <label className={classes.labelInput}>Description</label>
                </div>
                <div>
                  <TextField
                    variant="outlined"
                    className={classes.disabledInput}
                    multiline
                    rows={7}
                    fullWidth
                    disabled={disable}
                    value={mission.description || ""}
                    onChange={(e) => {
                      setMission({ ...mission, description: e.target.value });
                    }}
                  />
                </div>
                <div>
                  <label className={classes.labelInput}>Years Experience</label>
                </div>
                <div>
                  <TextField
                    variant="outlined"
                    className={classes.disabledInput}
                    size="small"
                    disabled={disable}
                    value={mission.nbrYearsExperience || ""}
                    onChange={(e) => {
                      setMission({
                        ...mission,
                        nbrYearsExperience: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div>        
       <Inspirnautefilter />
      </div>
    </div>
  );
};
Mission.layout = Admin;

export default Mission;

import React, { useEffect, useState, useContext } from "react";
import { API_HOST, API_ADD_NEW_MISSION } from "../../API";
import Axios from "../../services/axiosServices";
import ls from "local-storage";
import { Context as RecruiterContext } from "../../Context/RecruiterContext/RecruiterContext";
import { Table, Row, Col, Label } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Icon from "@material-ui/core/Icon";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import { MuiPickersUtilsProvider,KeyboardDatePicker } from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > span": {
      margin: theme.spacing(2),
    },
  },
}));

export default function DataTable() {
  const [open, setOpen] = React.useState(false);
  const [openWarning, setOpenWarning] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { state, FETCH_MISSIONS, DELETE_MISSION } = useContext(RecruiterContext);
  const id_Current_User = ls.get("currentUser");
  const [dependency, setDependency] = useState(1);
  const data = state.missions;
  const [dateStart, setDateStart] = React.useState(Date.now());
  const [dateEnd, setDateEnd] = React.useState(Date.now());
  const [mission, setMission] = React.useState({
    title: "",
    description: "",
    place: "",
    nbrYearsExperience: "",
  });
  const handleDateState = (date) => {
    setDateStart(date);
  };
  const handleDateEnd = (date) => {
    setDateEnd(date);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenWarning = () => {
    setOpenWarning(true);
  };
  const handleCloseWarning = () => {
    setOpenWarning(false);
  };
  
  const ClearFields = () => {
    mission.title ="",
    mission.description="",
    mission.place="",
    mission.nbrYearsExperience=""
  }

  useEffect(async () => {
    try {
      FETCH_MISSIONS();
    } catch (error) {
      console.log(error);
    }
  }, [dependency]);

  //Add New Mission
  const handleSubmit = () => {
    var formdata = new FormData();
    formdata.append("title", mission.title);
    formdata.append("description", mission.description);
    formdata.append("place", mission.place);
    formdata.append("nbrYearExperience", mission.nbrYearsExperience);
    formdata.append("dateStart", dateStart.toISOString());
    formdata.append("dateEnd", dateEnd.toISOString());

    const url = API_HOST + API_ADD_NEW_MISSION + id_Current_User;
    Axios.post(url, formdata).then((response) => console.log(response));
    setDependency((prev) => prev + 1);
    ClearFields();
  };

  return (
    <div>
      <div className="mb-3 mr-5 d-flex justify-content-end">
        <Button onClick={handleClickOpen}>
          <div className="d-flex">
            <div>
              <Icon style={{ color: green[500] }}>add_circle</Icon>
            </div>
            <div className="ml-2">New MISSION</div>
          </div>
        </Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Date Debut</th>
            <th>Date Fin</th>
            <th>Lieu</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, key) => {
            return (
              <>
                <tr key={key}>
                  <td>{item.title}</td>
                  <td>{item.dateStartFormat}</td>
                  <td>{item.dateEndFormat}</td>
                  <td>{item.place}</td>
                  <td>
                    <div className="d-flex justify-content-around">
                      <div>
                        <Link
                          href={`/recruiter/mission/${item.id}`}
                          target="_blank"
                        >
                          <Button variant="contained">Details</Button>
                        </Link>
                      </div>
                      <div>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => {
                            handleClickOpenWarning(),
                              DELETE_MISSION(item.id),
                              setDependency((prev) => prev + 1);
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </td>
                </tr>

                <div>
                  <Dialog
                    fullScreen={fullScreen}
                    open={openWarning}
                    onClose={handleCloseWarning}
                    aria-labelledby="responsive-dialog-title"
                  >
                    <DialogTitle id="responsive-dialog-title">
                      <h4>Warning : Remove Mission</h4>
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        <h5>Are you sure?</h5>
                        <p>Confirm to proceed</p>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        autoFocus
                        onClick={handleCloseWarning}
                        color="primary"
                      >
                        Disagree
                      </Button>
                      <Button
                        onClick={() => {
                          handleCloseWarning(),
                            DELETE_MISSION(item.id),
                            setDependency((prev) => prev + 1);
                        }}
                        color="primary"
                        autoFocus
                      >
                        Agree
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </>
            );
          })}
        </tbody>
      </Table>
      {/* Block START Form NEW MISSION */}
      <div>
        <Dialog
          fullWidth
          maxWidth="lg"
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Mission</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Insert informations about your new mission
            </DialogContentText>
            <ValidatorForm
              //onSubmit={this.handleSubmit}
              onError={(errors) => console.log(errors)}
            >
              <div className="d-flex flex-column">
              <div className="d-flex justify-content-lg-around">
                <div>
                  <TextValidator
                    label="Title"
                    name="title"
                    value={mission.title}
                    validators={["required"]}
                    errorMessages={[
                      "this field is required",
                      "title is not valid",
                    ]}
                    onChange={(e) => {
                      setMission({ ...mission, title: e.target.value });
                    }}
                  />
                  <TextValidator
                    label="Place"
                    //onChange={this.handleChange}
                    name="place"
                    value={mission.place}
                    validators={["required"]}
                    errorMessages={[
                      "this field is required",
                      "place is not valid",
                    ]}
                    onChange={(e) => {
                      setMission({ ...mission, place: e.target.value });
                    }}
                  />
                  <TextValidator
                    label="Years of Experience"
                    //onChange={this.handleChange}
                    name="years"
                    value={mission.nbrYearsExperience}
                    validators={["required", "isNumber"]}
                    errorMessages={[
                      "this field is required",
                      "Years of Experience is not valid",
                    ]}
                    onChange={(e) => {
                      setMission({
                        ...mission,
                        nbrYearsExperience: e.target.value,
                      });
                    }}
                  />
                </div>

                <div>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid className="mb-3">
                      <KeyboardDatePicker
                        id="dateStart"
                        name="dateStart"
                        margin="normal"
                        label="Date Start"
                        format="MM/dd/yyyy"
                        value={dateStart}
                        onChange={handleDateState}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid className="mb-3">
                      <KeyboardDatePicker
                        id="dateEnd"
                        name="dateEnd"
                        margin="normal"
                        label="Date End"
                        format="MM/dd/yyyy"
                        value={dateEnd}
                        onChange={handleDateEnd}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </div>
                
              </div>
              <div >
                <Label>Description</Label>
              <TextValidator
                    
                    id="outlined-full-width"
                    variant="outlined"
                    fullWidth
                    size="small"
                    placeholder="Describe your mission here..."
                    value={mission.description}
                    validators={["required"]}
                    errorMessages={[
                      "this field is required",
                      "description is not valid",
                    ]}
                    onChange={(e) => {
                      setMission({ ...mission, description: e.target.value });
                    }}
                  />
              </div>
              </div>
            </ValidatorForm>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleSubmit(), handleClose();
              }}
              color="primary"
            >
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {/* Block END Form NEW MISSION */}
    </div>
  );
}

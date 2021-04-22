import React, { useRef } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Toast } from "primereact/toast";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Container, Row, Col } from "reactstrap";
import Icon from "@material-ui/core/Icon";
import { API_HOST, API_CREATE_ENTREPRISE_PATH } from "../../API";
import {
  Divider,
  FormControl,
  InputLabel,
  Select,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@material-ui/core";
import "./ToastDemo.css";

const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "#137cbd",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  },
});

function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

export default function Client_Form() {
  const [managerName, setManagerName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [entrepriseName, setentrepriseName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [domain, setDomain] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [poste, setPoste] = React.useState("");
  const [recruitEmployee, setRecruitEmployee] = React.useState();
  const [selfEmployed, setSelfEmployed] = React.useState();
  const [independent, setIndependent] = React.useState();
  const [likeIndependent, setLikeIndependent] = React.useState();
  const [remoteConsultant, setRemoteConsultant] = React.useState();
  const [expandTeam, setExpandTeam] = React.useState();
  const [newProject, setNewProject] = React.useState();
  const [hireIng, setHireIng] = React.useState();
  const toast = useRef(null);

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success Message",
      detail: "Inscription Done !!",
      life: 3000,
    });
  };
  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error Message",
      detail: "Inscription Failed",
      life: 3000,
    });
  };

  const clearInput = () => {
    setEmail("");
    setLastName("");
    setPassword("");
    setentrepriseName("");
    setManagerName("");
    setCountry("");
    setDomain("");
    setPhoneNumber("");
    setPoste("");
    setRecruitEmployee();
    setSelfEmployed();
    setIndependent();
    setLikeIndependent();
    setRemoteConsultant();
    setExpandTeam();
    setNewProject();
    setHireIng();
  };

  function handleSubmission(event) {
    event.preventDefault();

    var formdata = new FormData();
    formdata.append("managerName", managerName);
    formdata.append("userName", entrepriseName);
    formdata.append("email", email);
    formdata.append("lastName", lastName);
    formdata.append("phoneNumber", phoneNumber);
    formdata.append("domain", domain);
    formdata.append("password", password);
    formdata.append("poste", poste);
    formdata.append("country", country);
    formdata.append("recruitEmployee", recruitEmployee);
    formdata.append("independent", independent);
    formdata.append("likeIndependent", likeIndependent);
    formdata.append("remoteConsultant", remoteConsultant);
    formdata.append("expandTeam", expandTeam);
    formdata.append("newProject", newProject);
    formdata.append("selfEmployed", selfEmployed);
    formdata.append("hireIng", hireIng);

    var urlApi = API_HOST + API_CREATE_ENTREPRISE_PATH;
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(urlApi, requestOptions).then((response) => {
      if (response.ok) {
        showSuccess();
        clearInput();
      } else {
        showError();
      }
    });
  }
  return (
    <Container>
      <h1 className="text-center mt-5 mb-3">Inscription Recruteur</h1>
      <ValidatorForm onSubmit={handleSubmission}>
        <Row>
          <h5>User Account</h5>
        </Row>
        <Divider variant="middle" className="mb-2" />
        <Row>
          <Col>
            <TextValidator
              id="entrepriseName"
              label="Entreprise Name"
              type="search"
              value={entrepriseName}
              validators={["required"]}
              errorMessages={["Entreprise name is required"]}
              onInput={(e) => setentrepriseName(e.target.value)}
            />
          </Col>
          <Col>
            <TextValidator
              id="email"
              label="Professional Email"
              name="email"
              value={email}
              validators={["required", "isEmail"]}
              errorMessages={["Email is required", "email is not valid"]}
              onInput={(e) => setEmail(e.target.value)}
            />
          </Col>
          <Col>
            <TextValidator
              id="password"
              label="Password"
              type="password"
              value={password}
              validators={["required"]}
              errorMessages={["Password is required"]}
              onInput={(e) => setPassword(e.target.value)}
            />
          </Col>
        </Row>

        <Row>
          <h5 className="mt-4">Personal Informations</h5>
        </Row>
        <Divider variant="middle" className="mb-2" />
        <Row>
          <Col>
            <TextValidator
              id="name"
              label="Name"
              type="search"
              value={managerName}
              validators={["required"]}
              errorMessages={["Name is required"]}
              onInput={(e) => setManagerName(e.target.value)}
            />
          </Col>
          <Col>
            <TextValidator
              label="LastName"
              type="search"
              value={lastName}
              validators={["required"]}
              errorMessages={["Last Name is required"]}
              onInput={(e) => setLastName(e.target.value)}
            />
          </Col>
          <Col>
            <TextValidator
              id="phoneNumber"
              label="Phone Number"
              type="search"
              value={phoneNumber}
              validators={["minNumber:0", "maxNumber:99999999999"]}
              errorMessages={["Phone Number required"]}
              onInput={(e) => setPhoneNumber(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <FormControl>
              <InputLabel htmlFor="age-native-simple">
                Speciality Poste
              </InputLabel>
              <Select
                native
                id="poste"
                value={poste}
                onChange={(e) => setPoste(e.target.value)}
                placeholder=""
                validators={["required"]}
                errorMessages={["Poste required"]}
              >
                <option></option>
                <option value={"dirigeant"}>Je suis dirigeant</option>
                <option value={"responsable"}>
                  Je suis un responsable technique dans mon entreprise
                </option>
                <option value={"Commercial"}>
                  Je suis commercial ou RH dans mon entreprise
                </option>
              </Select>
            </FormControl>
          </Col>
          <Col>
            <TextField
              id="domain"
              label="Domain Activity"
              type="search"
              value={domain}
              onInput={(e) => setDomain(e.target.value)}
              validators={["required"]}
              errorMessages={["domain required"]}
            />
          </Col>
          <Col>
            <TextField
              id="country"
              label="Country"
              type="search"
              value={country}
              onInput={(e) => setCountry(e.target.value)}
              validators={["required"]}
              errorMessages={["Country required"]}
            />
          </Col>
        </Row>
        <Row>
          <h5 className="mt-4">What are you looking for</h5>
        </Row>
        <Divider variant="middle" className="mb-2" />
        <Row>
          <Col>
            <FormControl component="fieldset" className="mt-3">
              <FormLabel component="legend">
                You look to recruit one employee or several employees :
              </FormLabel>
              <RadioGroup
                aria-label="radio_1"
                name="radio_1"
                value={recruitEmployee}
                onChange={(event) => {
                  setRecruitEmployee(event.target.value);
                }}
              >
                <FormControlLabel
                  value="1"
                  control={<StyledRadio />}
                  label="OUI"
                />
                <FormControlLabel
                  value="0"
                  control={<StyledRadio />}
                  label="NON"
                />
              </RadioGroup>
            </FormControl>
          </Col>
          <Col>
            <FormControl component="fieldset" className="mt-3">
              <FormLabel component="legend">
                You look for self-employed or several self-employed :
              </FormLabel>
              <RadioGroup
                aria-label="radio_2"
                name="radio_2"
                value={selfEmployed}
                onChange={(event) => {
                  setSelfEmployed(event.target.value);
                }}
              >
                <FormControlLabel
                  value="1"
                  control={<StyledRadio />}
                  label="OUI"
                />
                <FormControlLabel
                  value="0"
                  control={<StyledRadio />}
                  label="NON"
                />
              </RadioGroup>
            </FormControl>
          </Col>
        </Row>
        <Row>
          <Col className="ml-3">
            <Row>
              <Row>
                <h5 className="mt-4">You have already worked with </h5>
              </Row>
              <Divider variant="middle" className="mb-2" />
            </Row>
            <Row>
              <FormControl component="fieldset" className="mt-3">
                <FormLabel component="legend">Independents :</FormLabel>
                <RadioGroup
                  aria-label="radio_3"
                  name="radio_3"
                  value={independent}
                  onChange={(event) => {
                    setIndependent(event.target.value);
                  }}
                >
                  <FormControlLabel
                    value="1"
                    control={<StyledRadio />}
                    label="OUI"
                  />
                  <FormControlLabel
                    value="0"
                    control={<StyledRadio />}
                    label="NON"
                  />
                </RadioGroup>
              </FormControl>
            </Row>
            <Row>
              <FormControl component="fieldset" className="mt-3">
                <FormLabel component="legend">
                  Independents and you liked :
                </FormLabel>
                <RadioGroup
                  aria-label="radio_4"
                  name="radio_4"
                  value={likeIndependent}
                  onChange={(event) => {
                    setLikeIndependent(event.target.value);
                  }}
                >
                  <FormControlLabel
                    value="1"
                    control={<StyledRadio />}
                    label="OUI"
                  />
                  <FormControlLabel
                    value="0"
                    control={<StyledRadio />}
                    label="NON"
                  />
                </RadioGroup>
              </FormControl>
            </Row>
            <Row>
              <FormControl component="fieldset" className="mt-3">
                <FormLabel component="legend">Remote consultants :</FormLabel>
                <RadioGroup
                  aria-label="radio_5"
                  name="radio_5"
                  value={remoteConsultant}
                  onChange={(event) => {
                    setRemoteConsultant(event.target.value);
                  }}
                >
                  <FormControlLabel
                    value="1"
                    control={<StyledRadio />}
                    label="OUI"
                  />
                  <FormControlLabel
                    value="0"
                    control={<StyledRadio />}
                    label="NON"
                  />
                </RadioGroup>
              </FormControl>
            </Row>
          </Col>
          <Col>
            <Row>
              <h5 className="mt-4">You wish :</h5>
            </Row>
            <Row>
              <FormControl component="fieldset" className="mt-3">
                <FormLabel component="legend">
                  Expand an engineering team or develop an already existing
                  project :
                </FormLabel>
                <RadioGroup
                  aria-label="radio_6"
                  name="radio_6"
                  value={expandTeam}
                  onChange={(event) => {
                    setExpandTeam(event.target.value);
                  }}
                >
                  <FormControlLabel
                    value="1"
                    control={<StyledRadio />}
                    label="OUI"
                  />
                  <FormControlLabel
                    value="0"
                    control={<StyledRadio />}
                    label="NON"
                  />
                </RadioGroup>
              </FormControl>
            </Row>
            <Row>
              <FormControl component="fieldset" className="mt-3">
                <FormLabel component="legend">Start a new project :</FormLabel>
                <RadioGroup
                  aria-label="radio_7"
                  name="radio_7"
                  value={newProject}
                  onChange={(event) => {
                    setNewProject(event.target.value);
                  }}
                >
                  <FormControlLabel
                    value="1"
                    control={<StyledRadio />}
                    label="OUI"
                  />
                  <FormControlLabel
                    value="0"
                    control={<StyledRadio />}
                    label="NON"
                  />
                </RadioGroup>
              </FormControl>
            </Row>
            <Row>
              <FormControl component="fieldset" className="mt-3">
                <FormLabel component="legend">
                  Make your first hire of an engineer :
                </FormLabel>
                <RadioGroup
                  aria-label="radio_8"
                  name="radio_8"
                  value={hireIng}
                  onChange={(event) => {
                    setHireIng(event.target.value);
                  }}
                >
                  <FormControlLabel
                    value="1"
                    control={<StyledRadio />}
                    label="OUI"
                  />
                  <FormControlLabel
                    value="0"
                    control={<StyledRadio />}
                    label="NON"
                  />
                </RadioGroup>
              </FormControl>
            </Row>
          </Col>
        </Row>

        <Row>
          <Button
            className="mt-5 mb-5"
            variant="contained"
            color="primary"
            endIcon={<Icon>send</Icon>}
            type="submit"
          >
            Subscribe
          </Button>

          <Toast ref={toast} />
        </Row>
      </ValidatorForm>
    </Container>
  );
}

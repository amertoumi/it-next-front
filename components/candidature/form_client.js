import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Container, Row, Col } from "reactstrap";
import Icon from "@material-ui/core/Icon";
import {API_HOST, API_CREATE_ENTREPRISE_PATH} from "../../API";
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
import Swal from 'sweetalert2';

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
  const [recruitEmployee, setRecruitEmployee] = React.useState("true");
  const [selfEmployed, setSelfEmployed] = React.useState("true");
  const [independent, setIndependent] = React.useState("true");
  const [likeIndependent, setLikeIndependent] = React.useState("true");
  const [remoteConsultant, setRemoteConsultant] = React.useState("true");
  const [expandTeam, setExpandTeam] = React.useState("true");
  const [newProject, setNewProject] = React.useState("true");
  const [hireIng, setHireIng] = React.useState("true");

  const handle__Recruit_Employee = (event) => {
    setRecruitEmployee(event.target.value);
  };
  const handle__Self_Employed = (event) => {
    setSelfEmployed(event.target.value);
  };
  const handle__Independents = (event) => {
    setIndependent(event.target.value);
  };
  const handle__Like_Independents = (event) => {
    setLikeIndependent(event.target.value);
  };
  const handle__Remote_Cansultants = (event) => {
    setRemoteConsultant(event.target.value);
  };

  const handle__Expand_Team = (event) => {
    setExpandTeam(event.target.value);
  };
  const handle__New_Project = (event) => {
    setNewProject(event.target.value);
  };
  const handle__Embauche_Ing = (event) => {
    setHireIng(event.target.value);
  };

  function SuccessAccus() {
    Swal.fire({
      title: 'Success!',
      text: 'Thanks :) Your registration is Done, we will return you asap!!',
      icon: 'success',
      confirmButtonText: 'Cool'
    })
  }
  
  function ErrorAccus() {
    Swal.fire({
      title: 'Error !!',
      text: 'Oups :/ There is an error in your inserted data, do you want to try again',
      icon: 'error',
      confirmButtonText: 'Try Again'
    })
  }

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
    
    var urlApi= API_HOST+API_CREATE_ENTREPRISE_PATH
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
      
    };
    try {
      fetch(urlApi, requestOptions)
      .then((response) => response)
      SuccessAccus();
    } catch (error) {
      ErrorAccus()
    }  
   
  }
  return (
    <Container>
      <h1 className="text-center mt-5 mb-3">Inscription Recruteur</h1>
      <form noValidate autoComplete="off" onSubmit={handleSubmission}>
        <Row>
          <h5>User Account</h5>
        </Row>
        <Divider variant="middle" className="mb-2" />
        <Row>
          <Col>
            <TextField
              id="entrepriseName"
              label="Entreprise Name"
              type="search"
              value={entrepriseName}
              required
              onInput={(e) => setentrepriseName(e.target.value)}
            />
          </Col>
          <Col>
            <TextField
              id="email"
              label="Professional Email"
              type="search"
              value={email}
              required
              onInput={(e) => setEmail(e.target.value)}
            />
          </Col>
          <Col>
            <TextField
              id="password"
              label="Password"
              type="password"
              value={password}
              required
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
            <TextField
              id="name"
              label="Name"
              type="search"
              value={managerName}
              onInput={(e) => setManagerName(e.target.value)}
            />
          </Col>
          <Col>
            <TextField
              label="LastName"
              type="search"
              value={lastName}
              onInput={(e) => setLastName(e.target.value)}
            />
          </Col>
          <Col>
            <TextField
              id="phoneNumber"
              label="Phone Number"
              type="search"
              value={phoneNumber}
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
            />
          </Col>
          <Col>
            <TextField
              id="country"
              label="Country"
              type="search"
              value={country}
              onInput={(e) => setCountry(e.target.value)}
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
                onChange={handle__Recruit_Employee}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio id="rd1" />}
                  label="OUI"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio id="rd2" />}
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
                onChange={handle__Self_Employed}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio id="rd3" />}
                  label="OUI"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio id="rd4" />}
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
                  onChange={handle__Independents}
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio id="rd5" />}
                    label="OUI"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio id="rd6" />}
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
                  onChange={handle__Like_Independents}
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio id="rd7" />}
                    label="OUI"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio id="rd8" />}
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
                  onChange={handle__Remote_Cansultants}
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio id="rd9" />}
                    label="OUI"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio id="rd10" />}
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
                  onChange={handle__Expand_Team}
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio id="rd11" />}
                    label="OUI"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio id="rd12" />}
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
                  onChange={handle__New_Project}
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio id="rd13" />}
                    label="OUI"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio id="rd14" />}
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
                  onChange={handle__Embauche_Ing}
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio id="rd15" />}
                    label="OUI"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio id="rd16" />}
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
        </Row>
      </form>
    </Container>
  );
}

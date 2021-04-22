import React, { useRef } from "react";
import axios from "axios";
import { API_HOST, API_SKILLS_PATH, API_UPLOAD_FORM_FILE } from "../../API";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Toast } from "primereact/toast";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Container, Row, Col } from "reactstrap";
import { Divider } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./ToastDemo.css";

export default function Inspirenaute_Form() {
  const [isActive, setIsActive] = React.useState(false);
  const [category, setCategory] = React.useState("Freelancer");
  const [type, setType] = React.useState("cv");
  const [name, setName] = React.useState("");
  const [lastname, setLastName] = React.useState("");
  const [username, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [city, setCity] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [poste, setPoste] = React.useState("");
  const [mySkills, setMySkills] = React.useState([]);
  const [otherSkills, setOtherSkills] = React.useState("");
  const [tarif, setTarif] = React.useState("");
  const [nbrAnneeExp, setNbrAnneeExp] = React.useState();
  const [listSkills, setSkills] = React.useState([]);
  const [selectedFile, setSelectedFile] = React.useState(null);
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
  // get list of skills
  React.useEffect(() => {
    let URL = API_HOST + API_SKILLS_PATH;
    axios
      .get(URL)
      .then((response) => response.data["hydra:member"])
      .then((data) => setSkills(data))
      .catch((error) => console.log(error.response));
  }, []);

  function handleSubmission(event) {
    event.preventDefault();
    var formdata = new FormData();
    formdata.append("File", selectedFile);
    formdata.append("type", "cv");
    formdata.append("username", name);
    formdata.append("lastname", lastname);
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("phone", phone);
    formdata.append("country", country);
    formdata.append("city", city);
    formdata.append("address", address);
    formdata.append("poste", poste);
    formdata.append("nbr_annee_exp", nbrAnneeExp);
    formdata.append("tarif", tarif);
    formdata.append("mySkills", mySkills);
    formdata.append("category", category);
    formdata.append("otherSkills", otherSkills);
    var url = API_HOST + API_UPLOAD_FORM_FILE;
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    if (selectedFile) {
      fetch(url, requestOptions).then((response) => {
        if (response.ok) {
          showSuccess();
        } else {
          showError();
        }
      });
    }
  }

  return (
    <Container>
      <h1 className="text-center mt-5 mb-3">Inscription Inspirnaute</h1>

      <ValidatorForm onSubmit={handleSubmission}>
        <Row>
          <h5>User Account</h5>
        </Row>
        <Divider variant="middle" className="mb-2" />
        <Row>
          <Col>
            <TextValidator
              id="username"
              label="Username"
              type="search"
              value={username}
              validators={["required"]}
              errorMessages={["username is required"]}
              onInput={(e) => setUserName(e.target.value)}
            />
          </Col>
          <Col>
            <TextValidator
              id="email"
              label="Email"
              type="search"
              value={email}
              validators={["required", "isEmail"]}
              errorMessages={["email is required"]}
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
          <input id="isActive" type="hidden" value={isActive} />
          <input id="category" type="hidden" value={category} />
          <input id="type" type="hidden" value={type} />
          <Col>
            <TextValidator
              id="name"
              label="Name"
              type="search"
              value={name}
              validators={["required"]}
              errorMessages={["name is required"]}
              onInput={(e) => setName(e.target.value)}
            />
          </Col>
          <Col>
            <TextValidator
              id="lastname"
              label="Last Name"
              type="search"
              value={lastname}
              validators={["required"]}
              errorMessages={["last name is required"]}
              onInput={(e) => setLastName(e.target.value)}
            />
          </Col>
          <Col>
            <TextValidator
              id="phone"
              label="Phone Number"
              type="search"
              value={phone}
              validators={["minNumber:0", "maxNumber:99999999999"]}
              errorMessages={["Phone Number required"]}
              onInput={(e) => setPhone(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <TextValidator
              id="country"
              label="Country"
              type="search"
              value={country}
              validators={["required"]}
              errorMessages={["Country required"]}
              onInput={(e) => setCountry(e.target.value)}
            />
          </Col>
          <Col>
            <TextValidator
              id="city"
              label="City"
              type="search"
              value={city}
              validators={["required"]}
              errorMessages={["city required"]}
              onInput={(e) => setCity(e.target.value)}
            />
          </Col>
          <Col>
            <TextValidator
              id="address"
              label="Address"
              type="search"
              value={address}
              validators={["required"]}
              errorMessages={["Address required"]}
              onInput={(e) => setAddress(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <h5 className="mt-4">Skills</h5>
        </Row>
        <Divider variant="middle" className="mb-2" />
        <Row>
          <Col>
            <TextValidator
              id="poste"
              label="Poste"
              type="search"
              value={poste}
              validators={["required"]}
              errorMessages={["poste is required"]}
              onInput={(e) => setPoste(e.target.value)}
            />
          </Col>
          <Col>
            <TextValidator
              id="nbrAnneeExp"
              label="Years of Expérience"
              type="number"
              value={nbrAnneeExp}
              validators={["required"]}
              errorMessages={["years of Experience is required"]}
              onInput={(e) => setNbrAnneeExp(e.target.value)}
            />
          </Col>
          <Col>
            <TextValidator
              id="tarif"
              label="Tarif"
              type="search"
              value={tarif}
              validators={["required"]}
              errorMessages={["tarif is required"]}
              onInput={(e) => setTarif(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Autocomplete
              multiple
              id="mySkills"
              size="small"
              options={listSkills.map((option) => option.name)}
              onChange={(event, newValue) => {
                setMySkills([
                  ...mySkills,
                  ...newValue.filter(
                    (option) => mySkills.indexOf(option) === -1
                  ),
                ]);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  id="mySkills"
                  label="My Skills"
                  placeholder="Favorites"
                  value={mySkills}
                />
              )}
            />
          </Col>
          <Col>
            <TextValidator
              id="otherSkills"
              label="Other Skills"
              type="Multiline"
              value={otherSkills}
              onInput={(e) => setOtherSkills(e.target.value)}
            />
          </Col>
          <Col>
            <Button className="mt-3" component="label">
              <span className="mr-3">CV</span>
              <input
                type="file"
                name="file"
                id="file"
                inputProps={{
                  accept: "application/pdf,application/vnd.ms-excel",
                }}
                onChange={(e) => {
                  setSelectedFile(e.target.files[0]);
                }}
              />
            </Button>
          </Col>
        </Row>
        <Row>
          <Button
            className="mt-5"
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

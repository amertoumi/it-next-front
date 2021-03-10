import React from "react";
import axios from "axios";
import { API_HOST, API_SKILLS_PATH } from "../../API";
import Api from "../../pages/api";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Container, Row, Col } from "reactstrap";
import { Input, Divider } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import Autocomplete from "@material-ui/lab/Autocomplete";

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
  const [error, setError] = React.useState("");

  // get list of skills
  React.useEffect(() => {
    let URL = API_HOST + API_SKILLS_PATH;
    axios
      .get(URL)
      //.then((response)=>console.log(response.data["hydra:member"]))
      .then((response) => response.data["hydra:member"])
      .then((data) => setSkills(data))
      .catch((error) => console.log(error.response));
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const dataUser = { username, email, password, isActive };
    const dataProfil = {
      isActive,
      category,
      username,
      email,
      name,
      lastname,
      country,
      city,
      address,
      phone,
      poste,
      mySkills,
      otherSkills,
      tarif,
      nbrAnneeExp,
    };

    Api.CreateNewProfil(dataProfil);
    Api.CreateNewUser(dataUser);
  }

  function handleSubmission() {
    var formdata = new FormData();
    formdata.append("File", selectedFile);
    formdata.append("type", "cv");
    //formdata.append("isActive",  false);
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
    formdata.append("category", category);
    //formdata.append("mySkills", mySkills);
    formdata.append("otherSkills", otherSkills);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    if (selectedFile) {
      fetch("http://localhost:8000/api/file/manager", requestOptions)
        .then((response) => response)
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    } else {
      console.log("Please select a file");
    }
  }

  return (
    <Container>
      <h1 className="text-center mt-5 mb-3">Inscription Inspirnaute</h1>
      <form
        noValidate
        autoComplete="off"
        /* onSubmit={handleSubmit}*/
        onSubmit={handleSubmission}
      >
        <Row>
          <h2>User Account</h2>
        </Row>
        <Divider variant="middle" className="mb-2" />
        <Row>
          <Col>
            <TextField
              id="username"
              label="Username"
              type="search"
              value={username}
              required
              onInput={(e) => setUserName(e.target.value)}
            />
          </Col>
          <Col>
            <TextField
              id="email"
              label="Email"
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
          <h2 className="mt-4">Personal Informations</h2>
        </Row>
        <Divider variant="middle" className="mb-2" />
        <Row>
          <input id="isActive" type="hidden" value={isActive} />
          <input id="category" type="hidden" value={category} />
          <input id="type" type="hidden" value={type} />
          <Col>
            <TextField
              id="name"
              label="Name"
              type="search"
              value={name}
              onInput={(e) => setName(e.target.value)}
            />
          </Col>
          <Col>
            <TextField
              id="lastname"
              label="LastName"
              type="search"
              value={lastname}
              onInput={(e) => setLastName(e.target.value)}
            />
          </Col>
          <Col>
            <TextField
              id="phone"
              label="Phone Number"
              type="search"
              value={phone}
              onInput={(e) => setPhone(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <TextField
              id="country"
              label="Country"
              type="search"
              value={country}
              onInput={(e) => setCountry(e.target.value)}
            />
          </Col>
          <Col>
            <TextField
              id="city"
              label="City"
              type="search"
              value={city}
              onInput={(e) => setCity(e.target.value)}
            />
          </Col>
          <Col>
            <TextField
              id="address"
              label="Address"
              type="search"
              value={address}
              onInput={(e) => setAddress(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <h2 className="mt-4">Skills</h2>
        </Row>
        <Divider variant="middle" className="mb-2" />
        <Row>
          <Col>
            <TextField
              id="poste"
              label="Poste"
              type="search"
              value={poste}
              onInput={(e) => setPoste(e.target.value)}
            />
          </Col>
          <Col>
            <TextField
              id="nbrAnneeExp"
              label="Years of Expérience"
              type="number"
              value={nbrAnneeExp}
              onInput={(e) => setNbrAnneeExp(e.target.value)}
            />
          </Col>
          <Col>
            <TextField
              id="tarif"
              label="Tarif"
              type="search"
              value={tarif}
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
              onChange={(e, value) => setMySkills(value)}
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
            <TextField
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
                /* inputProps={{
                accept: "application/pdf,application/vnd.ms-excel",
              }} */
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
        </Row>
      </form>
    </Container>
  );
}

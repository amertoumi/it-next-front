import React from "react";
import axios from "axios";
import { API_HOST, API_SKILLS_PATH } from "../../API";
import Api from "../../pages/api";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Container, Row } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  button: {
    marginTop: "20px",
  },
}));

export default function Inspirenaute_Form() {
  const classes = useStyles();
  const [isActive, setIsActive] = React.useState(false);
  const [name, setName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [username, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [city, setCity] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [poste, setPoste] = React.useState("");
  const [mySkills, setMySkills] = React.useState("");
  const [otherSkills, setOtherSkills] = React.useState("");
  const [tarif, setTarif] = React.useState("");
  const [nbrAnneeExp, setNbrAnneeExp] = React.useState();

  function handleSubmit(event) {
    event.preventDefault();
    const dataUser = { username, email, password };
    const dataProfil = {
      isActive,
      username,
      email,
      password,
      name,
      lastName,
      country,
      city,
      address,
      phone,
      poste,
      mySkills,
      otherSkills,
      tarif,
      nbrAnneeExp,
    }
    
    Api.CreateNewProfil(dataProfil);
    Api.CreateNewUser(dataUser);
   // console.log("Profil created with success");
  }

  return (
    <Container>
      <h2>Inscription Inspirnaute</h2>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Row>
          <input type="hidden" value={isActive} onInput={(e) => setIsActive()}/>
          <TextField
            id="name"
            label="Name"
            type="search"
            value={name}
            onInput={(e) => setName(e.target.value)}
          />
          <TextField
            id="lastName"
            label="LastName"
            type="search"
            value={lastName}
            onInput={(e) => setLastName(e.target.value)}
          />
        </Row>
        <Row>
          <TextField
            id="username"
            label="Username"
            type="search"
            value={username}
            onInput={(e) => setUserName(e.target.value)}
          />
          <TextField
            id="email"
            label="Email"
            type="search"
            value={email}
            onInput={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            value={password}
            onInput={(e) => setPassword(e.target.value)}
          />
        </Row>
        <Row>
          <TextField
            id="country"
            label="Country"
            type="search"
            value={country}
            onInput={(e) => setCountry(e.target.value)}
          />
          <TextField
            id="city"
            label="City"
            type="search"
            value={city}
            onInput={(e) => setCity(e.target.value)}
          />
          <TextField
            id="address"
            label="Address"
            type="search"
            value={address}
            onInput={(e) => setAddress(e.target.value)}
          />
        </Row>
        <Row>
          <TextField
            id="phone"
            label="Phone Number"
            type="search"
            value={phone}
            onInput={(e) => setPhone(e.target.value)}
          />
          <TextField
            id="poste"
            label="Poste"
            type="search"
            value={poste}
            onInput={(e) => setPoste(e.target.value)}
          />
          <TextField
            id="number_annee_exp"
            label="Number Years of Expérience"
            type="number"
            value={nbrAnneeExp}
            onInput={(e) => setNbrAnneeExp(e.target.value)}
          />
        </Row>
        <Row>
          <TextField
            id="mySkills"
            label="mySkills"
            type="search"
            value={mySkills}
            onInput={(e) => setMySkills(e.target.value)}
          />
          <TextField
            id="otherSkills"
            label="Other Skills"
            type="Multiline"
            value={otherSkills}
            onInput={(e) => setOtherSkills(e.target.value)}
          />
          <TextField
            id="tarif"
            label="Tarif"
            type="search"
            value={tarif}
            onInput={(e) => setTarif(e.target.value)}
          />
        </Row>
        <Row>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            endIcon={<Icon>send</Icon>}
            type="submit"
          >
            Send
          </Button>
        </Row>
      </form>
    </Container>
  );
}

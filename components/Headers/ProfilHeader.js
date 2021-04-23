import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { API_HOST, API_UPLOAD_LOGO } from "../../API";
import { Context as UserContext } from "../../Context/UserContext/UserContext";
import Link from "next/link";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Typography from "@material-ui/core/Typography";
import { Container, Row, Col } from "reactstrap";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Axios from "../../services/axiosServices";

import "./profilHeader.css";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  root1: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  media: {
    height: 140,
  },
  textWhite: {
    color: "#FFFFFF",
  },
}));

function ProfilHeader() {
  const { FetchCurrentUser, state } = useContext(UserContext);
  const profil = state?.CurrentUser;
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = React.useState(null);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    FetchCurrentUser();
  }, []);

  const UploadLogo = () => {
    var formdata = new FormData();
    formdata.append("File", selectedFile);
    formdata.append("type", "logo");

    var url = API_HOST + API_UPLOAD_LOGO;

    if (selectedFile) {
      Axios.post(url, formdata).then((response) => response);
      //SuccessAccus();
    } else {
      console.log("error");
      //ErrorAccus();
    }
  };
console.log(selectedFile)
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundImage: "url(" + require("assets/bg/bgHeader.png") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <span
          className="mask bg-gradient-default opacity-8"
          style={{ zIndex: "-1" }}
        />

        <Container fluid>
          <div>
            <div className="row allBlock">
              <div
                className={classes.textWhite}
                className="col col-lg-6 col-sm-6 col-md-12 d-flex mr-5 mb-3"
              >
                <div className="firstBlock carBorder">
                  <Col>
                    <div>
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <div className="text-center mt-3">
                          <img
                            alt="..."
                            className="rounded-circle"
                            height="140px"
                            width="140px"
                            src={require("assets/img/theme/team-4-800x800.jpg")}
                          />
                        </div>
                      </a>
                    </div>
                  </Col>
                  <Col>
                    <Typography
                      gutterBottom
                      variant="h5"
                      className={classes.textWhite}
                    >
                      {profil?.name} {profil?.lastName}
                    </Typography>
                    <Typography gutterBottom className={classes.textWhite}>
                      <span> {profil?.poste} </span> ({profil?.nbrAnneeExp}{" "}
                      years of experience)
                    </Typography>

                    <Typography variant="body2" color="textSecondary">
                      <div className="txt">
                        Landing Place: {profil?.country},{profil?.city}
                      </div>
                    </Typography>
                        <div className="d-flex">
                        <div className="txt mt-3 d-flex"> 
                        <label className="labelCamera" htmlFor="icon-button-file" onClick={handleClickOpen}>
                          <IconButton style={{color:'#8C89AB'}} aria-label="upload picture" component="span">
                            <PhotoCamera /> 
                            <div className="txtCamera ml-2">
                            change your profile picture
                          </div>
                          </IconButton>
                        </label>
                        </div>
                        
                        </div>
                   
                  </Col>
                </div>
              </div>
              <div
                className={classes.textWhite}
                className="col-lg-3 col-sm-6 col-md-12  mr-3 mb-3 carBorder divButton"
              >
                <div>
                <Col className="text-center">
                  <Link href="/profil/view_cv">
                    <Button className={classes.textWhite}>
                      <i class="far fa-user mr-4"></i>
                      View resume{" "}
                      <i className="fas fa-arrow-alt-circle-right ml-3"></i>
                    </Button>
                  </Link>
                </Col>
                <hr className="new1"></hr>
                <Col className="text-center">
                  <Link href="/profil/edit_cv">
                    <Button className={classes.textWhite}>
                      <i className="fas fa-pen mr-4"></i>Edit resume{" "}
                      <i className="fas fa-arrow-alt-circle-right ml-3"></i>
                    </Button>
                  </Link>
                </Col>
                </div>
              </div>
              <div
                className={classes.textWhite}
                className="col-lg-3 col-sm-12 col-md-12 mb-3 carBorder divButton"
              >
                <div className="txt">
                  Complete your profile and <br />
                  keep it updated
                </div>
                <div className="mt-3">
                  <CardContent>
                    <Typography gutterBottom variant="h4">
                      <span className={classes.textWhite}>80 %</span>
                    </Typography>
                    <div class="progress">
                      <div
                        class="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: "80%", color: "green" }} //progress value
                        aria-valuenow="0"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </CardContent>
                </div>
              </div>
            </div>
          </div>
           {/* Start Block modal upload picture */}
          <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Mettre à jour la photo de profil"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={(e) => {
          setSelectedFile(e.target.files[0]);
        }}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="" component="span">
        <IconButton color="primary" aria-label="upload picture" component="span" size="small">
          <PhotoCamera />
        </IconButton>
        Importer une photo
        </Button>
      </label>
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
      {/* End Block modal upload picture */}
        </Container>
      </div>
    </>
  );
}

export default ProfilHeader;

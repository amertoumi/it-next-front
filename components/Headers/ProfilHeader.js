import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { API_HOST, API_UPLOAD_LOGO } from "../../API";
import { Context as UserContext } from "../../Context/UserContext/UserContext";
import Link from "next/link";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Container, Row, Col } from "reactstrap";
import Axios from "../../services/axiosServices";
import "./profilHeader.css";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  textWhite: {
    color: "#FFFFFF",
  },
});

function ProfilHeader() {
  const { FetchCurrentUser, state } = useContext(UserContext);
  const profil = state?.CurrentUser;
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = React.useState(null);

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
            <div class="d-flex justify-content-around">
              <div className={classes.textWhite} className="carBorder mr-3">
                <div className="firstBlock">
                  <div>
                    <div>
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <div className="pt-4 pl-5 mr-5">
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
                  </div>
                  <div>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      className={classes.textWhite}
                    >
                      {profil?.name} {profil?.lastName}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h2"
                      className={classes.textWhite}
                    >
                      {profil?.poste}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h8"
                      component="h6"
                      className={classes.textWhite}
                    >
                      ({profil?.nbrAnneeExp} years of experience)
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      className={classes.textWhite}
                    >
                      Place: {profil?.country},{profil?.city}
                    </Typography>
                    <div>
                      <div>
                        <label
                          for="files"
                          type="files"
                          className="btn ml-3"
                          onClick={UploadLogo}
                          className={classes.textWhite}
                        >
                          <i className="fas fa-save"></i>
                        </label>
                        <label htmlFor="file">
                          <i
                            class="far fa-camera"
                            className={classes.textWhite}
                          ></i>
                        </label>
                        <input
                          id="file"
                          type="file"
                          name="file"
                          style={{ visibility: "hidden" }}
                          onChange={(e) => {
                            setSelectedFile(e.target.files[0]);
                          }}
                        ></input>

                        <div className={classes.textWhite}>
                          Change your picture
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={classes.textWhite} className="carBorder mr-3 pr-3 pl-3">
                <div className="divButton">
                  <div className="mt-3">
                    <Link href="/profil/view_cv">
                      <Button className={classes.textWhite}>
                        <i className="far fa-profil mr-4 "></i>
                        View Resume{" "}
                        <i className="fas fa-arrow-alt-circle-right ml-3"></i>
                      </Button>
                    </Link>
                    <hr></hr>
                  </div>
                  <div className="mb-3">
                    <Link href="/profil/edit_cv">
                      <Button className={classes.textWhite}>
                        <i className="fas fa-pen mr-4"></i>Edit Resume{" "}
                        <i className="fas fa-arrow-alt-circle-right ml-3"></i>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              <div
                className={classes.textWhite}
                className="carBorder divButton pr-3 pl-3"
              >
                <div>
                  <p className={classes.textWhite}>
                    Complete your profile
                    <br /> and keep it updated
                  </p>
                </div>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    className="text-center"
                  >
                    <span className={classes.textWhite}>80 %</span>
                  </Typography>
                </CardContent>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default ProfilHeader;

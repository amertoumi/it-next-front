import React from "react";
import dynamic from "next/dynamic";
import "./css/cv.css";

const EditHeaderCv = dynamic(()=> import('../../components/Form/EditHeaderCv'));

import { Label, Row, Col } from "reactstrap";
import User from "../../layouts/User";
import { API_DETAILS_USER, API_HOST, API_PROFIL_DETAILS } from "../../API";
import {Axios} from "../../services/authApi";
import ls from "local-storage";

function ViewCV() {
  const token = ls.get("token");
  const id_curent_user = ls.get("currentUser");
  const [description, setDescription] = React.useState("");
  const [startAt, setStartAt] = React.useState("");
  const [finishAt, setFinishAt] = React.useState("");
  const [CurrentUser, setCurrentUser] = React.useState([]);
  const { format } = require("date-fns");

  React.useEffect(() => {

    const id_curent_user = ls.get("currentUser");
    var URL = API_HOST + API_DETAILS_USER + id_curent_user;

    Axios.get(URL)
      .then((response) => response)
      .then((response) => setCurrentUser(response.data["details"]))
      .catch((error) => console.log(error.response));
  }, []);

  return (
    <>
      <EditHeaderCv />
      <div className="m-6">
        <Row>
          <Col className="col-8">
            <Label className="title m-4">WORK EXPERIENCE</Label>
            <ul className="timeline">
              {CurrentUser.experiences?.map((el) => (
                <li>
                  <h6>{el.poste}</h6>
                  <span className="small text-gray">
                    <i className="fa  fa-calendar-alt m-2" />
                    {format(new Date(el.fromDateFormat), "dd MMMM yyyy")} -{" "}
                    {format(new Date(el.toDateFormat), "dd MMMM yyyy")}
                  </span>
                  <p>{el.description}</p>
                </li>
              ))}
            </ul>
            <Label className="title m-4">LANGUAGES</Label>
            <div className="ml-4">
              {CurrentUser.langues?.map((el) => (
                <label className="skills_name" style={{ paddingRight: "1rem" }}>
                  <b> {el.libelle} : </b>{" "}
                  {el.criteriaLangues.map((el) => (
                    <label
                      className="skills_name"
                      style={{ paddingRight: "1rem" }}
                    >
                      {" "}
                      {el.libelle}{" "}
                    </label>
                  ))}{" "}
                </label>
              ))}
            </div>
          </Col>
          <Col className="col-4">
            <Label className="title mb-5 mt-4">EDUCATION</Label>
            {CurrentUser.educations?.map((el) => (
              <div>
                <h6>{el.degree}</h6>
                <p className="title2">{el.school}</p>
                <span className="small text-gray">
                  <i className="fa  fa-calendar-alt m-2" />
                  {format(new Date(el.fromDateEdu), "dd MMMM yyyy")} -{" "}
                  {format(new Date(el.toDateEdu), "dd MMMM yyyy")}
                </span>
                <p>{el.descriptionEdu}</p>
              </div>
            ))}
            <Label className="title mt-4 mb-4">SKILLS</Label>
            <div>
              {CurrentUser.typeskills?.map((el) => (
                <div>
                  <p>
                    <b className="skills_type mt-2 mb-2">{el.type} :</b>
                  </p>
                  {el.items.map((el) => (
                    <label
                      className="skills_name"
                      style={{ paddingRight: "1rem" }}
                    >
                      {" "}
                      {el}{" "}
                    </label>
                  ))}
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

ViewCV.layout = User;

export default ViewCV;

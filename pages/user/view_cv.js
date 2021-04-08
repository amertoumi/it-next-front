import React from "react";
import dynamic from "next/dynamic";
import "./css/cv.css";

const EditHeaderCv = dynamic(()=> import('../../components/Form/EditHeaderCv'));

import { Label, Row, Col } from "reactstrap";
import jwtDecode from "jwt-decode";
import User from "../../layouts/User";
import { API_DETAILS_USER, API_HOST, API_PROFIL_DETAILS } from "../../API";
import axios from "axios";

function ViewCV() {
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2MTcwMjU2MzIsImV4cCI6MTYxNzAyOTIzMiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiTWFoZGkiLCJpZCI6Mn0.pPDGgsJwep_Kwx8f5UrWsDlhpOAWIW7TjHsAaBDAy7KidnRyJiqNUW8g0wBiUKUol8OUtqGeP7O2La9nLRdt38nwlQ3HIQoZfa0oBfcV5lnYhnFiKWuQMm78Bvc_49wTX8kG8_t3IQwHtjNarw9MaEzeki86YUDiaf8J8E4FrsWRD3PugIQEaUIv1frE3wLJzTnMbYXLefcBWFIAASXZjAGaXGZ94gLp5F5RH7nDlxsFv_k0lA7Lph-RffpHknLWk1U_21WG8TS40p8ZhxxgPJSsWNz15UioY_dOlKXeLo1E1MW89nRS0mx8eX77szveTwWSvJ1JQG4yv98m95P4K2lwdF3mrilYiMU4pl84tFrAmAPIn4FcG4A6awB_k_eDQlZwr4BZw2CH8dWmxdonGZYNP6w9i-SL2ZTDOVerutcbwQXq481LLqqAL93tvroU_mHROYUfSqVDJFSsuRKeYnjnLb4gHjN_IDP-M7AxVytXr8c_sqFeASWpigKiANjTP0fwhmmhUjf434taIddivIpEhg9kg8S6pi1Q9bIaBT7ZCXEKxQK8TnHut1ThTKI7I6mD9p4cC0wPoZgMB9aVEv6A_VPkyu6AkUZQqjZQUb5YPC7rCN38JJU7XAhzljH3JEiGZHw8IC0p6FcHO3DZP4Kksf5OjoRl1xWsM2jM2kY";
  const { id: id_curent_user } = jwtDecode(token);
  const [description, setDescription] = React.useState("");
  const [startAt, setStartAt] = React.useState("");
  const [finishAt, setFinishAt] = React.useState("");
  const [CurrentUser, setCurrentUser] = React.useState([]);
  const { format } = require("date-fns");

  function SuccessAccus() {
    Swal.fire({
      title: "Success!!",
      text: "Done, your data is inserted :)",
      icon: "success",
      confirmButtonText: "Cool",
    });
  }
  function ErrorAccus() {
    Swal.fire({
      title: "Error !!",
      text: "Oups :/ Cannot add data",
      icon: "error",
      confirmButtonText: "Try Again",
    });
  }

  React.useEffect(() => {
    //console.log(id_Current_User)

    const token = window.localStorage.getItem("authToken");
    const infos = jwtDecode(token);
    const { id: id_Current_User } = jwtDecode(token);
    var URL = API_HOST + API_DETAILS_USER + id_Current_User;
    var config = {
      method: "get",
      url: URL,
      headers: {},
    };

    axios(config)
      .then((response) => response)
      .then((response) => setCurrentUser(response.data["details"]))
      .catch((error) => console.log(error.response));
  }, []);
  console.log(CurrentUser);
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

import React, { useEffect, useState } from "react";
import { API_HOST, API_STATUS_Skills_PATH, API_TYPE_SKILLS_PATH, API_UPDATE_SKILLS } from "../../API";
import dynamic from "next/dynamic";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { Container, Row, Col, Button } from "reactstrap";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  btnSave : {
    color: '#0F1447',
      backgroundColor: 'white',
      width: '120px',
      height: '38px',
      border: '2px solid #0F1447',
      borderRadius: '30px',
      opacity: 1,
  }
}));

const EditSkillsBlock = () => {
  const classes = useStyles();
  const token = window.localStorage.getItem("authToken");
  const { id: id_Current_User } = jwtDecode(token);
  const [typeSkills, setTypeskills] = useState([]);
  const [listSkills, setListSkills] = useState([]);
  const [checked, setChecked] = useState();
  
  //list profil skills from db && type skills
  useEffect(() => {
    var URL = API_HOST + API_STATUS_Skills_PATH + id_Current_User
    var URL_TYPE = API_HOST + API_TYPE_SKILLS_PATH
    axios
      .get(URL)
      .then((response) => setListSkills(response.data));
    axios
      .get(URL_TYPE)
      .then((response) => setTypeskills(response.data["hydra:member"]));
  }, []);

  //Submit updated skills
  const SubmitEditSkills = () => {
    var URL = API_HOST + API_UPDATE_SKILLS + id_Current_User
    var formdata = new FormData();
    let sk = []
    listSkills.map((skill)=> {
      return(
        (skill.status==true) && sk.push(skill.id_skill)
      )
    })
    //console.log(sk)
    formdata.append("newSkills", sk);
     var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    fetch(URL, requestOptions)
    .then((response) => console.log(response));
    
  }
  
  return (
    <React.Fragment>
      <Container>
      <div className="mt-3 mb-3">
            <h5>SKILLS</h5>
          </div>
      <div className="mt-5">
        {
          typeSkills.map((type)=> {
              return (
                <div key={type.id}>
                <h6 > {type.name}</h6>
                <div className="d-flex justify-content-between">
                {listSkills.map((skill, index) => {
                   return (
                    (skill.type == type.name)&& 
                    <div className="col mt-3 mb-2">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={skill.status}
                            name={skill.name}
                            onChange={(e) => {
                              let item = [...listSkills]
                              item[index]= {...listSkills[index], status:!skill.status}
                              setListSkills(item)

                            }}
                          />
                        }
                        label={skill.name}
                      />
                    </div>
                   )      
                })}
              </div>
              </div>
              )
          })
        }
          
        </div>
        <div className="d-flex flex-row-reverse mt-2 mb-3">
            <Button
              className={classes.btnSave}
              onClick={() => UpdateWorkExp(exp.id, index)}
              onClick={SubmitEditSkills}
            >
          
           save</Button>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default EditSkillsBlock;

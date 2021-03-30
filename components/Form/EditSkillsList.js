import React, {useEffect} from "react";
import {API_HOST, API_DETAILS_USER, API_UPDATE_PROFILHEADER} from '../../API';
import dynamic from "next/dynamic";
import jwtDecode from "jwt-decode";
import axios from "axios";
import Checkbox from '@material-ui/core/Checkbox';
import { Container, Row, Col } from "reactstrap";

const  EditSkillsList= () => {
    const [checked, setChecked] = React.useState(true);
    const handleChange = (event) => {
        setChecked(event.target.checked);
      };
    
      //list profil skills from db
      useEffect(() => {
    
        var URL = API_HOST + API_DETAILS_USER + id_Current_User;
        var config = {
          method: "get",
          url: URL,
          headers: {},
        };
    
        axios(config)
          .then((response) => response)
          .then((response) => setCV(response.data["details"]))
  
          .catch((error) => error.response)
          
      }, []);
    return ( 
        <React.Fragment>
            <Container>

            </Container>
        </React.Fragment>
     );
}
 
export default EditSkillsList;
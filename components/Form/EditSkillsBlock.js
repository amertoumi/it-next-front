import React, {useEffect} from "react";
import {API_HOST, API_DETAILS_USER, API_UPDATE_PROFILHEADER} from '../../API';
import dynamic from "next/dynamic";
import jwtDecode from "jwt-decode";
import axios from "axios";
import Checkbox from '@material-ui/core/Checkbox';
import { Container, Row, Col } from "reactstrap";

const  EditSkillsBlock= () => {
    const [checked, setChecked] = React.useState(true);
    const handleChange = (event) => {
        setChecked(event.target.checked);
      };
    
      function getAllSkills(){
        axios.get('https://gist.github.com/amertoumi/7db06046b98c8927f4e61bf88880065f')
        .then((res)=>console.log(res.data))
        .catch((error) => error.response);
      }

      //list profil skills from db
      useEffect(() => {
    
        getAllSkills();
          
      }, []);
    return ( 
        <React.Fragment>
            <Container>
                <div>test</div>
            </Container>
        </React.Fragment>
     );
}
 
export default EditSkillsBlock;
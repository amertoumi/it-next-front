import React from 'react';
import axios from 'axios';
import { FormGroup, Label, Input} from 'reactstrap';

import { API_HOST, API_SKILLS_PATH} from '../../api';

const SkillsCheckBox = () => {
  const [skills, setSkills] = React.useState([]);
  const [error, setError] = React.useState("");
  React.useEffect(() => {
    let URL = API_HOST + API_SKILLS_PATH;
    axios
      .get(URL)
      //.then((response)=>console.log(response.data["hydra:member"]))
      .then((response) => response.data["hydra:member"])
      .then((data) => setSkills(data))
      .catch((error) => console.log(error.response));
  }, []);

    return ( 
        <FormGroup check>
        {skills.map((skill) => (
            
            <Label check>
              <Input type="checkbox" />{' '}
              {skill.name}
            </Label>
          
        ))
        }
        </FormGroup>
        
     );
}
 
export default SkillsCheckBox;
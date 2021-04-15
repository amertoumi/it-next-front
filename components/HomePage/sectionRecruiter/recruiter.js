import React from 'react';
import {Button} from 'reactstrap';
import { makeStyles } from "@material-ui/core/styles";
import './recruiter.css';
import { FullscreenExitTwoTone } from '@material-ui/icons';
import './recruiter.css';


const Recruiter = () => {
    
    return ( 
        <div id="blockRecruiter">
            <div id='embaucher'>
                <div className="t1">
                    embaucher
                </div>
                <div className="t2">
                    des pépites de l'it
                </div>
                <div >
                    <Button id="button">Recruter un Talent</Button>
                </div>
                
            </div>
        </div>
     );
}
 
export default Recruiter;
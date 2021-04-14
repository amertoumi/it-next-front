import React from 'react';
import {Button} from 'reactstrap';

import './recruiter.css';

const Recruiter = () => {
    return ( 
        <div className="mt-9">
            <div className="t1">
                embaucher
            </div>
            <div className="t2">
                des pépites de l'it
            </div>
            <div>
                <Button>Recruter un Talent</Button>
            </div>
        </div>
     );
}
 
export default Recruiter;
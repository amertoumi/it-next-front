import React from "react";
import User from "layouts/User.js";
import dynamic from 'next/dynamic';
import { Container } from "reactstrap";

const EditFormCv = dynamic(()=> import('../../components/Form/EditFormCv'));


const EditCV = () => {
    return ( 
        <div>
            
            <EditFormCv/>
            
        </div>
        
     );
}
 
EditCV.layout = User;

export default EditCV;
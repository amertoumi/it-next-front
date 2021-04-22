import React from "react";
import User from "layouts/User.js";
import dynamic from 'next/dynamic';

const EditHeaderCv = dynamic(()=> import('../../components/Form/EditHeaderCv'));
const WorkExp_Education = dynamic(()=> import ('../../components/Form/WorkExp_Education'));

const EditCV = () => {
    return (
        <div >  
            <h5>Edit cv</h5>
            <EditHeaderCv/>
            {/* <WorkExp_Education/> */}
        </div>
        
     );
}
 
EditCV.layout = User;

export default EditCV;
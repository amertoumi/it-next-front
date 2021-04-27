import React from 'react';
import dynamic from 'next/dynamic';
import Recruiter from '../../layouts/Recruiter';

const Missions = dynamic(()=>import ('../../components/Recruiter/missions'));

const allMissions = () => {
    return ( 
        <div className="pt-9">
            <h2>Missions List</h2>
            <Missions />
        </div>
     );
}
allMissions.layout = Recruiter;
export default allMissions;
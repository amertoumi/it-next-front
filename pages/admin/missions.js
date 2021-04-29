import React from 'react';
import dynamic from 'next/dynamic';
import Admin from '../../layouts/Admin';

const ListMissions = dynamic(()=>import ('../../components/Admin/listMissions'));

const allMissions = () => {
    return ( 
        <div className="pt-9">
            <h2>Missions List</h2>
            
            <ListMissions />
        </div>
     );
}
allMissions.layout = Admin;
export default allMissions;
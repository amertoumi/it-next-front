import React, { useState, useEffect, useRef, useContext } from "react";
//import MaterialTable from 'material-table';
import { Context as SkillsContext } from "../../Context/Skills/SkillsContext";
import { Autocomplete } from "@material-ui/lab";
import {Button, TextField} from '@material-ui/core';
//import MUIDataTable from "mui-datatables";
import { XGrid } from '@material-ui/x-grid';
//import { useDemoData } from '@material-ui/x-grid-data-generator';

const Inspirnautefilter = () => {
    const { state, FETCH_SKILLS, FETCH_PROFIL_BY_SKILLS} = useContext(SkillsContext);
    const [skillSearch, setMySkills] = React.useState([]);
    
    // get list of skills
    React.useEffect(() => {
    FETCH_SKILLS();
  }, []);

/*   const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 200,
    maxColumns: 6,
  }); */
  const skill = state.skills;
  const profils = state.profils;
  console.log(profils);

  const columns = ["Name", "Country", "City" ];
 
const {data} = state?.profils || [];

const options = {
    filterType: 'checkbox',
  };

  return (
      <React.Fragment>
          <div className="mt-5 mb-3">
        <h4>Select freelancer from table:</h4>
      </div>
      <div className="mb-4">
        <h6>Type Freelancer skills</h6>
      </div>
      <div className="d-flex flex-column justify-content-lg-around mb-3">
        <div>
          <Autocomplete  
            multiple
            id="sk"
            size="small"
            options={skill?.map((option) => option.name)}
            onChange={(event, newValue) => {
              setMySkills([
                ...skillSearch,
                ...newValue.filter((option) => skillSearch.indexOf(option) === -1),
              ]);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                id="skillSearch"
                label="Type Searched skills here"
                placeholder="Favorites"
                value={skillSearch}
              />
            )}
            style={{ width: "450px" }}
          />
        </div>
        <div>
        <Button 
            variant="contained" 
            color="primary" 
            className="mt-3"
            onClick={()=>{FETCH_PROFIL_BY_SKILLS(skillSearch)}}
            >
            Search
            </Button>
        </div>
      </div>
      <div>

      {/* <MaterialTable
      title="Inspirnaute profils"
      columns={[
        { title: 'Name', field: 'name' },
        { title: 'Country', field: 'country' },
        { title: 'City', field: 'city' },
        { title: 'Poste', field: 'poste' },
        { title: 'Tarif', field: 'tarif' },
        { title: 'Nbr years Exp', field: 'nbrAnneeExp' },
        { title: 'Dispo Start', field: 'dispoStart' },
        { title: 'Dispo End', field: 'dispoEnd' },
        { title: 'Dispo End', field: 'dispoEnd' },
        {
          title: 'Birth Place',
          field: 'birthCity',
          lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
        },
      ]}
      data={profils|[]}
      options={{
        filtering: true
      }}
    /> */}
    <div style={{ height: 400, width: '100%' }}>
      {
        data ?
        (<XGrid
        {...data || []}
        
        columns={[
          { title: 'Name', field: 'name' },
          { title: 'Country', field: 'country' },
          { title: 'City', field: 'city' },
          { title: 'Poste', field: 'poste' },
          { title: 'Tarif', field: 'tarif' },
          { title: 'Nbr years Exp', field: 'nbrAnneeExp' },
          { title: 'Dispo Start', field: 'dispoStart' },
          { title: 'Dispo End', field: 'dispoEnd' },
          { title: 'Dispo End', field: 'dispoEnd' },
          {
            title: 'Birth Place',
            field: 'birthCity',
            lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
          },
        ]}
      />) : <h6>start search inspirnaute...</h6>
      }
    </div>
      </div>
      </React.Fragment>
  )

}

export default Inspirnautefilter;
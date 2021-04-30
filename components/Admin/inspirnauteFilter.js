import React, { useState, useEffect, useRef, useContext } from "react";
import { Context as SkillsContext } from "../../Context/Skills/SkillsContext";
import { Autocomplete } from "@material-ui/lab";
import { Button, TextField } from "@material-ui/core";
import MaterialTable from "material-table";
import { useRouter } from "next/router";
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > span': {
      margin: theme.spacing(2),
    },
  },
}));

const Inspirnautefilter = () => {
  const classes = useStyles();
  const router = useRouter();
  
  const { state, FETCH_SKILLS, FETCH_PROFIL_BY_SKILLS } = useContext(
    SkillsContext
  );
  const [skillSearch, setSkillSearch] = React.useState([]);

  // get list of skills
  React.useEffect(() => {
    FETCH_SKILLS();
  }, []);
  const skill = state.skills;
  const profils = state["profils"] ? state.profils : "no profils";
  
  console.log(profils);

  const options = {
    filterType: "checkbox",
  };
  const tableColumns = [
    { title: 'Name', field: 'name' },
    { title: 'Country', field: 'country' },
    { title: 'City', field: 'city' },
    { title: 'Poste', field: 'poste' },
    { title: 'Tarif', field: 'tarif' },
    { title: 'Nbr years Exp', field: 'nbrAnneeExp' },
    { title: 'Dispo Start', field: 'dispoStart' },
    { title: 'Dispo End', field: 'dispoEnd' },
    {
      title: "Custom Add",
      field: 'id',
      editable: false,
      render: (rowData) =>
          rowData && (
          <Button onClick={(event, profils) => alert("You saved " )}><Icon style={{ color: green[500] }}>add_circle</Icon></Button>
          )
      }
    
  ];
  
  // AFFECT PROFIL TO MISSION
  const { mid } = router.query;
  console.log(mid);
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
              setSkillSearch([
                ...skillSearch,
                ...newValue.filter(
                  (option) => skillSearch.indexOf(option) === -1
                ),
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
            onClick={() => {
              FETCH_PROFIL_BY_SKILLS(skillSearch), setSkillSearch([])
            }}
          >
            Search
          </Button>
        </div>
      </div>
      <div>

         {state.profils ?
        <MaterialTable
        title="Inspirnaute profils"
        columns={tableColumns}
        data={profils}
        options={{
          filtering: true
        }}
        
    
      /> :
      <MaterialTable
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
          
      ]}
      data={[
        {
          name: "No profils yet...",
          surname: "",
          birthYear: "",
          birthCity: "",
        }
      ]}
      options={{
        filtering: true,
      }}
      

    />
        } 
      </div>
    </React.Fragment>
  );
};

export default Inspirnautefilter;

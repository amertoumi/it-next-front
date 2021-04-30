import React, { useState, useEffect, useRef, useContext } from "react";
import { Context as SkillsContext } from "../../Context/Skills/SkillsContext";
import { Context as MissionContext } from "../../Context/Missions/Missioncontext";
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
  const [disable, setDisable] = React.useState(false);
  const { state, FETCH_SKILLS, FETCH_PROFIL_BY_SKILLS } = useContext(SkillsContext);
  const {AFFECT_PROFIL} = useContext(MissionContext);
  const { mid } = router.query;
  const [skillSearch, setSkillSearch] = React.useState([]);
  
  const DisableHandler = (event) => {
    setDisable(!disable);
  };
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
    
  ];
  
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
        actions={[
          rowData => ({
            icon: 'library_add',
            tooltip: 'Affect Profil',
            //disabled:disable,
            onClick: (event, rowData) => {
              const idProfil = rowData.id
              AFFECT_PROFIL(mid ,idProfil);
              //DisableHandler();
              
            },
            disabled: rowData.tarif < 300
          })
        ]}
        options={{
          actionsColumnIndex: -1
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

import React, {useEffect} from 'react';
import axios from 'axios';
import jwtDecode from "jwt-decode";
import {API_HOST, API_WORK_BY_PROFIL_PATH, API_REMOVE_WORK_EXP_PATH} from '../../API';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: '30px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  accordion: {
    marginTop: '15px',
    backgroundColor: '#bad1ea',
  },
  accordionAction:{
    display: 'contents',
  }
}));


export default function WorkExpBlock() {
  const classes = useStyles();
    const [work, setWork]= React.useState([]);
    const token = window.localStorage.getItem("authToken");
    const { id: id_Current_User } = jwtDecode(token);
    
    useEffect(()=>{
    var URL = API_HOST+API_WORK_BY_PROFIL_PATH+id_Current_User;
    axios.get(URL)
    
    .then((response) => setWork(response.data));
  }, [])

  //Remove work experience by ID
  const removeWorkExp =(id)=>{
    var URL = API_HOST + API_REMOVE_WORK_EXP_PATH +id;
    axios(URL, {
      method: "DELETE",
      headers: {},
    })
    .then((response) =>console.log(response.data))
    .catch((error)=> console.log(error.message))

  }
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <div className={classes.root}>
      {
        work.map((exp, index) => {
          return (
        <Accordion key={exp.id} className={classes.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div >
            <Typography className={classes.heading}>
              <span><b>{capitalizeFirstLetter(exp.poste)}</b></span>
               {' '}For{' '} 
               <span><b>{capitalizeFirstLetter(exp.entreprise)}</b></span>
               {' '}Company
               </Typography>
          </div>
          {/* <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>{exp.entreprise}</Typography>
          </div> */}
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          
          <div className={classes.column}>
            <div>
            <span><b>From :</b></span><br/>
            {exp.fromDate}
            </div> <br/>
            <div>
            <span><b>To :</b></span> <br/>
            {exp.toDate}
            </div>
          </div>
          <div className={clsx(classes.helper)}>
            <Typography >
              <div>
               <span><b>Description:</b></span>
              </div>
              <div>
                {exp.description}
              </div>
              
              
            </Typography>
          </div>
        </AccordionDetails>
        <Divider />
        <AccordionActions className={classes.accordionAction}>
          <Button 
          size="small" 
          style={{color:"#E94545"}}
          onClick={()=> removeWorkExp(exp.id)}
          >
            <Grid item xs={8}>
              <DeleteIcon />
            </Grid>Remove
          </Button>
          {/* <Button size="small" color="primary">
            Save
          </Button> */}
        </AccordionActions>
      </Accordion>
          )
        })
      }
      
    </div>
  );
}




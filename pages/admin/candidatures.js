import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_HOST, API_PROFILS_PATH } from "../../API";
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import Header from "components/Headers/Header.js";
// reactstrap components
import { Container } from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
import dynamic from 'next/dynamic'

const ListCandidatureInspirnautes = dynamic(() => import('../../components/candidature/listCandidatureFreelancers'))
const ListCandidatureRecruiters = dynamic(() => import('../../components/candidature/listCandidatureRecruiters'))

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={2}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    position: 'relative',
    minHeight: 200,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600],
    },
  },
}));

// core components
function Candidatures_List() {

  const [listCandidatures, setListCandidatures] = useState([]);
  const [isClicked, setisClicked]=useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };


  //List table of Pending Candidature
  useEffect(() => {
    let URL = API_HOST + API_PROFILS_PATH;
    axios
      .get(URL)
      .then((response) => response.data["hydra:member"])
      .then((data) => setListCandidatures(data))
      .catch((error) => console.log(error.response));
  }, []);

  return (
    <>
    <Header />
      <Container className="mt--7" fluid>
    <div className="mt-8">
      <AppBar position="static" color="default" >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label="Inspirnautes Candidatures" {...a11yProps(0)} />
          <Tab label="Entreprise Candidatures" {...a11yProps(1)} />
          
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <ListCandidatureInspirnautes />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <ListCandidatureRecruiters />
        </TabPanel>
      </SwipeableViews>
    </div>
    </Container>
    </>
  );
}

Candidatures_List.layout = Admin;

export default Candidatures_List;

import React, { useState } from "react";
import Admin from "layouts/Admin.js";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Container } from "react-bootstrap";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipeableViews from "react-swipeable-views";
import Typography from "@material-ui/core/Typography";
import { green } from "@material-ui/core/colors";
import Box from "@material-ui/core/Box";
import EditorHomePageFR from "../../components/HomePage/editorHomePageFR";
import EditorHomePageEN from "../../components/HomePage/editorhomaPageEN";

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
    "aria-controls": `action-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    position: "relative",
    minHeight: 200,
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[600],
    },
  },
}));

function HomeContent(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Container>
      <div className="pt-7 ">
        <div className="text-center">
          <h3> Edit Home Page Content</h3>
        </div>
        <div className="mt-5 mb-4">
          <h6>Select language from table and Edit home page content</h6>
        </div>
      </div>
      <div className="mt-3">
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="action tabs example"
          >
            <Tab label="Frensh Content" {...a11yProps(0)} />
            <Tab label="English Content" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <EditorHomePageFR />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <EditorHomePageEN />
          </TabPanel>
        </SwipeableViews>
      </div>
    </Container>
  );
}

HomeContent.layout = Admin;

export default HomeContent;

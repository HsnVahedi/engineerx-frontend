import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import NavBar from "./NavBar";
import TopBar from "./TopBar";

import { jssPreset } from "@material-ui/core";
import { create } from "jss";
import { StylesProvider, ThemeProvider } from "@material-ui/core";
import { useSettings } from "../../../hooks/settings";
import { createTheme } from "../../../theme";

const jss = create({ plugins: [...jssPreset().plugins] });

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    paddingTop: 64,
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 256,
    },
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  },
  content: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "auto",
  },
}));

const Content = ({ children }) => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>{children}</div>
        </div>
      </div>
    </div>
  );
};

function DashboardLayout({ children }) {
  const { settings, saveSettings } = useSettings();
  const theme = createTheme(settings);

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jss}>
        <Content>{children}</Content>
      </StylesProvider>
    </ThemeProvider>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.any,
};

export default DashboardLayout;

import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  SvgIcon,
} from "@material-ui/core";
import { Menu as MenuIcon } from "react-feather";
import Logo from "../../../logo";
import { THEMES } from "../../../../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 100,
    ...(theme.name === THEMES.LIGHT
      ? {
        boxShadow: "none",
        backgroundColor: theme.palette.primary.main,
      }
      : {}),
    ...(theme.name === THEMES.ONE_DARK
      ? {
        backgroundColor: theme.palette.background.default,
      }
      : {}),
  },
  toolbar: {
    minHeight: 64,
  },
}));

function TopBar({ onMobileNavOpen }) {
  const classes = useStyles();

  return (
    <AppBar className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Hidden lgUp>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <SvgIcon fontSize="small">
              <MenuIcon />
            </SvgIcon>
          </IconButton>
        </Hidden>
        <Hidden mdDown>
          <Link href="/posts">
            <a>
              <Logo />
            </a>
          </Link>
        </Hidden>
        <Box ml={2} flexGrow={1} />
        <Box ml={2}></Box>
      </Toolbar>
    </AppBar>
  );
}

TopBar.propTypes = {
  onMobileNavOpen: PropTypes.func,
};

export default TopBar;

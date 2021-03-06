import React from "react";
import {
  Box,
  Container,
  Typography,
  colors,
  makeStyles,
} from "@material-ui/core";
import OwnerAvatar from "../Avatar";
import { getBackendUrl, getFrontendUrl } from "../../modules/urls";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  root: {},
  cover: {
    position: "relative",
    height: 460,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    "&:before": {
      position: "absolute",
      content: '" "',
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
      backgroundImage:
        "linear-gradient(-180deg, rgba(0,0,0,0.00) 58%, rgba(0,0,0,0.32) 100%)",
    },
    "&:hover": {
      "& $changeButton": {
        visibility: "visible",
      },
    },
  },
  changeButton: {
    visibility: "hidden",
    position: "absolute",
    bottom: theme.spacing(3),
    right: theme.spacing(3),
    backgroundColor: colors.blueGrey[900],
    color: theme.palette.common.white,
    [theme.breakpoints.down("md")]: {
      top: theme.spacing(3),
      bottom: "auto",
    },
    "&:hover": {
      backgroundColor: colors.blueGrey[900],
    },
  },
  addPhotoIcon: {
    marginRight: theme.spacing(1),
  },
  avatar: {
    border: `2px solid ${theme.palette.common.white}`,
    height: 120,
    width: 120,
    top: -60,
    left: theme.spacing(3),
    position: "absolute",
  },
  action: {
    marginLeft: theme.spacing(1),
  },
}));

const OwnerName = ({ owner }) => {
  const name = `${owner.firstname} ${owner.lastname}`;
  if (owner.hasPersonalPage) {
    return (
      <Link href={`/specialists/${owner.id}`}>
        <a>
          {name}
        </a>
      </Link>
    )
  } else {
    return (<>{name}</>)
  }

}

const PostHeader = ({ post }) => {
  const backendUrl = getBackendUrl();
  const frontendUrl = getFrontendUrl();
  const classes = useStyles();
  const image = post.image16x9;
  const owner = post.owner;

  const wallpaper = image ? (
    <div
      className={classes.cover}
      style={{ backgroundImage: `url(${frontendUrl}${image.url})` }}
    ></div>
  ) : (
    <div className={classes.cover}></div>
  );

  return (
    <div className={classes.root}>
      {wallpaper}
      <Container maxWidth="lg">
        <Box position="relative" mt={1} display="flex" alignItems="center">
          <OwnerAvatar
            user={post.owner}
            className={classes.avatar}
          ></OwnerAvatar>
          <Box marginLeft="160px">
            <Typography variant="h4" color="textPrimary">
              <OwnerName owner={post.owner} />
            </Typography>
          </Box>
          <Box flexGrow={1} />
        </Box>
      </Container>
    </div>
  );
};

export default PostHeader;

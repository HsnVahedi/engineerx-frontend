import {
  Box,
  Container,
  makeStyles,
  Typography,
  Grid,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import { Link } from "next/link";
import { useRouter } from "next/router";
import PostCard from "./PostCard";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  title: {
    position: "relative",
    "&:after": {
      position: "absolute",
      bottom: -8,
      left: 0,
      content: '" "',
      height: 3,
      width: 48,
      backgroundColor: theme.palette.primary.main,
    },
  },
  sortButton: {
    textTransform: "none",
    letterSpacing: 0,
    marginRight: theme.spacing(2),
  },
}));

export const Posts = ({ posts, size, page, totalCount, tagname }) => {
  const classes = useStyles();
  const router = useRouter();
  return (
    <div className={classes.root} >
      <Container maxWidth="lg">
        <Box mt={6}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
            mb={2}
          >
            <Typography
              className={classes.title}
              variant="h5"
              color="textPrimary"
            >
              {totalCount} posts{" "}
              {tagname && (
                <span>
                  for <b>"{tagname}"</b>
                </span>
              )}
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {posts.map((post, index) => (
              <Grid item key={index} md={4} sm={6} xs={12}>
                <PostCard post={post} />
              </Grid>
            ))}
          </Grid>
          <Box mt={6} display="flex" justifyContent="center">
            <Pagination
              count={size}
              page={page}
              onChange={(event, value) => {
                router.push(`?page=${value}`);
              }}
            />
          </Box>
        </Box>
      </Container>
    </div>
  );
};

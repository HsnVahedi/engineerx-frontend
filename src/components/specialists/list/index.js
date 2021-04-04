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
import Specialist from "./Specialist";

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

export const Specialists = ({ specialists, size, page }) => {
  const classes = useStyles();
  const router = useRouter();
  return (
    <div className={classes.root} >
      <Container maxWidth="lg">
        <Box mt={6}>
          <Grid container spacing={3}>
            {specialists.map((specialist, index) => (
              // <Grid item key={index} md={4} sm={6} xs={12}>
                <Specialist specialist={specialist} />
              // </Grid>
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

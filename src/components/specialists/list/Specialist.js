import Link from "next/link";
import moment from "moment";
import {
  Box,
  Card,
  Paper,
  CardMedia,
  Grid,
  Typography,
  colors,
  makeStyles,
} from "@material-ui/core";
import OwnerAvatar from "../../Avatar";
import { getBackendUrl, getFrontendUrl } from "../../../modules/urls";

const useStyles = makeStyles((theme) => ({
  root: {},
  media: {
    height: 200,
    backgroundColor: theme.palette.background.dark,
  },
  likedButton: {
    color: colors.red[600],
  },
  subscribersIcon: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(1),
  },
}));

const Specialist = ({ specialist }) => {
  const backendUrl = getBackendUrl();
  const frontendUrl = getFrontendUrl();
  const classes = useStyles();
  return (
    <Grid
      item
      xs={12}
      md={6}
    >
      <Paper variant="outlined">
        <Box
          p={2}
          display="flex"
          alignItems="center"
        >
          <OwnerAvatar user={specialist.owner} />
          <Box
            flexGrow={1}
            mx={2}
          >
            <Link href={`/specialists/${specialist.slug}`}>
              <a>

                {specialist.owner.firstname} {specialist.owner.lastname}
              </a>
            </Link>
            <Typography
              variant="body2"
              color="textSecondary"
              gutterBottom
            >
              {specialist.title}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

export default Specialist;

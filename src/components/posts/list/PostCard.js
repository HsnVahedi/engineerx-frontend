import Link from "next/link";
import moment from "moment";
import {
  Box,
  Card,
  CardMedia,
  Typography,
  colors,
  makeStyles,
} from "@material-ui/core";
import OwnerAvatar from "../../Avatar";
import Tag from "../Tag";
import { getBackendUrl } from "../../../modules/urls";

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

const PostCard = ({ post }) => {
  const backendUrl = getBackendUrl();
  const classes = useStyles();

  const cardMedia = post.image16x9 ? (
    <CardMedia
      className={classes.media}
      image={`${post.image16x9.url}`}
    ></CardMedia>
  ) : (
    <CardMedia style={{ textAlign: "center" }} className={classes.media}>
      <Box
        style={{ height: "100%" }}
        display="flex"
        justifyContent="center"
        flexDirection="column"
      >
        <Typography variant="h2">{post.title}</Typography>
      </Box>
    </CardMedia>
  );
  return (
    <Card>
      <Box p={3}>
        {cardMedia}
        <Box display="flex" alignItems="center" mt={2}>
          <OwnerAvatar user={post.owner} />

          <Box ml={2}>
            <Link href={`/posts/${post.slug}`}>
            <a>
            {/* {post.title} */}
            <h4 color="textPrimary">{post.title}</h4>
            </a>
            </Link>
            <Typography variant="body2" color="textSecondary">
              by <b>{`${post.owner.firstname} ${post.owner.lastname}`}</b> |
              Published {moment(post.firstPublishedAt).fromNow()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box pb={2} px={3}>
        {post.tags.map((tag, index) => {
          if (index <= 5) {
            return <Tag tagname={tag} key={index} size="small" />;
          } else {
            return null;
          }
        })}
      </Box>
    </Card>
  );
};

export default PostCard;

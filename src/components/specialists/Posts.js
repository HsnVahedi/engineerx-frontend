import {
    Grid,
} from '@material-ui/core';
import PostCard from "../posts/list/PostCard";

const Posts = ({ posts }) => {
    return (
        <Grid container spacing={3}>
            {posts.map((post, index) => {
                return (
                    <Grid key={index} item md={4} sm={6} xs={12}>
                        <PostCard post={post} />
                    </Grid>
                )

            })}
        </Grid>
    );
}

export default Posts;

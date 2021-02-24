import {
  getPagePosts,
  getPostsPaginationSize,
  getPostsTotalCount,
} from "../../src/modules/posts";
import Layout from "../../src/components/layouts/DashboardLayout";
import { Posts } from "../../src/components/posts/list";

const PostsPage = ({ posts, size, page, totalCount }) => {
  const postsJson = JSON.parse(posts);
  return (
    <Layout>
      <Posts
        posts={postsJson}
        size={size}
        page={page}
        totalCount={totalCount}
      ></Posts>
    </Layout>
  );
};

export const getServerSideProps = async ({
  params,
  query,
  preview,
  previewData,
}) => {
  const currentPage = query && query.page ? query.page : 1;
  const posts = await getPagePosts(currentPage);
  const paginationSize = await getPostsPaginationSize();
  const totalCount = await getPostsTotalCount();
  if (posts.length) {
    return {
      props: {
        posts: JSON.stringify(posts),
        size: paginationSize,
        page: parseInt(currentPage),
        totalCount,
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
};

export default PostsPage;

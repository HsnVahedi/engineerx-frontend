import { getPostSlugs, getPostBySlug } from "../../src/modules/posts";
import PostHeader from "../../src/components/posts/PostHeader";
import PostContent from "../../src/components/posts/PostContent";
import Layout from "../../src/components/layouts/DashboardLayout";

export const Post = ({ post }) => {
  return (
    <>
      <PostHeader post={post} />
      <PostContent post={post} />
    </>
  );
};

const Page = ({ post }) => {
  const postJson = JSON.parse(post);
  return (
    <Layout>
      <Post post={postJson} />
    </Layout>
  );
};

export const getStaticProps = async ({ params, preview, previewData }) => {
  const post = await getPostBySlug(params.slug);
  if (post) {
    return {
      props: {
        post: JSON.stringify(post),
      },
      revalidate: 5,
    };
  } else {
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths = async () => {
  const slugs = await getPostSlugs();
  return {
    paths: slugs.map((slug) => `/posts/${encodeURIComponent(slug)}`),
    fallback: "blocking",
  };
};

export default Page;

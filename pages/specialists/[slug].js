import { getPersonalPagesSlugs, getPersonalPageBySlug } from "../../src/modules/specialists";
import { getUserPosts } from "../../src/modules/posts";
import Layout from "../../src/components/layouts/DashboardLayout";
import PersonalInfoHeader from "../../src/components/specialists/PersonalInfoHeader";
import PersonalInfoContent from "../../src/components/specialists/PersonalInfoContent";

export const PersonalInfo = ({ personalInfo, posts }) => {
  return (
    <>
      <PersonalInfoHeader personalInfo={personalInfo} />
      <PersonalInfoContent personalInfo={personalInfo} posts={posts} />
    </>
  );
};

const Page = ({ personalInfo, posts }) => {
  const personalInfoJson = JSON.parse(personalInfo);
  const postsJson = JSON.parse(posts);
  return (
    <Layout>
      <PersonalInfo personalInfo={personalInfoJson} posts={postsJson} />
    </Layout>
  );
};

export const getStaticProps = async ({ params, preview, previewData }) => {
  const personalInfo = await getPersonalPageBySlug(params.slug);
  const posts = await getUserPosts(params.slug);
  if (personalInfo) {
    return {
      props: {
        personalInfo: JSON.stringify(personalInfo),
        posts: JSON.stringify(posts),
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
  const slugs = await getPersonalPagesSlugs();
  return {
    paths: slugs.map((slug) => `/specialists/${encodeURIComponent(slug)}`),
    fallback: "blocking",
  };
};

export default Page;

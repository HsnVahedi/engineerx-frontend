import {
  getPagePersonalPages,
  getPersonalPagesPaginationSize,
  getPersonalPagesTotalCount,
} from "../../src/modules/specialists";
import Layout from "../../src/components/layouts/DashboardLayout";
import { Specialists } from "../../src/components/specialists/list";
import { get } from "lodash";

const SpecialistsPage = ({ specialists, size, page, totalCount }) => {
  const specialistsJson = JSON.parse(specialists);
  return (
    <Layout>
      <Specialists
        specialists={specialistsJson}
        size={size}
        page={page}
        totalCount={totalCount}
      ></Specialists>
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
  const specialists = await getPagePersonalPages(currentPage);
  const paginationSize = await getPersonalPagesPaginationSize();
  const totalCount = await getPersonalPagesTotalCount();
  if (specialists.length) {
    return {
      props: {
        specialists: JSON.stringify(specialists),
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

export default SpecialistsPage;

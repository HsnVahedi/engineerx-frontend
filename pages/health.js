const HealthPage = () => {
	return null;
};

// This gets called on every request
export const getServerSideProps = async (context) => {
  context.res.end('pong');
  return { props: { } }
}

export default HealthPage;

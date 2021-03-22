const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase, { defaultConfig }) => {
  let config = {
    ...defaultConfig,
    async redirects() {
      return [
        {
          source: "/",
          destination: "/posts",
          permanent: true,
        },
      ];
    },
  };
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      /* development only config options here */
      ...config,
      images: {
        ...config.images,
        domains: ["localhost"],
      },
      env: {
        backendUrl: "http://localhost:8000",
        frontendUrl: "http://localhost:8000",
      },
    };
  } else if (phase === "jest") {
    return {
      ...config,
      env: {
        backendUrl: "",
        frontendUrl: "",
      },
    };
  }

  return {
    /* config options for production: npm build and npm start */
    ...config,
    images: {
      ...config.images,
      domains: [`${process.env.BACKEND_URL}`, "127.0.0.1", "localhost"],
    },
    env: {
      backendUrl: (process.env.LOCAL && process.env.INTEGRATED) ? "http://backendingress:80"
        : process.env.LOCAL
        ? "http://localhost:8000"
        : process.env.INTEGRATION_TEST
        ? "http://localhost:8001"
        : `http://${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}`,
      frontendUrl: process.env.LOCAL
        ? "http://localhost:8000"
        : process.env.INTEGRATION_TEST
        ? "http://localhost:8001"
        : "",
    },
  };
};

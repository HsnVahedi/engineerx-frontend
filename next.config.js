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
        domains: ["127.0.0.1"],
      },
      env: {
        backendUrl: "http://127.0.0.1:8000",
      },
    };
  } else if (phase === "jest") {
    return {
      ...config,
      env: {
        backendUrl: "",
      },
    };
  }

  return {
    /* config options for all phases except development here */
    ...config,
    images: {
      ...config.images,
      domains: ["backend"],
    },
    publicRuntimeConfig: {
      ...config.publicRuntimeConfig,
      backendUrl: "backend",
    },
  };
};

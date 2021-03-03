export const getBackendUrl = () => {
  return process.env.backendUrl || "";
};

export const getFrontendUrl = () => {
  return process.env.frontendUrl || "";
};

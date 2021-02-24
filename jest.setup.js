import { setConfig } from "next/config";
import config from "./next.config";

const nextConfig = config("jest", {});

// Make sure you can use "publicRuntimeConfig" within tests.
setConfig(nextConfig.publicRuntimeConfig);
setConfig(nextConfig.serverRuntimeConfig);

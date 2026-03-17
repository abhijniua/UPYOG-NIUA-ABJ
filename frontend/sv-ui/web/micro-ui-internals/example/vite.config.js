import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiTarget = env.VITE_PROXY_API || "https://niuatt.niua.in";

  const proxyRoutes = [
    "/access/v1/actions/mdms",
    "/egov-mdms-service",
    "/egov-location",
    "/mdms-v2",
    "/localization",
    "/egov-workflow-v2",
    "/filestore",
    "/user-otp",
    "/user",
    "/billing-service",
    "/collection-services",
    "/pdf-service",
    "/pg-service",
    "/inbox/v1/_search",
    "/egov-hrms/employees/_search",
    "/egov-user-event",
    "/sv-services",
    "/employee-dashboard",
  ];

  const proxyConfig = Object.fromEntries(
    proxyRoutes.map((route) => [
      route,
      { target: apiTarget, changeOrigin: true },
    ])
  );

  return {
    plugins: [react({ include: /\.(jsx|js)$/ })],
    base: "/sv-ui/",
    server: {
      port: 3000,
      proxy: proxyConfig,
    },
    build: {
      sourcemap: true,
      outDir: "build",
    },
    define: {
      "process.env": {},
    },
    resolve: {
      mainFields: ["main", "module"],
    },
    optimizeDeps: {
      include: [
        "@nudmcdgnpm/upyog-ui-react-components-lts",
        "@upyog/digit-ui-module-bills",
        "@upyog/digit-ui-module-common",
        "@upyog/digit-ui-module-core",
        "@upyog/digit-ui-module-engagement",
        "@nudmcdgnpm/upyog-ui-module-sv",
        "@nudmcdgnpm/digit-ui-libraries",
      ],
    },
    envPrefix: "VITE_",
  };
});

/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
  excludes: ['~/tailwind.css'],
  browserNodeBuiltinsPolyfill: { modules:{ crypto: true, os:true, path:true } },

};

const fs = require("fs");
const path = require("path");

const nodeModulesDirs = [
  path.join(__dirname, "node_modules"),
  path.join(__dirname, "micro-ui-internals", "node_modules"),
];

// 1. Fix broken `module` fields in npm packages pointing to non-existent files
const brokenNpmPackages = [
  "@nudmcdgnpm/upyog-ui-react-components-lts",
  "@upyog/digit-ui-module-bills",
  "@upyog/digit-ui-react-components",
  "react-smooth",
];

brokenNpmPackages.forEach((pkg) => {
  nodeModulesDirs.forEach((nmDir) => {
    const pkgJsonPath = path.join(nmDir, pkg, "package.json");
    if (!fs.existsSync(pkgJsonPath)) return;
    const json = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"));
    if (json.module && !fs.existsSync(path.join(nmDir, pkg, json.module))) {
      delete json.module;
      fs.writeFileSync(pkgJsonPath, JSON.stringify(json, null, 2));
      console.log(`Fixed broken module field: ${pkg} in ${nmDir}`);
    }
  });
});

// 2. Shim renamed babel plugins
const shims = [
  {
    old: "@babel/plugin-proposal-unicode-property-regex",
    new: "@babel/plugin-transform-unicode-property-regex",
  },
];

shims.forEach(({ old: oldPkg, new: newPkg }) => {
  nodeModulesDirs.forEach((nmDir) => {
    const newPkgPath = path.join(nmDir, newPkg);
    if (!fs.existsSync(newPkgPath)) return;

    const shimDir = path.join(nmDir, oldPkg);
    const shimPkg = path.join(shimDir, "package.json");
    const shimIndex = path.join(shimDir, "index.js");

    if (fs.existsSync(shimPkg)) return;

    fs.mkdirSync(shimDir, { recursive: true });
    fs.writeFileSync(shimPkg, JSON.stringify({ name: oldPkg, version: "7.0.0", main: "index.js" }, null, 2));
    fs.writeFileSync(shimIndex, `module.exports = require(${JSON.stringify(newPkg)});\n`);
    console.log(`Shimmed: ${oldPkg} -> ${newPkg} in ${nmDir}`);
  });
});

const path = require("path");

const rootDir = path.dirname(process.mainModule.filename);

const viewPath = (viewDir, file) => path.join(rootDir, viewDir, file);

const staticPath = (dirName,publicDir) => path.join(dirName,publicDir);

 

module.exports = {
  viewPath: viewPath,
  staticPath:staticPath
 };

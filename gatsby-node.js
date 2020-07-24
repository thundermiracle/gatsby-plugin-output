const path = require('path');
const fs = require('fs-extra');
const rimraf = require('rimraf');

const defaultOptions = {
  publicPath: 'public',
  rmPublicFolder: false,
  moveFolder: false,
};

exports.onPreInit = (_, pluginOptions) => {
  // operate only OUTPUT_DIR is defined
  if (process.env.OUTPUT_DIR) {
    const { publicPath, rmPublicFolder } = {
      ...defaultOptions,
      ...pluginOptions,
    };

    // delete target folder
    const outputFolder = path.join(process.cwd(), process.env.OUTPUT_DIR);
    rimraf.sync(outputFolder, { maxBusyTries: 3 });

    if (rmPublicFolder) {
      // delete public folder
      const publicFolder = path.join(process.cwd(), publicPath);
      rimraf.sync(publicFolder, { maxBusyTries: 3 });
    }
  }
};

exports.onPostBuild = (_, pluginOptions) => {
  // operate only OUTPUT_DIR is defined
  if (process.env.OUTPUT_DIR) {
    const { publicPath, moveFolder } = {
      ...defaultOptions,
      ...pluginOptions,
    };

    const tempFolder = path.join(
      process.cwd(),
      `tmp-output-dir-${new Date().getTime().toString()}`
    );
    const publicFolder = path.join(process.cwd(), publicPath);
    const targetFolder = path.join(process.cwd(), process.env.OUTPUT_DIR);

    try {
      if (moveFolder) {
        // rename public folder to temporary folder
        fs.renameSync(publicFolder, tempFolder);
      } else {
        // copy from public folder to temporary folder
        fs.copySync(publicFolder, tempFolder);
      }

      // make target folder
      fs.mkdirSync(targetFolder, { recursive: true });
      // move all files from temporary folder to target folder
      fs.moveSync(tempFolder, targetFolder, { overwrite: true });
    } finally {
      if (fs.existsSync(tempFolder)) {
        // delete temporary folder no matter failed or succeeded
        rimraf.sync(tempFolder);
      }
    }
  }
};

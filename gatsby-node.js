const path = require('path');
const fs = require('fs-extra');
const rimraf = require('rimraf');

const defaultOptions = {
  publicPath: 'public',
  rmPublicFolder: true,
};

exports.onPreBootstrap = (_, pluginOptions) => {
  // operate only OUTPUT_DIR is defined
  if (process.env.OUTPUT_DIR) {
    const { publicPath, rmPublicFolder } = {
      ...defaultOptions,
      ...pluginOptions,
    };

    // delete target folder
    const outputFolder = path.join(process.cwd(), process.env.OUTPUT_DIR);
    rimraf.sync(outputFolder);

    if (rmPublicFolder) {
      // delete public folder
      const publicFolder = path.join(process.cwd(), publicPath);
      rimraf.sync(publicFolder);
    }
  }
};

exports.onPostBuild = (_, pluginOptions) => {
  // operate only OUTPUT_DIR is defined
  if (process.env.OUTPUT_DIR) {
    const { publicPath } = {
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
      // rename public folder to temporary folder
      fs.renameSync(publicFolder, tempFolder);
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

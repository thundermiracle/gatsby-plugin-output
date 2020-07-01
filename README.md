<h1 align="center">gatsby-plugin-output</h1>

[![npm version](https://badge.fury.io/js/gatsby-plugin-output.svg)](https://badge.fury.io/js/gatsby-plugin-output)
[![dependencies Status](https://david-dm.org/thundermiracle/gatsby-plugin-output/status.svg)](https://david-dm.org/thundermiracle/gatsby-plugin-output)
[![CircleCI](https://img.shields.io/circleci/build/github/thundermiracle/gatsby-plugin-output/master)](https://circleci.com/gh/thundermiracle/gatsby-plugin-output)

## Description

Configure the Gatsby's output folder from `./public`.

## Why

As discussed in ticket [#1878](https://github.com/gatsbyjs/gatsby/issues/1878), configurable output folder function will not be implemented in Gatsby@v2.

But sometimes changing output dir is necessary like build Gatsby with `pathPrefix` and deploy it to Netlify's subdirectory. This plugin is trying to move the compiled files from `./public` to your target folder.

**IMPORTANT: In usual case, you'd better put this plugin `in the end of` the gatsby-config.js as other plugins like gatsby-plugin-offline is hard-coding `public` folder.**

## Install

```shell
npm install --save gatsby-plugin-output
# or
yarn add gatsby-plugin-output
```

## Usage

1. Define the output dir by environment parameter.

   ```json
   "build": "OUTPUT_DIR=public/blog gatsby build"

   # in Windows:

   "build": "cross-env OUTPUT_DIR=public/blog gatsby build"
   ```

2. In gatsby-config.js plugins array:

   ```js
   `gatsby-plugin-prettier-build`;
   ```

   And with custom options:

   ```js
   {
     resolve: `gatsby-plugin-output`,
     options: {
       // default values
       publicPath: 'public',
       rmPublicFolder: true
     }
   }
   ```

## Options

| No. |     Option     | required | Default  | Description                                                                         |
| :-- | :------------: | :------: | :------- | :---------------------------------------------------------------------------------- |
| 1   |   publicPath   |          | `public` | the output folder of Gatsby, will always be `public` in Gatsby@v2                   |
| 2   | rmPublicFolder |          | `true`   | remove `public` folder before build. (Make it `true` to prevent some weird errors.) |

## License

This project is licensed under the terms of the [MIT license](/LICENSE).

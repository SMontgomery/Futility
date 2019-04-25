'use strict';

const fs = require('fs');
const deasync = require('deasync');
const {execSync} = require('child_process');
const licenseCrawler = require('npm-license-crawler');

// Clear buildConstants.js
const buildConstants = {};

// Determine version
const versionParts = execSync('git describe', {encoding: 'utf8'}).trim().split('-');
const version = `${versionParts[0]}-${versionParts[1]} (${versionParts[2]})`;
buildConstants.version = version;


// Get current date/time
buildConstants.buildDate = new Date().toUTCString().trim();

// Get dependencies
const productionDependencies = getDependencies({
  start: ['./'],
  production: true,
  onlyDirectDependencies: true,
  omitVersion: true,
  noColor: true,
});

buildConstants.directDependencies = productionDependencies.dependencies;

// Write buildConstants.js
fs.writeFileSync('./src/scripts/constants/buildConstants.js',
    `/* eslint-disable */\n\nexport const buildConstants = ${JSON.stringify(buildConstants, null, 2)};`);

function getDependencies(options) {
  let dumpDone = false;
  let dumpError = undefined;
  let dependencies = undefined;

  licenseCrawler.dumpLicenses(options, (error, result) => {
    if (error) {
      dumpError = error;
    } else {
      const projects = result;

      dependencies = [];
      for (const project in projects) {
        if (Object.prototype.hasOwnProperty.call(projects, project)) {
          dependencies.push({
            name: project,
            repository: projects[project].repository,
          });
        }
      }
    }

    dumpDone = true;
  });
  deasync.loopWhile(() => !dumpDone);

  return {
    dependencies: dependencies,
    error: dumpError,
  };
}

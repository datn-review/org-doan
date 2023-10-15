const {makeMetroConfig} = require('@rnx-kit/metro-config');
const MetroSymlinksResolver = require('@rnx-kit/metro-resolver-symlinks');

module.exports = makeMetroConfig({
  projectRoot: __dirname,

  resolver: {
    resolveRequest: MetroSymlinksResolver(),
  },
});

// Find the project and workspace directories

// This can be replaced with `find-yarn-workspace-root`

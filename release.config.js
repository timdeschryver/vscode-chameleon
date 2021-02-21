module.exports = {
  branches: ['main'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/exec',
      {
        prepareCmd: 'node ./scripts/update-version ${nextRelease.version}',
      },
    ],
    '@semantic-release/github',
  ],
}

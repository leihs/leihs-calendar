module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  testEnvironmentOptions: { url: 'http://localhost/' },
  setupFiles: ['<rootDir>/setupTests.js'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/demo/dist/'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
};

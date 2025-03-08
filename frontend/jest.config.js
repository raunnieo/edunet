module.exports = {
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  // Changed regex to account for Windows paths
  transformIgnorePatterns: ["/node_modules/(?!(axios)/)"],
};

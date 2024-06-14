module.exports = {
  optimization: {
    usedExports: {
      enabled: true,
      minCoverage: 0.5,
      minSize: 1000
    },
    sideEffects: {
      inline: false,
      exclude: /node_modules/
    }
  }
};
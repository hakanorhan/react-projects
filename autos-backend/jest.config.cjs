module.exports = {
 roots: ['<rootDir>/src/tests'], // Verzeichnis, in dem Jest nach Testdateien suchen soll
  testMatch: ['**/*.test.ts'], // Muster für Testdateien
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Verwendet ts-jest für TypeScript-Dateien
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Dateiendungen, die Jest betrachten soll
  };
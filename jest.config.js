module.exports = {
  moduleDirectories: ["node_modules", "src"],
  moduleFileExtensions: ["js", "json", "ts"],
  roots: ["src"],
  testRegex: ".spec.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  coverageDirectory: "../coverage",
  testEnvironment: "node",
  moduleNameMapper: {
    "src/(.*)": "<rootDir>/src/$1",
  },
};

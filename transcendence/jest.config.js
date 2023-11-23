module.exports = {
    moduleFileExtensions: ["js", "json", "jsx"],
    testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|js?)$",
    transform: {
        "^.+\\.jsx?$": "babel-jest"
    },
    testPathIgnorePatterns: ["/node_modules/"],
    setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
    testEnvironment: 'jsdom'
};
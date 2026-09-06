module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEach: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        '\\.module\\.css$': 'identity-obj-proxy',
        '^@/(.*)$': '<rootDir>/src/$1',
    },
}
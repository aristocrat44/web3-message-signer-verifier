import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./", // root of your Next.js app
});

/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: "jsdom",
  collectCoverage: true,
  collectCoverageFrom: [
    "app/**/*.{ts,tsx,js,jsx}",
    "components/**/*.{ts,tsx,js,jsx}",
    "hooks/**/*.{ts,tsx,js,jsx}",
    "providers/**/*.{ts,tsx,js,jsx}",
  ],

  coverageDirectory: "coverage",
  coverageReporters: ["lcov", "text"],

  roots: [
    "<rootDir>/__tests__",
    "<rootDir>/app",
    "<rootDir>/components",
    "<rootDir>/hooks",
    "<rootDir>/providers",
  ],

  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],

  testPathIgnorePatterns: [
    "/node_modules/",
    "/.next/",
    "<rootDir>/public/",
    "<rootDir>/types/",
  ],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },

  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default createJestConfig(customJestConfig);

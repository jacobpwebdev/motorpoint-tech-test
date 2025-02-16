/** @type {import('ts-jest').JestConfigWithTsJest} **/
import fs from "fs";
import { pathsToModuleNameMapper } from "ts-jest";
const tsconfig = JSON.parse(fs.readFileSync("./tsconfig.json", "utf-8"));

export default {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, { prefix: "<rootDir>/" }),
};
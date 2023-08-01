import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "packages/api/graphql/**/*.graphql",
  documents: "packages/client/src/**/!(*.generated).{ts,tsx}",
  ignoreNoDocuments: true,
  generates: {
    "packages/client/src/graphql/types.ts": {
      plugins: ["typescript"],
    },
    "packages/client/src/graphql": {
      preset: "near-operation-file",
      presetConfig: {
        extension: ".generated.tsx",
        baseTypesPath: "types.ts",
      },
      plugins: ["typescript-operations", "typescript-urql"],
    },
  },
};

export default config;

import type { CodegenConfig } from "@graphql-codegen/cli";
import "dotenv/config";

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_POKEDEX_ENDPOINT,
  ignoreNoDocuments: true, // for a cleaner watch mode
  documents: ["./lib/mutations/*.ts", "./lib/queries/*.ts"],
  generates: {
    "./lib/graphql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;

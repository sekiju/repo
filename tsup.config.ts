import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/array.ts", "src/filepath.ts", "src/check.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  splitting: true,
})

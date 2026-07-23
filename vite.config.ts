import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  resolve: {
    // lottie-react ships a `browser` field pointing at a UMD build whose
    // default export doesn't unwrap correctly under Vite's dependency
    // pre-bundling. Prefer its real ESM build instead.
    mainFields: ["module", "browser", "main"],
  },
});

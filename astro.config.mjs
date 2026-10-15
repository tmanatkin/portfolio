// @ts-check
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  site: "https://tmanatkin.github.io",
  base: "/portfolio/",
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Sora",
      cssVariable: "--font-sans",
      weights: ["100 800"],
      styles: ["normal"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "JetBrains Mono",
      cssVariable: "--font-mono",
      weights: ["100 800"],
      styles: ["normal"],
      fallbacks: ["monospace"],
    },
  ],
});

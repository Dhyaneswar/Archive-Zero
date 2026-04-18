import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Archive Zero",
    short_name: "Archive Zero",
    description: "A finite luxury fashion archive built around numbered drops, identity, and emotional storytelling.",
    start_url: "/",
    display: "standalone",
    background_color: "#070608",
    theme_color: "#070608"
  };
}

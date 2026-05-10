import type { MetadataRoute } from "next";

const baseUrl = "https://moodscape-tau-ten.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/demo",
    "/community",
    "/events",
    "/explore",
    "/feed",
    "/map",
    "/vibe-lists",
    "/vibe-lists/create",
    "/route",
    "/moodboard",
    "/profile",
    "/premium",
    "/login",
    "/signup",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
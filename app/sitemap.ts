import type { MetadataRoute } from "next";

const baseUrl = "https://moodscape-ai-project.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/demo",
    "/community",
    "/creators",
    "/u/slowroma",
    "/u/bookishwalks",
    "/u/hiddenverde",
    "/u/afterdarkroma",
    "/u/gallerymood",
    "/u/goldenwalks",
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
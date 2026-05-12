import type { MetadataRoute } from "next";

const baseUrl = "https://moodscape-ai-project.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/privacy",
    "/terms",
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
    "/events/aperitivo-tramonto-aventino",
    "/explore",
    "/feed",
    "/map",
    "/vibe-lists",
    "/vibe-lists/create",
    "/routes",
    "/routes/roma-romantica-tramonto",
    "/routes/dark-academia-walk",
    "/routes/hidden-garden-route",
    "/routes/golden-hour-photo-walk",
    "/routes/neon-nightlife-route",
    "/my-routes",
    "/my-events",
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
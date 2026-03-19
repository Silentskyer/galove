import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/privacy", "/terms", "/reading/love", "/reading/work", "/reading/finance"];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route.startsWith("/reading/") ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}


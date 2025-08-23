module.exports = {
  siteUrl: "https://miracletouchspa.vercel.app",
  generateRobotsTxt: false, // We have custom robots.txt
  changefreq: "daily",
  priority: 0.8,
  sitemapSize: 7000,
  transform: async (config, path) => {
    // Custom priority for important pages
    const customPaths = {
      "/": { priority: 1.0, changefreq: "daily" },
      "/services": { priority: 0.9, changefreq: "daily" },
      "/contact": { priority: 0.9, changefreq: "weekly" },
      "/location": { priority: 0.8, changefreq: "weekly" },
      "/gallery": { priority: 0.7, changefreq: "weekly" },
      "/male": { priority: 0.8, changefreq: "weekly" },
      "/female": { priority: 0.8, changefreq: "weekly" },
    };

    if (customPaths[path]) {
      return {
        loc: path,
        changefreq: customPaths[path].changefreq,
        priority: customPaths[path].priority,
        lastmod: new Date().toISOString(),
      };
    }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },
  additionalPaths: async (config) => [
    await config.transform(config, "/"),
    await config.transform(config, "/services"),
    await config.transform(config, "/contact"),
    await config.transform(config, "/location"),
    await config.transform(config, "/gallery"),
    await config.transform(config, "/male"),
    await config.transform(config, "/female"),
  ],
};

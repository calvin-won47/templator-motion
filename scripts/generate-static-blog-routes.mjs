import fs from "fs";
import path from "path";

async function fetchBlogSlugs(strapiUrl, siteSlug, token) {
  const query = `${strapiUrl}/api/blog-posts?pagination[page]=1&pagination[pageSize]=200&fields[0]=slug&filters[site][slug][$eq]=${siteSlug}`;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const res = await fetch(query, { headers });
  if (!res.ok) throw new Error(`Failed to fetch blog slugs (${res.status})`);
  const json = await res.json();
  return (json?.data ?? [])
    .map((item) => item?.attributes?.slug || item?.slug)
    .filter(Boolean);
}

async function main() {
  const configPath = process.env.CONFIG_PATH || "./public/config.json";
  const distDir = process.env.DIST_DIR || "./dist";
  const token = process.env.STRAPI_API_TOKEN || "";

  if (!fs.existsSync(configPath)) {
    console.warn(`[blog-fallback] Config not found at ${configPath}, skip.`);
    return;
  }

  const cfg = JSON.parse(fs.readFileSync(configPath, "utf8"));
  const strapiUrl = cfg?.basic?.strapi_url;
  const siteSlug = cfg?.basic?.strapi_site_slug;
  if (!strapiUrl || !siteSlug) {
    console.warn("[blog-fallback] strapi_url or strapi_site_slug missing, skip.");
    return;
  }

  if (!fs.existsSync(path.join(distDir, "index.html"))) {
    console.warn(`[blog-fallback] dist/index.html missing under ${distDir}, skip.`);
    return;
  }

  try {
    const slugs = await fetchBlogSlugs(strapiUrl, siteSlug, token);
    if (!slugs.length) {
      console.log(`[blog-fallback] No blog posts found for site ${siteSlug}, skip.`);
      return;
    }

    const templateHtml = fs.readFileSync(path.join(distDir, "index.html"), "utf8");
    slugs.forEach((slug) => {
      const outDir = path.join(distDir, "blog", slug);
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, "index.html"), templateHtml, "utf8");
    });

    console.log(`[blog-fallback] Created ${slugs.length} static fallbacks for site ${siteSlug}.`);
  } catch (error) {
    console.warn(`[blog-fallback] Skip creating fallbacks: ${error?.message || error}`);
  }
}

main();

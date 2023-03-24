const fs = require('fs');
const path = require('path');

const baseUrl = process.env.BASE_URL || 'http://example.com';

const robotsTemplate = `
Sitemap: ${new URL(path.join('en', 'sitemap.xml'), baseUrl).href}
Sitemap: ${new URL(path.join('sitemap.xml'), baseUrl).href}

User-agent: *
Disallow: /img/*
Disallow: /ru/*
`.trim();

fs.writeFileSync(
  path.join(process.cwd(), 'static', 'robots.txt'),
  robotsTemplate
);

const fs = require('fs');
const path = require('path');

const robotsTemplate = `
Sitemap: ${new URL(path.join('en', 'sitemap.xml'), process.env.BASE_URL).href}
Sitemap: ${new URL(path.join('sitemap.xml'), process.env.BASE_URL).href}

User-agent: *
Disallow: /img/*
`.trim();

fs.writeFileSync(path.join(process.cwd(), 'static', 'robots.txt'), robotsTemplate);

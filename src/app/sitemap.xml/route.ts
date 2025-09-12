export function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url><loc>https://example.com/en</loc></url>
    <url><loc>https://example.com/en/about</loc></url>
    <url><loc>https://example.com/en/services</loc></url>
    <url><loc>https://example.com/en/projects</loc></url>
    <url><loc>https://example.com/en/contact</loc></url>
  </urlset>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}



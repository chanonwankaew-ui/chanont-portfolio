export const dynamic = 'force-static';

// ใช้ Route Handler เพื่อ serve robots.txt แบบ raw text
// รองรับ Content-Signal directives ตาม IETF draft-romm-aipref-contentsignals
// ซึ่ง MetadataRoute.Robots ของ Next.js ยังไม่รองรับ directive เหล่านี้
export function GET() {
  const baseUrl = 'https://chanontwankaew.com';

  const body = `# chanontwankaew.com – robots.txt
# Content Signals: https://contentsignals.org/
# IETF draft: https://datatracker.ietf.org/doc/draft-romm-aipref-contentsignals/

# ===== Search Engines (อนุญาต crawling, ห้าม AI training) =====
User-agent: Googlebot
Allow: /
Content-Signal: ai-train=no, search=yes, ai-input=no

User-agent: Bingbot
Allow: /
Content-Signal: ai-train=no, search=yes, ai-input=no

User-agent: Slurp
Allow: /
Content-Signal: ai-train=no, search=yes, ai-input=no

User-agent: DuckDuckBot
Allow: /
Content-Signal: ai-train=no, search=yes, ai-input=no

# ===== AI Dataset Crawlers (บล็อกทั้งหมด) =====
User-agent: GPTBot
Disallow: /
Content-Signal: ai-train=no, search=no, ai-input=no

User-agent: CCBot
Disallow: /
Content-Signal: ai-train=no, search=no, ai-input=no

User-agent: Bytespider
Disallow: /
Content-Signal: ai-train=no, search=no, ai-input=no

User-agent: ClaudeBot
Disallow: /
Content-Signal: ai-train=no, search=no, ai-input=no

User-agent: anthropic-ai
Disallow: /
Content-Signal: ai-train=no, search=no, ai-input=no

User-agent: Diffbot
Disallow: /
Content-Signal: ai-train=no, search=no, ai-input=no

# ===== Default policy (อนุญาต search, ห้าม AI training/input) =====
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Content-Signal: ai-train=no, search=yes, ai-input=no

Sitemap: ${baseUrl}/sitemap.xml
Host: ${baseUrl}`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

/**
 * Cloudflare Pages / Workers Edge Middleware
 * Implements Markdown Content Negotiation for AI Agents (https://isitagentready.com/ & https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/)
 */
export default {
  async fetch(request, env) {
    const accept = request.headers.get("Accept") || "";
    const url = new URL(request.url);

    // Check if client explicitly requests text/markdown (content negotiation)
    const wantsMarkdown = accept
      .split(",")
      .some((type) => type.split(";")[0].trim().toLowerCase() === "text/markdown");

    if (wantsMarkdown && (url.pathname === "/" || url.pathname === "" || url.pathname === "/index.html")) {
      const markdownUrl = new URL("/index.md", request.url);
      const markdownRes = await env.ASSETS.fetch(markdownUrl);
      if (markdownRes.ok) {
        const text = await markdownRes.text();
        const tokens = Math.ceil(text.length / 4);
        return new Response(text, {
          status: 200,
          headers: {
            "Content-Type": "text/markdown; charset=utf-8",
            "Vary": "Accept",
            "x-markdown-tokens": String(tokens),
            "Cache-Control": "public, max-age=3600"
          }
        });
      }
    }

    // Default response for standard browser requests
    const response = await env.ASSETS.fetch(request);
    const newHeaders = new Headers(response.headers);
    newHeaders.set("Vary", "Accept");
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders
    });
  }
};

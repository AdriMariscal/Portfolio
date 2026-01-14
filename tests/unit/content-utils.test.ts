import { describe, expect, it } from "vitest";
import { computeBackHref, slugifyTag, toSlug } from "../../src/lib/content";

describe("Content utilities", () => {
  it("normalizes diacritics and symbols for slugs", () => {
    expect(toSlug("  Diseño Web Ágil  ")).toBe("diseno-web-agil");
    expect(toSlug("Astro & SEO")).toBe("astro-seo");
  });

  it("slugifies tags by trimming and replacing spaces", () => {
    expect(slugifyTag("  Web Performance ")).toBe("web-performance");
  });

  it("computes safe internal back hrefs", () => {
    expect(computeBackHref("/blog/post")).toBe("/blog/post");
    expect(computeBackHref("https://example.com/tags/astro", "https://example.com"))
      .toBe("/tags/astro");
    expect(computeBackHref("https://malicious.com", "https://example.com"))
      .toBe("/blog");
  });
});

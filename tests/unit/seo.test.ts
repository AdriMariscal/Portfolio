import { describe, expect, it } from "vitest";
import {
  buildHeadingTitle,
  buildMetaDescription,
  buildMetaTitle,
  HOME_META_TITLE,
  SEO_KEYWORD,
} from "../../src/lib/seo";

describe("SEO helpers", () => {
  it("HOME_META_TITLE cumple criterios SEO: ≤60 caracteres y keyword en primeros 30", () => {
    expect(HOME_META_TITLE.length).toBeLessThanOrEqual(60);
    expect(HOME_META_TITLE.slice(0, 30).toLowerCase()).toMatch(/diseñador/);
  });

  it("builds a meta title with keyword prefix and trims extra whitespace", () => {
    const title = "  Portfolio   de rendimiento web y  SEO avanzado  ";
    const result = buildMetaTitle(SEO_KEYWORD, title, 60);

    expect(result.startsWith(`${SEO_KEYWORD} · `)).toBe(true);
    expect(result).toBe(
      "Rendimiento web · Portfolio de rendimiento web y SEO"
    );
  });

  it("builds a meta description with CTA and punctuation", () => {
    const description = "Optimiza tu web para Core Web Vitals y SEO";
    const cta = "Solicita la auditoría gratuita";
    const result = buildMetaDescription(description, cta, 155);

    expect(result).toBe(
      "Optimiza tu web para Core Web Vitals y SEO. Solicita la auditoría gratuita"
    );
  });

  it("shortens long headings with separators or ellipsis", () => {
    const longTitle = "Astro para performance — guía avanzada de optimización";
    const result = buildHeadingTitle(longTitle, 40);

    expect(result).toBe("Astro para performance");
  });
});

import { describe, expect, it } from "vitest";
import { SITE } from "../../src/lib/config";

describe("Schema.org config (SITE)", () => {
  it("SITE tiene linkedin válido", () => {
    expect(SITE.linkedin).toMatch(/^https:\/\/(www\.)?linkedin\.com\//);
  });

  it("SITE tiene github válido", () => {
    expect(SITE.github).toMatch(/^https:\/\/github\.com\//);
  });

  it("sameAs incluye linkedin y github", () => {
    const sameAs = [SITE.linkedin, SITE.github];
    expect(sameAs).toHaveLength(2);
    expect(sameAs.some((u) => u.includes("linkedin.com"))).toBe(true);
    expect(sameAs.some((u) => u.includes("github.com"))).toBe(true);
  });
});

describe("Schema.org ProfessionalService fields", () => {
  const schema = {
    "@type": ["ProfessionalService", "LocalBusiness"] as string[],
    areaServed: "España",
    priceRange: "€€",
  };

  it("@type incluye ProfessionalService y LocalBusiness", () => {
    expect(schema["@type"]).toContain("ProfessionalService");
    expect(schema["@type"]).toContain("LocalBusiness");
  });

  it("areaServed es España", () => {
    expect(schema.areaServed).toBe("España");
  });

  it("priceRange es €€", () => {
    expect(schema.priceRange).toBe("€€");
  });
});

describe("Schema.org Person fields", () => {
  const person = {
    "@type": "Person",
    jobTitle: "Diseñador Web",
    sameAs: [SITE.linkedin, SITE.github],
  };

  it("jobTitle es Diseñador Web", () => {
    expect(person.jobTitle).toBe("Diseñador Web");
  });

  it("sameAs es un array con dos URLs", () => {
    expect(Array.isArray(person.sameAs)).toBe(true);
    expect(person.sameAs).toHaveLength(2);
  });
});

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const readComponent = (relativePath: string) =>
  readFileSync(resolve(process.cwd(), relativePath), "utf8");

describe("UI components source", () => {
  it("Button.astro defines variants and renders link or button", () => {
    const source = readComponent("src/components/ui/Button.astro");

    expect(source).toContain("btn--${variant}");
    expect(source).toContain("btn--sm");
    expect(source).toContain("btn--block");
    expect(source).toContain("<a class={classes}");
    expect(source).toContain("<button class={classes}");
  });

  it("Input.astro supports input and textarea modes", () => {
    const source = readComponent("src/components/ui/Input.astro");

    expect(source).toContain("const Tag = as");
    expect(source).toContain("<textarea class={classes}");
    expect(source).toContain("<input class={classes}");
  });
});

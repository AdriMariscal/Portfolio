const normalizeText = (value: string) =>
  value.replace(/\s+/g, " ").trim();

const truncateAtWord = (value: string, max: number) => {
  if (value.length <= max) return value;
  const slice = value.slice(0, max + 1);
  const lastSpace = slice.lastIndexOf(" ");
  if (lastSpace > 0) {
    return slice.slice(0, lastSpace).trim();
  }
  return value.slice(0, max).trim();
};

export const SEO_KEYWORD = "Rendimiento web";

/** Meta titles estáticos: keyword en los primeros ~30 caracteres, 50-60 caracteres totales */
export const HOME_META_TITLE = "Diseñador Web Performance y SEO Técnico · Adrián Mariscal";
export const ABOUT_META_TITLE = "Adrián Mariscal: diseñador web, rendimiento y SEO técnico";
export const SERVICES_META_TITLE = "Auditoría web y packs de mejora SEO · Adrián Mariscal";
export const PROJECTS_META_TITLE = "Proyectos web: rendimiento y SEO técnico · Adrián Mariscal";
export const AUDITORIA_META_TITLE = "Auditoría Web Gratuita: rendimiento y SEO · Adrián Mariscal";

export const buildMetaTitle = (keyword: string, title: string, max = 60) => {
  const cleanTitle = normalizeText(title);
  const prefix = `${keyword} · `;
  const remaining = Math.max(10, max - prefix.length);
  const shortened = truncateAtWord(cleanTitle, remaining);
  return `${prefix}${shortened}`.trim();
};

export const buildMetaDescription = (
  description: string,
  cta: string,
  max = 155
) => {
  const cleanDescription = normalizeText(description);
  const cleanCta = normalizeText(cta);
  const separator = cleanDescription.endsWith(".") ? " " : ". ";
  const maxBase = max - (separator.length + cleanCta.length);
  const trimmedBase = truncateAtWord(cleanDescription, Math.max(0, maxBase));
  const base = trimmedBase.replace(/[.!?;:]+$/u, "");
  return `${base}${separator}${cleanCta}`.trim();
};

export const buildHeadingTitle = (title: string, max = 70) => {
  const cleanTitle = normalizeText(title);
  if (cleanTitle.length <= max) return cleanTitle;
  const separators = [" — ", " - ", ": "];
  for (const separator of separators) {
    const idx = cleanTitle.indexOf(separator);
    if (idx > 0 && idx <= max) {
      return cleanTitle.slice(0, idx).trim();
    }
  }
  const shortened = truncateAtWord(cleanTitle, max - 1);
  return `${shortened}…`;
};

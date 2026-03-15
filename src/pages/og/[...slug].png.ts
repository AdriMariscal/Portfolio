// src/pages/og/[...slug].png.ts
import type { APIContext, GetStaticPaths } from 'astro';
import satori from 'satori';
import sharp from 'sharp';
import { getCollection } from 'astro:content';
import { SITE } from '@/lib/config';

interface OGProps {
  title: string;
  description: string;
  type: string;
  cta: string;
}

// ---------------------------------------------------------------------------
// Font loading — Promise-based cache so the font is fetched only once per build
// ---------------------------------------------------------------------------
let soraFontPromise: Promise<ArrayBuffer> | undefined;

async function loadGoogleFont(family: string, weight: number): Promise<ArrayBuffer> {
  // CSS API v1 always returns TTF format — required by satori (no woff2 support)
  const cssUrl = `https://fonts.googleapis.com/css?family=${encodeURIComponent(family)}:${weight}`;
  const css = await fetch(cssUrl).then((r) => r.text());

  const matches = [...css.matchAll(/url\(([^)]+\.ttf)\)/g)];
  if (!matches.length) {
    throw new Error(`No TTF URL found in Google Fonts CSS for ${family} ${weight}`);
  }
  const fontUrl = matches[matches.length - 1][1];
  return fetch(fontUrl).then((r) => r.arrayBuffer());
}

function getSoraFont(): Promise<ArrayBuffer> {
  if (!soraFontPromise) {
    soraFontPromise = loadGoogleFont('Sora', 700);
  }
  return soraFontPromise;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, '') + '…';
}

// ---------------------------------------------------------------------------
// OG image layout (satori element tree — 1200 × 630)
// Palette: Charcoal 900 bg, Sand 500 accent, Teal 500 domain
// ---------------------------------------------------------------------------
function buildElement(props: OGProps): object {
  const { title, description, type, cta } = props;
  // Reduce description length slightly to leave room for the CTA line
  const desc = truncate(description, 100);
  const titleFontSize = title.length > 65 ? '42px' : title.length > 45 ? '50px' : '58px';

  return {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        width: '1200px',
        height: '630px',
        backgroundColor: '#2F3437',
        padding: '64px',
        fontFamily: '"Sora"',
      },
      children: {
        type: 'div',
        props: {
          style: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            borderLeft: '8px solid #E2CC96',
            paddingLeft: '52px',
          },
          children: [
            // ── Badge ──────────────────────────────────────────────────────
            {
              type: 'div',
              props: {
                style: { display: 'flex', marginBottom: '28px' },
                children: {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      backgroundColor: '#E2CC96',
                      color: '#2F3437',
                      padding: '8px 22px',
                      borderRadius: '6px',
                      fontSize: '22px',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    },
                    children: type,
                  },
                },
              },
            },
            // ── Title ──────────────────────────────────────────────────────
            {
              type: 'div',
              props: {
                style: {
                  display: 'flex',
                  color: '#F9FAFB',
                  fontSize: titleFontSize,
                  fontWeight: 700,
                  lineHeight: 1.2,
                  marginBottom: '20px',
                  flexGrow: 1,
                  alignItems: 'flex-start',
                },
                children: title,
              },
            },
            // ── Description ────────────────────────────────────────────────
            {
              type: 'div',
              props: {
                style: {
                  display: 'flex',
                  color: '#9CA3AF',
                  fontSize: '24px',
                  lineHeight: 1.5,
                  marginBottom: '18px',
                },
                children: desc,
              },
            },
            // ── CTA ────────────────────────────────────────────────────────
            {
              type: 'div',
              props: {
                style: {
                  display: 'flex',
                  color: '#2DD4BF',
                  fontSize: '24px',
                  fontWeight: 700,
                  marginBottom: '20px',
                },
                children: `${cta} →`,
              },
            },
            // ── Footer ─────────────────────────────────────────────────────
            {
              type: 'div',
              props: {
                style: {
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid #4B555B',
                  paddingTop: '20px',
                },
                children: [
                  {
                    type: 'div',
                    props: {
                      style: {
                        display: 'flex',
                        color: '#F9FAFB',
                        fontSize: '26px',
                        fontWeight: 700,
                      },
                      children: 'Adrián Mariscal',
                    },
                  },
                  {
                    type: 'div',
                    props: {
                      style: {
                        display: 'flex',
                        color: '#2DD4BF',
                        fontSize: '24px',
                        fontWeight: 700,
                      },
                      children: 'adrianmariscal.es',
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    },
  };
}

// ---------------------------------------------------------------------------
// Static paths — blog posts + projects + key static pages
// ---------------------------------------------------------------------------
export const getStaticPaths: GetStaticPaths = async () => {
  const [blogPosts, projects] = await Promise.all([
    getCollection('blog', ({ data }) => !data.draft),
    getCollection('projects', ({ data }) => data.published !== false),
  ]);

  const staticPages: Array<OGProps & { slug: string }> = [
    {
      slug: 'home',
      title: 'Diseñador Web Performance y SEO Técnico · Adrián Mariscal',
      description: SITE.description ?? '',
      type: 'Portfolio',
      cta: 'Solicita tu auditoría gratuita',
    },
    {
      slug: 'about',
      title: 'Adrián Mariscal: diseñador web, rendimiento y SEO técnico',
      description: 'Historia, metodología y valores de Adrián Mariscal, diseñador web especializado en rendimiento.',
      type: 'About',
      cta: 'Contacta conmigo',
    },
    {
      slug: 'services',
      title: 'Auditoría web y packs de mejora SEO · Adrián Mariscal',
      description: 'Auditoría gratuita + informe base en 48-72 h + packs de mejora cerrados.',
      type: 'Servicios',
      cta: 'Ver los packs de mejora',
    },
    {
      slug: 'auditoria-web',
      title: 'Auditoría Web Gratuita: rendimiento y SEO',
      description: 'Solicita tu auditoría de rendimiento y SEO técnico. Informe en 48-72 h.',
      type: 'Auditoría',
      cta: 'Solicita tu auditoría',
    },
    {
      slug: 'contact',
      title: 'Contacto · Adrián Mariscal',
      description: 'Hablemos de tu proyecto web. Rendimiento, SEO técnico y UX con Astro.',
      type: 'Contacto',
      cta: 'Escríbeme',
    },
    {
      slug: 'projects',
      title: 'Proyectos web: rendimiento y SEO técnico · Adrián Mariscal',
      description: 'Proyectos propios enfocados en rendimiento web, SEO técnico y UX con resultados medibles.',
      type: 'Proyectos',
      cta: 'Explora los casos',
    },
    {
      slug: 'blog',
      title: 'Blog de rendimiento web y SEO técnico · Adrián Mariscal',
      description: 'Artículos sobre rendimiento web, Astro, SEO técnico, Node y estrategia digital aplicada.',
      type: 'Blog',
      cta: 'Explora los artículos',
    },
  ];

  return [
    ...blogPosts.map((post) => ({
      params: { slug: `blog/${post.slug}` },
      props: {
        title: String(post.data.title ?? SITE.title),
        description: String(post.data.description ?? SITE.description ?? ''),
        type: 'Blog',
        cta: 'Leer el artículo',
      } satisfies OGProps,
    })),
    ...projects.map((project) => ({
      params: { slug: `projects/${project.slug}` },
      props: {
        title: String((project.data as Record<string, unknown>).title ?? SITE.title),
        description: String(
          (project.data as Record<string, unknown>).description ?? SITE.description ?? ''
        ),
        type: 'Proyecto',
        cta: 'Ver el proyecto',
      } satisfies OGProps,
    })),
    ...staticPages.map(({ slug, title, description, type, cta }) => ({
      params: { slug },
      props: { title, description, type, cta } satisfies OGProps,
    })),
  ];
};

// ---------------------------------------------------------------------------
// Request handler — generates PNG from satori SVG
// ---------------------------------------------------------------------------
export async function GET({ props }: APIContext) {
  const { title, description, type, cta } = props as OGProps;

  const font = await getSoraFont();
  const element = buildElement({ title, description, type, cta });

  const svg = await satori(element as Parameters<typeof satori>[0], {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Sora',
        data: font,
        weight: 700,
        style: 'normal',
      },
    ],
  });

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}

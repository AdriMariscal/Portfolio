/**
 * Tipo para un testimonio de prueba social (auditorías reales con permiso).
 * nameOrInitials permite anonimización; draft: true evita publicar hasta tener consentimiento.
 */
export interface TestimonialData {
  /** Nombre completo o iniciales (ej. "María G.", "M.G.") — anonimizable */
  nameOrInitials: string;
  /** Empresa o sector (ej. "E-commerce", "Startup B2B") */
  companyOrSector: string;
  /** Texto del testimonio */
  text: string;
  /** Resultado cuantificado si aplica (ej. "LCP de 4.2s a 1.1s") */
  result?: string;
  /** Si true, no se muestra en producción hasta tener contenido/consentimiento real */
  draft?: boolean;
}

/** Lista de testimonios. En producción solo se muestran los que tienen draft !== true. */
export const testimonials: TestimonialData[] = [
  {
    nameOrInitials: "Cliente piloto",
    companyOrSector: "Sector digital",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. La auditoría nos dio un plan claro por prioridades y el informe base nos permitió decidir sin compromiso. Recomendamos el proceso.",
    result: "Informe base en 48h",
    draft: true,
  },
];

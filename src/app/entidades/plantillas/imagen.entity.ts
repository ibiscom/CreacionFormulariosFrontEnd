/** Imagen de encabezado o pie de página de una plantilla (Imagen del legado). */
export interface ImagenEntity {
  nombre: string;
  /** Contenido codificado en base64, como lo guarda el legado. */
  contenidoBase64?: string;
}

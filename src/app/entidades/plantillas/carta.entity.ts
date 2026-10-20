import { BooleanString } from '../forms-captura/boolean-string.type';
import { ImagenEntity } from './imagen.entity';

/**
 * Plantilla (carta) asociada a un formulario. Refleja Carta.java del legado:
 * un cuerpo HTML con variables del formulario más la configuración de página.
 */
export interface CartaEntity {
  idCarta?: string;
  nombreCarta: string;
  descripcionCarta: string;
  htmlCarta: string;

  /** Formulario al que pertenece y si es de captura o de consulta. */
  nombreFormulario?: string;
  tipoFormulario?: 'Captura' | 'Consulta';

  tamanoHoja?: string;
  margenArriba?: string;
  margenAbajo?: string;
  margenIzquierdo?: string;
  margenDerecho?: string;

  imagenEncabezado?: ImagenEntity;
  imagenPiePagina?: ImagenEntity;
  anchoEncabezado?: string;
  altoEncabezado?: string;
  anchoPiePagina?: string;
  altoPiePagina?: string;

  generarPDF?: BooleanString;
  generarWord?: BooleanString;
  permitirFirma?: BooleanString;

  nombreRutina?: string;
  serie?: string;
  tipoDocumento?: string;
  compania?: string;
}

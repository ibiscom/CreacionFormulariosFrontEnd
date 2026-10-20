import { BooleanString } from './boolean-string.type';
import { ComponenteBaseEntity } from './componente-base.entity';
import { RutaMailEntity } from './ruta-mail.entity';
import { ValorStringEntity } from './valor-string.entity';

/** Componente Mail */
export interface MailEntity extends ComponenteBaseEntity {
  tipoComponente: 'Mail' | string;
  idColumna: string;
  valor: ValorStringEntity;
  valorDefecto: ValorStringEntity;

  /** Rutas de los parámetros del mensaje (Mail.java). */
  rutaDestinos?: RutaMailEntity[];
  rutaDestinosCC?: RutaMailEntity[];
  rutaDestinosCCO?: RutaMailEntity[];
  rutaAsunto?: RutaMailEntity[];
  rutaPlantillaMensaje?: RutaMailEntity[];

  /** Parámetros resueltos que se muestran en la interfaz de envío (Mail.java). */
  cadenaDestinos?: string;
  cadenaDestinosCC?: string;
  cadenaDestinosCCO?: string;
  asunto?: string;
  plantillaMensaje?: string;
  nombresArchivosAdjuntos?: string[];
  mensajes?: string[];
  /** Controla la ventana "Ver información correo" dentro del formulario. */
  abiertoPoPup?: BooleanString;

  /** Opciones de envío configurables desde el modal de configuración de mail. */
  permiteModificarParametros?: BooleanString;
  utilizaPlantillaHTML?: BooleanString;
  permitirEnvioManual?: BooleanString;
  permiteAdjuntarArchivos?: BooleanString;
  agregarPlantillasFormMail?: BooleanString;
  permitirEnvioAutomatico?: BooleanString;
}

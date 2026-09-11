import { BooleanString } from './boolean-string.type';

/** Campos comunes de componentes (según el JSON) */
export interface ComponenteBaseEntity {
  cambiado: BooleanString;
  observadores: string;
  id?: string; // Algunos componentes lo traen
  nombre: string;
  tipoDato: string;
  tipoComponente: string;
  descripcion: string;
  valor?: { class: string; [key: string]: any };
  valorDefecto?: { class: string; [key: string]: any };
  ultimoId: string; // viene como número en string
  idColumna?: string;
  error?: string;
  obligatorio: BooleanString;
  obligatorioFuncional: BooleanString;
  readOnly: BooleanString;
  guardado: BooleanString;
  cumpleValidaciones: BooleanString;
  opcionExtra: BooleanString;
  integerType: BooleanString;
  textType: BooleanString;
  dateType: BooleanString;
  separadorType: BooleanString;
  checkBoxType: BooleanString;
  textAreaType: BooleanString;
  listBoxType: BooleanString;
  listBoxCustomizedType: BooleanString;
  radioButtonType: BooleanString;
  listCompuestaType: BooleanString;
  grillaType: BooleanString;
  labelType: BooleanString;
  cargaMasivaType: BooleanString;
  mailType: BooleanString;
  searchButtonType: BooleanString;
  refreshButtonType: BooleanString;
  saveButtonType: BooleanString;
  linkType: BooleanString;
  linkToAFormType: BooleanString;
  linkToDifferentFormType?: BooleanString;
  linkFormToIfacesType: BooleanString;
  validacionesExpresiones: string;
  style: string;
  styleClass: string;
  styleContenedor: string;
  styleClassContenedor: string;
  columnClasses: string;
  claseEstilo: string;
  visible: BooleanString;
  filtro: BooleanString;
  relacionObservadorColumna: string;
  tablaDetalleType: BooleanString;
  richTextType: BooleanString;
  estaSujeto: BooleanString;
  esOrigenValidacion: BooleanString;
  componentesRelacionados: string;
  componentesNuevaValidacionEntreComponentes: string;
  arbolesExpresionNuevaValidacionEntreComponentes: string;
  operadorAritmetico: string;
  formato?: string;
  formatoMoneda?: string;
  soloTexto?: BooleanString;

  // List and query-related properties
  orientacion?: string;
  cantidadObservables?: string;
  listaIdentificadores?: string;
  listaLabels?: string;
  nombresLable?: { [key: string]: string };
  items?: any[];
  condiciones?: string;
  listaAtributosResticcion?: string;
  mapaCondiciones?: string;
  consultaGenerica?: string;
  orderBy?: string;
  query?: string;
  select?: string;
  where?: string;
  whereTemp?: string;
  whereCon?: string;
  labelOrganizable?: string;
  mapaAtributos?: string;
  mapaCondicionesTot?: { [key: string]: any };
  columnasMostrablesSeleccionadas?: { [key: string]: any };

  // Button-specific properties
  utilizaImagen?: BooleanString;
  ubicacionImagen?: string;
  expresionLogicaFiltro?: string;
  nombreEntidad?: string;
  mostrarLink?: BooleanString;

  // Table-specific properties
  columnaRelacion?: string;
  columnaPrimaria?: string;
  nombreAtributoPadreUnoAUno?: string;
  nombreAtributoHijoUnoAUno?: string;
  mensajeError?: string;
  pagSize?: string;
  columnasModel?: { [key: string]: string };
  nombresColumnas?: { [key: string]: any };
  nombresColumnasTabla?: { [key: string]: string };
  nombresOrganizados?: { [key: string]: string };
  seleccionado?: string;
  listaNombresAtributos?: string;
  posicionesNombres?: { [key: string]: any };
  formatosColumnas?: { [key: string]: any };
  nombreFormulario?: string;
  nombreFormularioEdicion?: string;
  mostrarBotonAgregar?: string;
  mostrarBotonBuscar?: string;
  mostrarBotonEliminar?: string;
  detallesASerAgregados?: string;
  edicion?: string;
  valoresTemporales?: string;
  nombresColumnasRelacionadasMostrar?: string;
  cantidadMinima?: string;
  textoHTMLTabla?: string;
  listValuesForSortQuery?: { [key: string]: any };
  valueSelectedSort?: string;
  archivoConfString?: string;
  nameArchivoConf?: string;
  nombreClaseCarga?: string;
  atributosSeleccionadosTransportar?: string[];
  nombreAtributoLista?: string;
  nombreAtributoSeleccionado?: string;
}

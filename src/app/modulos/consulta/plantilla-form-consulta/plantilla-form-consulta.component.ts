import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponenteBaseEntity } from '../../../entidades/forms-captura/componente-base.entity';
import { ComponentesEntity } from '../../../entidades/forms-captura/componentes.entity';
import { FormularioJSONEntity } from '../../../entidades/forms-captura/formulario-json.entity';
import { SeccionEntity } from '../../../entidades/forms-captura/seccion.entity';
import { SelectItemEntity } from '../../../entidades/forms-captura/select-item.entity';
import { getFieldPayloadValue, setFieldPayloadValue } from '../../../utilidades/field-value.util';
import { CargaMasivaComponent } from '../../captura/plantilla-form-captura/carga-masiva/carga-masiva.component';
import { InPutTextAreaComponent } from '../../captura/plantilla-form-captura/in-put-text-area/in-put-text-area.component';
import { InPutTextComponent } from '../../captura/plantilla-form-captura/in-put-text/in-put-text.component';
import { LabelComponent } from '../../captura/plantilla-form-captura/label/label.component';
import { LinkFormToIcefacesComponent } from '../../captura/plantilla-form-captura/link-form-to-icefaces/link-form-to-icefaces.component';
import { LinkToAFormComponent } from '../../captura/plantilla-form-captura/link-to-a-form/link-to-a-form.component';
import { LinkToDifferentFormComponent } from '../../captura/plantilla-form-captura/link-to-different-form/link-to-different-form.component';
import { MailComponent } from '../../captura/plantilla-form-captura/mail/mail.component';
import { OutPutLinkComponent } from '../../captura/plantilla-form-captura/out-put-link/out-put-link.component';
import { RefreshButtonComponent } from '../../captura/plantilla-form-captura/refresh-button/refresh-button.component';
import { SaveButtonComponent } from '../../captura/plantilla-form-captura/save-button/save-button.component';
import { SearchButtonComponent } from '../../captura/plantilla-form-captura/search-button/search-button.component';
import { SelectBooleanCheckBoxComponent } from '../../captura/plantilla-form-captura/select-boolean-check-box/select-boolean-check-box.component';
import { SelectInPutDateComponent } from '../../captura/plantilla-form-captura/select-in-put-date/select-in-put-date.component';
import { SelectOneListBoxCustomizedComponent } from '../../captura/plantilla-form-captura/select-one-list-box-customized/select-one-list-box-customized.component';
import { SelectOneListBoxComponent } from '../../captura/plantilla-form-captura/select-one-list-box/select-one-list-box.component';
import { SelectOneRadioComponent } from '../../captura/plantilla-form-captura/select-one-radio/select-one-radio.component';
import { MessageUtil } from '../../../utilidades/message.util';
import { Constants } from '../../../utilidades/constants';
import { PlantillaFormConsultaService } from './plantilla-form-consulta.service';
import { FormularioConsultaJSONEntity } from '../../../entidades/forms-consulta/formulario-consulta-json.entity';
import { SeccionesFormularioEntity } from '../../../entidades/forms-captura/secciones-formulario.entity';

@Component({
  selector: 'frm-plantilla-form-consulta',
  imports: [
    FormsModule,
    InPutTextComponent,
    InPutTextAreaComponent,
    SelectInPutDateComponent,
    SelectOneListBoxComponent,
    SelectOneListBoxCustomizedComponent,
    SelectBooleanCheckBoxComponent,
    SelectOneRadioComponent,
    CargaMasivaComponent,
    LabelComponent,
    OutPutLinkComponent,
    LinkToAFormComponent,
    LinkToDifferentFormComponent,
    LinkFormToIcefacesComponent,
    SaveButtonComponent,
    SearchButtonComponent,
    RefreshButtonComponent,
    MailComponent,
  ],
  templateUrl: './plantilla-form-consulta.component.html',
  styleUrl: './plantilla-form-consulta.component.scss',
})
export class PlantillaFormConsultaComponent {
  @Input() public id?: string;
  @Input() public modo?: string;
  public formulario: FormularioConsultaJSONEntity = {} as FormularioConsultaJSONEntity;
  public mensajes: string[] = [];
  public componentValues: Record<string, string | boolean> = {};
  public clicksGuardar = 0;
  public hayCartas = true;
  public mostrarCartas = true;
  public cartaSeleccionada = 'cartaA';
  public tipoHoja = 'letter';
  public popupFirmaVisible = false;
  public ventanaAyudaVisible = false;
  public popupMensajePostTerminacionTareaVisible = false;
  public popupMensajeVisualizarErroresEnvioMailVisible = false;
  public mensajePostTerminacionTarea = 'La tarea fue finalizada correctamente.';
  public mensajeNoEnvioMail = 'No fue posible enviar todos los correos configurados.';
  public urlPopupFirma = 'about:blank';

  public constructor(private plantillaFormConsultaService: PlantillaFormConsultaService) {}

  ngOnInit(): void {
    if (!this.modo) {
      this.modo = 'ver'; // Valor predeterminado si no se proporciona un modo
    }
    this.consultarFormulario();
  }

  private consultarFormulario(): void {
    if (!this.id) {
      console.error('No se proporcionó un ID de formulario.');
      return;
    }

    this.plantillaFormConsultaService.getFormulario(this.id).subscribe({
      next: (response) => {
        this.formularioInput = this.parseFormularioResponse(this.extractPayload(response));
        console.debug('Formulario cargado:', this.formularioInput?.titulo);
        console.debug('Secciones', this.formularioInput?.seccionesFormularioConsulta);
      },
      error: (error) => {
        console.error('Error al cargar el formulario:', error);
        this.formularioInput = undefined;
        this.mensajes.push(
          MessageUtil.buildErrorMessageFrmResponse(Constants.ERR_VER_FORMULARIO, error),
        );
      },
    });
  }

  @Input() public set formularioInput(value: FormularioConsultaJSONEntity | undefined) {
    if (!value) {
      //Si no se coloca valor, se coloca un formulario de ejemplo para pruebas
      this.formulario = {
        titulo: 'Formulario de consulta',
        descripcion: 'Ejemplo de formulario de consulta.',
        seccionesFormularioConsulta: {
          Seccion_1: {
            titulo: 'Datos básicos',
            descripcion: 'Sección de ejemplo para consulta y navegación.',
            guardado: 'false',
            expandido: 'true',
            componentesIzq: {
              txtNumero: this.createComponent({
                id: 'txtNumero',
                nombre: 'Número',
                tipoComponente: 'InPutText',
                textType: 'true',
                valor: '1001',
              }),
              txtObservacion: this.createComponent({
                id: 'txtObservacion',
                nombre: 'Observación',
                tipoComponente: 'InPutTextArea',
                textAreaType: 'true',
                valor: '',
              }),
              chkActivo: this.createComponent({
                id: 'chkActivo',
                nombre: 'Activo',
                tipoComponente: 'SelectBooleanCheckBox',
                checkBoxType: 'true',
                valor: 'true',
              }),
            },
            componentesCent: {
              selectTipo: this.createComponent({
                id: 'selectTipo',
                nombre: 'Tipo',
                tipoComponente: 'SelectOneListBox',
                listBoxType: 'true',
                valor: 'A',
                items: [
                  { label: 'Seleccione', value: '' },
                  { label: 'Tipo A', value: 'A' },
                  { label: 'Tipo B', value: 'B' },
                ],
              }),
            },
            componentesDer: '',
          },
        },
        entidades: {},
        entidadPrincipal: '',
        entidadesRelacionadas: {},
        idFormularioPadre: 'vacio',
        nuevo: 'true',
        edicion: 'true',
        eliminable: 'true',
        diligenciable: 'true',
        consultable: 'true',
        plantillasMostrables: 'true',
        htmlAyuda:
          '<p>Ayuda de ejemplo.</p><p>Este contenido se puede reemplazar con la ayuda real del backend.</p>',
      };
    } else {
      this.formulario = value;
    }
    this.seedComponentValues();
  }

  public get secciones(): SeccionEntity[] {
    return Object.values(this.formulario.seccionesFormularioConsulta ?? {});
  }

  public toggleSeccion(seccion: SeccionEntity): void {
    seccion.expandido = this.asBool(seccion.expandido) ? 'false' : 'true';
  }

  public asBool(value: unknown): boolean {
    return value === true || value === 'true';
  }

  public hasComponentFlag(componente: ComponenteBaseEntity, flagName: string): boolean {
    return this.asBool((componente as unknown as Record<string, unknown>)[flagName]);
  }

  public getComponentList(
    componentes: ComponentesEntity | '' | null | undefined,
  ): ComponenteBaseEntity[] {
    if (!componentes) {
      return [];
    }

    const values = Object.values(componentes);
    return values.flatMap((entry) => (Array.isArray(entry) ? entry : entry ? [entry] : []));
  }

  public componentKey(componente: ComponenteBaseEntity): string {
    return componente.id ?? componente.nombre;
  }

  public getComponentValue(componente: ComponenteBaseEntity): string | boolean {
    const key = this.componentKey(componente);
    const stored = this.componentValues[key];
    if (stored !== undefined) {
      return stored;
    }

    const payloadValue = getFieldPayloadValue(componente.valor);
    if (this.asBool(componente.checkBoxType)) {
      return payloadValue === true || payloadValue === 'true';
    }

    return payloadValue !== undefined && payloadValue !== null ? String(payloadValue) : '';
  }

  public setComponentValue(componente: ComponenteBaseEntity, value: string | boolean): void {
    this.componentValues[this.componentKey(componente)] = value;

    const newPayload = setFieldPayloadValue(componente.valor, value);
    if (newPayload !== componente.valor) {
      (componente as unknown as { valor: unknown }).valor = newPayload;
    }
  }

  public getComponentValueAsString(componente: ComponenteBaseEntity): string {
    return String(this.getComponentValue(componente));
  }

  public getSelectItems(componente: ComponenteBaseEntity): Array<{ label: string; value: string }> {
    if (!componente.items) {
      return [];
    }

    return componente.items.map((item: unknown) => {
      const safeItem = item as Partial<SelectItemEntity> & { label?: string; value?: unknown };
      const rawValue = safeItem.value as { value?: unknown } | string | undefined;

      return {
        label: safeItem.label ?? '',
        value:
          typeof rawValue === 'object' && rawValue
            ? String(rawValue.value ?? '')
            : String(rawValue ?? ''),
      };
    });
  }

  public getMostrarAsteriscoRojo(componente: ComponenteBaseEntity): boolean {
    return this.asBool(componente.obligatorio) || this.asBool(componente.obligatorioFuncional);
  }

  public addMensaje(message: string): void {
    this.mensajes = [message, ...this.mensajes].slice(0, 4);
  }

  public abrirVentanaAyuda(): void {
    this.ventanaAyudaVisible = true;
  }

  public cerrarVentanaAyuda(): void {
    this.ventanaAyudaVisible = false;
  }

  public abrirPopUpFirma(): void {
    this.popupFirmaVisible = true;
  }

  public cerrarPopUpFirma(): void {
    this.popupFirmaVisible = false;
  }

  public prevencionDobleClic(): boolean {
    this.clicksGuardar += 1;
    return this.clicksGuardar > 1;
  }

  public resetPrevencionDobleClic(): void {
    this.clicksGuardar = 0;
  }

  public guardarFormulario(): void {
    if (this.prevencionDobleClic()) {
      return;
    }
    this.addMensaje('Formulario guardado.');
  }

  public editarFormulario(): void {
    this.addMensaje('Registro actualizado.');
  }

  public eliminarRegistro(): void {
    this.addMensaje('Registro eliminado.');
  }

  public nuevoRegistro(): void {
    this.componentValues = {};
    this.seedComponentValues();
    this.resetPrevencionDobleClic();
    this.addMensaje('Campos limpiados.');
  }

  public refrescarPagina(): void {
    this.addMensaje('Página refrescada.');
  }

  public terminarFormulario(): void {
    this.popupMensajePostTerminacionTareaVisible = true;
  }

  public cerrarPopUpMensajePostTerminacionTarea(): void {
    this.popupMensajePostTerminacionTareaVisible = false;
  }

  public cancelarPopupMensajeVisualizarErroresEnvioMail(): void {
    this.popupMensajeVisualizarErroresEnvioMailVisible = false;
  }

  public continuarPopupMensajeVisualizarErroresEnvioMail(): void {
    this.popupMensajeVisualizarErroresEnvioMailVisible = false;
    this.popupMensajePostTerminacionTareaVisible = true;
  }

  public generarPlantilla(): void {
    this.addMensaje(`Plantilla generada (${this.cartaSeleccionada}, ${this.tipoHoja}).`);
  }

  private seedComponentValues(): void {
    for (const seccion of this.secciones) {
      for (const componente of this.getComponentList(seccion.componentesIzq)) {
        this.seedComponente(componente);
      }
      for (const componente of this.getComponentList(seccion.componentesCent)) {
        this.seedComponente(componente);
      }
      for (const componente of this.getComponentList(seccion.componentesDer)) {
        this.seedComponente(componente);
      }
    }
  }

  private seedComponente(componente: ComponenteBaseEntity): void {
    const key = this.componentKey(componente);
    if (key in this.componentValues) {
      return;
    }

    const defaultValue = getFieldPayloadValue(componente.valor);
    if (this.asBool(componente.checkBoxType)) {
      this.componentValues[key] = defaultValue === true || defaultValue === 'true';
      return;
    }

    this.componentValues[key] =
      defaultValue !== undefined && defaultValue !== null ? String(defaultValue) : '';
  }

  private createComponent(partial: {
    id: string;
    nombre: string;
    tipoComponente: string;
    valor?: string;
    items?: Array<{ label: string; value: string }>;
    textType?: 'true';
    textAreaType?: 'true';
    checkBoxType?: 'true';
    listBoxType?: 'true';
  }): ComponenteBaseEntity {
    return {
      cambiado: 'false',
      observadores: '',
      id: partial.id,
      nombre: partial.nombre,
      tipoDato: 'string',
      tipoComponente: partial.tipoComponente,
      descripcion: partial.nombre,
      valor: { class: 'java.lang.String', value: partial.valor ?? '' },
      ultimoId: '0',
      obligatorio: 'false',
      obligatorioFuncional: 'false',
      readOnly: 'false',
      guardado: 'false',
      cumpleValidaciones: 'true',
      opcionExtra: 'false',
      integerType: 'false',
      textType: partial.textType ?? 'false',
      dateType: 'false',
      separadorType: 'false',
      checkBoxType: partial.checkBoxType ?? 'false',
      textAreaType: partial.textAreaType ?? 'false',
      listBoxType: partial.listBoxType ?? 'false',
      listBoxCustomizedType: 'false',
      radioButtonType: 'false',
      listCompuestaType: 'false',
      grillaType: 'false',
      labelType: 'false',
      cargaMasivaType: 'false',
      mailType: 'false',
      searchButtonType: 'false',
      refreshButtonType: 'false',
      saveButtonType: 'false',
      linkType: 'false',
      linkToAFormType: 'false',
      linkFormToIfacesType: 'false',
      validacionesExpresiones: '',
      style: '',
      styleClass: '',
      styleContenedor: '',
      styleClassContenedor: '',
      columnClasses: 'columnaAlineacionVertical1,columnaAlineacionVertical2',
      claseEstilo: '',
      visible: 'true',
      filtro: 'false',
      relacionObservadorColumna: '',
      tablaDetalleType: 'false',
      richTextType: 'false',
      estaSujeto: 'false',
      esOrigenValidacion: 'false',
      componentesRelacionados: '',
      componentesNuevaValidacionEntreComponentes: '',
      arbolesExpresionNuevaValidacionEntreComponentes: '',
      operadorAritmetico: '',
      items: partial.items,
    };
  }

  private parseFormularioResponse(payload: unknown): FormularioConsultaJSONEntity {
    if (typeof payload === 'string') {
      return this.parseFormularioResponse(JSON.parse(payload));
    }

    if (this.isFormularioPayload(payload)) {
      return this.normalizeConsultaPayload(payload);
    }

    if (payload && typeof payload === 'object') {
      const nestedPayload =
        (payload as Record<string, unknown>)['formulario'] ??
        (payload as Record<string, unknown>)['data'] ??
        (payload as Record<string, unknown>)['resultado'];

      if (this.isFormularioPayload(nestedPayload)) {
        return this.normalizeConsultaPayload(nestedPayload);
      }
    }

    throw new TypeError('Respuesta de formulario inválida');
  }

  private isFormularioPayload(payload: unknown): payload is FormularioConsultaJSONEntity {
    if (!payload || typeof payload !== 'object') {
      return false;
    }

    return 'seccionesFormularioConsulta' in payload || 'seccionesFormulario' in payload;
  }

  private normalizeConsultaPayload(payload: unknown): FormularioConsultaJSONEntity {
    const value = payload as Record<string, unknown>;

    if ('seccionesFormularioConsulta' in value) {
      return {
        ...(value as unknown as Omit<FormularioConsultaJSONEntity, 'seccionesFormularioConsulta'>),
        seccionesFormularioConsulta: this.normalizeSeccionesConsulta(
          value['seccionesFormularioConsulta'],
        ),
      };
    }

    if ('seccionesFormulario' in value) {
      return {
        ...(value as unknown as Omit<FormularioConsultaJSONEntity, 'seccionesFormularioConsulta'>),
        seccionesFormularioConsulta: value['seccionesFormulario'] as SeccionesFormularioEntity,
      };
    }

    throw new TypeError('Respuesta de formulario inválida: no contiene secciones de consulta.');
  }

  private normalizeSeccionesConsulta(seccionesRaw: unknown): SeccionesFormularioEntity {
    if (!seccionesRaw) {
      return {};
    }

    if (Array.isArray(seccionesRaw)) {
      const result: SeccionesFormularioEntity = {};

      for (let index = 0; index < seccionesRaw.length; index += 1) {
        const seccion = seccionesRaw[index] as Record<string, unknown>;
        const key = `Seccion_${index + 1}`;
        result[key] = this.normalizeSeccionConsulta(seccion);
      }

      return result;
    }

    if (typeof seccionesRaw === 'object') {
      const result: SeccionesFormularioEntity = {};
      for (const [key, seccionValue] of Object.entries(seccionesRaw as Record<string, unknown>)) {
        result[key] = this.normalizeSeccionConsulta(seccionValue as Record<string, unknown>);
      }
      return result;
    }

    return {};
  }

  private normalizeSeccionConsulta(seccionRaw: Record<string, unknown>): SeccionEntity {
    const componentesIzq = this.normalizeComponentes(seccionRaw['componentesIzq']);
    const componentesCent = this.normalizeComponentes(seccionRaw['componentesCent']);
    const componentesDer = this.normalizeComponentes(seccionRaw['componentesDer']);

    const hasExplicitColumns = !!componentesIzq || !!componentesCent || !!componentesDer;
    const componentesDesdeCondiciones = this.getComponentesFromCondiciones(
      seccionRaw['condiciones'],
    );

    return {
      ...(seccionRaw as unknown as SeccionEntity),
      guardado: this.asBool(seccionRaw['guardado']) ? 'true' : 'false',
      expandido: this.asBool(seccionRaw['expandido']) ? 'true' : 'false',
      componentesIzq: hasExplicitColumns
        ? (componentesIzq ?? '')
        : componentesDesdeCondiciones.componentesIzq || '',
      componentesCent: hasExplicitColumns
        ? (componentesCent ?? '')
        : componentesDesdeCondiciones.componentesCent || '',
      componentesDer: hasExplicitColumns
        ? (componentesDer ?? '')
        : componentesDesdeCondiciones.componentesDer || '',
    };
  }

  private normalizeComponentes(componentesRaw: unknown): ComponentesEntity | undefined {
    if (!componentesRaw || typeof componentesRaw !== 'object') {
      return undefined;
    }

    return componentesRaw as ComponentesEntity;
  }

  private getComponentesFromCondiciones(condicionesRaw: unknown): {
    componentesIzq: ComponentesEntity;
    componentesCent: ComponentesEntity;
    componentesDer: ComponentesEntity;
  } {
    const componentesIzq: ComponentesEntity = {};
    const componentesCent: ComponentesEntity = {};
    const componentesDer: ComponentesEntity = {};

    if (!Array.isArray(condicionesRaw)) {
      return { componentesIzq, componentesCent, componentesDer };
    }

    for (let index = 0; index < condicionesRaw.length; index += 1) {
      const condicion = condicionesRaw[index] as Record<string, unknown>;
      const componente = condicion['componente'];

      if (!componente || typeof componente !== 'object') {
        continue;
      }

      const componenteEntity = this.normalizeComponenteFromCondicion(
        componente as ComponenteBaseEntity,
      );
      const key = componenteEntity.id || componenteEntity.nombre || `componente_${index + 1}`;

      const targetColumn = this.resolveTargetColumn(condicion, index);
      if (targetColumn === 'centro') {
        componentesCent[key] = componenteEntity;
      } else if (targetColumn === 'derecha') {
        componentesDer[key] = componenteEntity;
      } else {
        componentesIzq[key] = componenteEntity;
      }
    }

    return { componentesIzq, componentesCent, componentesDer };
  }

  private resolveTargetColumn(
    condicion: Record<string, unknown>,
    index: number,
  ): 'izquierda' | 'centro' | 'derecha' {
    const atributo = String(condicion['atributo'] ?? '').toLowerCase();
    const tipoCondicion = String(condicion['tipoCondicion'] ?? '').toLowerCase();

    if (atributo.includes('izq') || atributo.includes('left')) {
      return 'izquierda';
    }

    if (
      atributo.includes('cent') ||
      atributo.includes('center') ||
      atributo.includes('medio') ||
      atributo.includes('mid')
    ) {
      return 'centro';
    }

    if (atributo.includes('der') || atributo.includes('right')) {
      return 'derecha';
    }

    if (tipoCondicion.includes('between') || tipoCondicion === '><') {
      return 'centro';
    }

    if (tipoCondicion.includes('like') || tipoCondicion.includes('contains')) {
      return 'derecha';
    }

    const fallback = index % 3;
    if (fallback === 1) {
      return 'centro';
    }
    if (fallback === 2) {
      return 'derecha';
    }
    return 'izquierda';
  }

  private normalizeComponenteFromCondicion(componente: ComponenteBaseEntity): ComponenteBaseEntity {
    const normalized = { ...componente };

    if (this.asBool(normalized.dateType)) {
      (normalized as unknown as { valor: unknown }).valor = this.normalizeDatePayload(
        normalized.valor,
      );
      (normalized as unknown as { valorDefecto: unknown }).valorDefecto = this.normalizeDatePayload(
        normalized.valorDefecto,
      );
    }

    return normalized;
  }

  private normalizeDatePayload(payload: unknown): unknown {
    const raw = getFieldPayloadValue(payload);
    if (typeof raw !== 'number' || Number.isNaN(raw)) {
      return payload;
    }

    const date = new Date(raw);
    if (Number.isNaN(date.getTime())) {
      return payload;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const formatted = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return setFieldPayloadValue(payload, formatted);
  }

  private extractPayload(response: unknown): unknown {
    if (response && typeof response === 'object' && 'respuesta' in response) {
      return (response as Record<string, unknown>)['respuesta'];
    }

    return response;
  }
}

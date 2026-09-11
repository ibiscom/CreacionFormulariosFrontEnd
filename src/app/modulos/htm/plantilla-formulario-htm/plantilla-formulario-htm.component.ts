import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormularioJSONEntity } from '../../../entidades/forms-captura/formulario-json.entity';
import { FormularioConsultaJSONEntity } from '../../../entidades/forms-consulta/formulario-consulta-json.entity';
import { ComponenteBaseEntity } from '../../../entidades/forms-captura/componente-base.entity';
import { ComponentesEntity } from '../../../entidades/forms-captura/componentes.entity';
import { SeccionEntity } from '../../../entidades/forms-captura/seccion.entity';
import { SeccionesFormularioEntity } from '../../../entidades/forms-captura/secciones-formulario.entity';
import { SelectItemEntity } from '../../../entidades/forms-captura/select-item.entity';
import { getFieldPayloadValue, setFieldPayloadValue } from '../../../utilidades/field-value.util';
import { InPutTextComponent } from '../../captura/plantilla-form-captura/in-put-text/in-put-text.component';
import { InPutTextAreaComponent } from '../../captura/plantilla-form-captura/in-put-text-area/in-put-text-area.component';
import { SelectInPutDateComponent } from '../../captura/plantilla-form-captura/select-in-put-date/select-in-put-date.component';
import { SelectOneListBoxComponent } from '../../captura/plantilla-form-captura/select-one-list-box/select-one-list-box.component';
import { SelectOneListBoxCustomizedComponent } from '../../captura/plantilla-form-captura/select-one-list-box-customized/select-one-list-box-customized.component';
import { SelectBooleanCheckBoxComponent } from '../../captura/plantilla-form-captura/select-boolean-check-box/select-boolean-check-box.component';
import { SelectOneRadioComponent } from '../../captura/plantilla-form-captura/select-one-radio/select-one-radio.component';
import { CargaMasivaComponent } from '../../captura/plantilla-form-captura/carga-masiva/carga-masiva.component';
import { LabelComponent } from '../../captura/plantilla-form-captura/label/label.component';
import { OutPutLinkComponent } from '../../captura/plantilla-form-captura/out-put-link/out-put-link.component';
import { LinkToAFormComponent } from '../../captura/plantilla-form-captura/link-to-a-form/link-to-a-form.component';
import { LinkToDifferentFormComponent } from '../../captura/plantilla-form-captura/link-to-different-form/link-to-different-form.component';
import { LinkFormToIcefacesComponent } from '../../captura/plantilla-form-captura/link-form-to-icefaces/link-form-to-icefaces.component';
import { SaveButtonComponent } from '../../captura/plantilla-form-captura/save-button/save-button.component';
import { SearchButtonComponent } from '../../captura/plantilla-form-captura/search-button/search-button.component';
import { RefreshButtonComponent } from '../../captura/plantilla-form-captura/refresh-button/refresh-button.component';
import { MailComponent } from '../../captura/plantilla-form-captura/mail/mail.component';
import { SeparadorComponent } from "../../captura/plantilla-form-captura/separador/separador.component";
import { TableDetailsComponent } from '../../captura/plantilla-form-captura/table-details/table-details.component';
import { SeccionComponent } from "../../captura/plantilla-form-captura/seccion/seccion.component";

@Component({
  selector: 'htm-plantilla-formulario-htm',
  imports: [
    CommonModule,
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
    SeparadorComponent,
    TableDetailsComponent,
    SeccionComponent
],
  templateUrl: './plantilla-formulario-htm.component.html',
  styleUrl: './plantilla-formulario-htm.component.scss',
})
export class PlantillaFormularioHtmComponent {
  
  @Input() public padre?: any;

  @Input() public set formularioInput(
    value: FormularioJSONEntity | FormularioConsultaJSONEntity | unknown,
  ) {
    if (!value) {
      return;
    }

    const formularioNormalizado = this.normalizarFormularioInput(value);
    if (!formularioNormalizado) {
      this.addMensaje('No fue posible interpretar la estructura del formulario recibido.');
      return;
    }

    this.formulario = formularioNormalizado;
    this.seedComponentValues();
  }

  public formulario: FormularioJSONEntity = {
    titulo: 'Formulario HTM',
    descripcion: 'Migracion Angular equivalente de plantilla JSF/ICEFaces.',
    seccionesFormulario: {
      Seccion_1: {
        titulo: 'Datos basicos',
        descripcion: 'Seccion migrada de ejemplo para validacion y captura.',
        guardado: 'false',
        expandido: 'true',
        componentesIzq: {
          txtNombre: this.createComponent({
            id: 'txtNombre',
            nombre: 'Nombre',
            tipoComponente: 'InPutText',
            textType: 'true',
            valor: 'Usuario demo',
          }),
          txtObservacion: this.createComponent({
            id: 'txtObservacion',
            nombre: 'Observacion',
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
        componentesCent: '',
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
      '<p>Ayuda de formulario migrada.</p><p>Personaliza este contenido desde backend.</p>',
  };

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

  public ngOnInit(): void {
    this.seedComponentValues();
  }

  public get secciones(): SeccionEntity[] {
    return Object.values(this.formulario.seccionesFormulario ?? {});
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

  public getComponentList(componentes: ComponentesEntity | ''): ComponenteBaseEntity[] {
    if (componentes === '') {
      return [];
    }

    const values = Object.values(componentes);
    return values.flatMap((entry) => (Array.isArray(entry) ? entry : entry ? [entry] : []));
  }

  public getColumnGridTemplate(seccion: SeccionEntity): string {
    const occupiedColumns = [
      seccion.componentesIzq,
      seccion.componentesCent,
      seccion.componentesDer,
    ].filter((column) => this.getComponentList(column).length > 0).length;

    return `repeat(${Math.max(occupiedColumns, 1)}, minmax(0, 1fr))`;
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
        value: typeof rawValue === 'object' && rawValue ? String(rawValue.value ?? '') : String(rawValue ?? ''),
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
    this.addMensaje('Pagina refrescada.');
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

    this.componentValues[key] = defaultValue !== undefined && defaultValue !== null ? String(defaultValue) : '';
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

  private normalizarFormularioInput(
    value: FormularioJSONEntity | FormularioConsultaJSONEntity | unknown,
  ): FormularioJSONEntity | undefined {
    const payload = this.extractPayload(value);

    if (!payload || typeof payload !== 'object') {
      return undefined;
    }

    if (this.hasSeccionesFormulario(payload)) {
      return payload as FormularioJSONEntity;
    }

    if (!this.hasSeccionesFormularioConsulta(payload)) {
      return undefined;
    }

    const consulta = payload as FormularioConsultaJSONEntity;
    return {
      ...(consulta as unknown as Omit<FormularioJSONEntity, 'seccionesFormulario'>),
      seccionesFormulario: consulta.seccionesFormularioConsulta,
    };
  }

  private extractPayload(value: unknown): unknown {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return undefined;
      }
    }

    if (!value || typeof value !== 'object') {
      return value;
    }

    const raw = value as Record<string, unknown>;

    if (raw['respuesta'] !== undefined) {
      return this.extractPayload(raw['respuesta']);
    }

    const nestedPayload = raw['formulario'] ?? raw['data'] ?? raw['resultado'];
    if (nestedPayload !== undefined) {
      return this.extractPayload(nestedPayload);
    }

    return value;
  }

  private hasSeccionesFormulario(payload: unknown): payload is { seccionesFormulario: SeccionesFormularioEntity } {
    return !!payload && typeof payload === 'object' && 'seccionesFormulario' in payload;
  }

  private hasSeccionesFormularioConsulta(
    payload: unknown,
  ): payload is { seccionesFormularioConsulta: SeccionesFormularioEntity } {
    return !!payload && typeof payload === 'object' && 'seccionesFormularioConsulta' in payload;
  }

  ngAfterViewChecked(): void {
    this.padre?.refrescarAltura?.();
  }
}

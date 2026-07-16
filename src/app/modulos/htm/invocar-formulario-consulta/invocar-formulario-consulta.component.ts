import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PlantillaFormularioConsultaNormalHtmComponent } from '../plantilla-formulario-consulta-normal-htm/plantilla-formulario-consulta-normal-htm.component';
import { ParamsFormConsultaHTMEntity } from '../../../entidades/htm/params-form-consulta-htm.entity';
import { FormularioJSONEntity } from '../../../entidades/forms-captura/formulario-json.entity';
import { InvocarFormularioConsultaService } from './invocar-formulario-consulta.service';

@Component({
  selector: 'app-invocar-formulario-consulta',
  imports: [FormsModule, PlantillaFormularioConsultaNormalHtmComponent],
  templateUrl: './invocar-formulario-consulta.component.html',
  styleUrl: './invocar-formulario-consulta.component.scss',
})
export class InvocarFormularioConsultaComponent {
  field1 = '';
  field8 = '';
  field9 = '';

  public idFormulario?: ParamsFormConsultaHTMEntity = undefined;    

  public isFormularioReady = false;

  public authenticated = false;

  public formularioConsultaHtm: FormularioJSONEntity = {} as FormularioJSONEntity;


  validationStatus = '';


  private readonly blockedPasswords = new Set(['password', 'PASSWORD', '1234567', '0123456']);

  constructor(private readonly route: ActivatedRoute,
              private invocarFormularioConsultaService: InvocarFormularioConsultaService) {
    var idFormularioEnc = this.route.snapshot.paramMap.get('id');
    this.idFormulario = this.decodeHTMInfoFormParams(idFormularioEnc);
  }

  ngOnInit(): void {
    this.loadFormularioConsultaHtm();
  }

  private loadFormularioConsultaHtm(): void {
    if (!this.idFormulario) {
      this.isFormularioReady = false;
      return;
    }


    this.isFormularioReady = false;
    this.invocarFormularioConsultaService.obtenerFormularioConsultaHtm(this.idFormulario).subscribe({
      next: (response) => {
        console.log('Formulario Consulta HTM obtenido:', response, response.respuesta);
        this.formularioConsultaHtm = response.respuesta;
        this.isFormularioReady = true;
        this.authenticated = true;
      },
      error: (error) => {
        console.error('Error al obtener el formulario HTM:', error);
      },
    });
  }

  get isPasswordShort(): boolean {
    return this.field8.length > 0 && this.field8.length < 7;
  }

  get isPasswordBlocked(): boolean {
    return this.blockedPasswords.has(this.field8);
  }

  get isPasswordEqualToName(): boolean {
    return this.field8.length > 0 && this.field1.length > 0 && this.field8 === this.field1;
  }

  get isPasswordConfirmMismatch(): boolean {
    return this.field9.length > 0 && this.field8 !== this.field9;
  }

  get hasLegacyPasswordError(): boolean {
    return this.isPasswordShort || this.isPasswordBlocked || this.isPasswordEqualToName;
  }

  onFormValidate(form: NgForm): void {
    this.validationStatus = `validation callback for form 'presentacionFormulario': result = ${form.valid}`;
  }

  onSubmit(form: NgForm): void {
    this.onFormValidate(form);
    if (form.invalid || this.hasLegacyPasswordError || this.isPasswordConfirmMismatch) {
      return;
    }

    // Punto de extension: enviar datos al backend o continuar el flujo.
  }


  private decodeHTMInfoFormParams(idFormularioEnc?: string | null): ParamsFormConsultaHTMEntity | undefined {
    if (!idFormularioEnc || idFormularioEnc === null ) {
      return undefined;
    }

    try {
      const encodedParam = this.safelyDecodeURIComponent(idFormularioEnc);
      const jsonPayload = this.decodeBase64UrlToUtf8(encodedParam);
      const parsedPayload = JSON.parse(jsonPayload) as unknown;
      return this.toParamsFormConsultaHTMEntity(parsedPayload);
    } catch (error) {
      console.warn('No fue posible decodificar los parametros de entrada.', error);
    }

    return undefined;
  }

  private toParamsFormConsultaHTMEntity(parsedPayload: unknown): ParamsFormConsultaHTMEntity {
    if (!parsedPayload || typeof parsedPayload !== 'object') {
      throw new Error('El payload decodificado no es un objeto JSON valido.');
    }

    const payload = parsedPayload as Record<string, unknown>;
    const rawWorkflow = payload['objetosWorkflow'];

    if (!rawWorkflow || typeof rawWorkflow !== 'object') {
      throw new Error('El payload no contiene objetosWorkflow valido.');
    }

    const workflowEntries = Object.entries(rawWorkflow as Record<string, unknown>);
    const workflowAsStrings = Object.fromEntries(
      workflowEntries.map(([key, value]) => [key, String(value ?? '')])
    );

    return {
      idFormulario: String(payload['idFormulario'] ?? ''),
      tipoFormulario: String(payload['tipoFormulario'] ?? ''),
      numHerramienta: Number(payload['numHerramienta'] ?? 0),
      cadenaRepresentacion: String(payload['cadenaRepresentacion'] ?? ''),
      objetosWorkflow: workflowAsStrings,
    };
  }

  private safelyDecodeURIComponent(value: string): string {
    try {
      return decodeURIComponent(value);
    } catch {
      return value;
    }
  }

  private decodeBase64UrlToUtf8(base64UrlValue: string): string {
    const base64Value = this.normalizeBase64Url(base64UrlValue);

    if (typeof atob === 'function') {
      const binary = atob(base64Value);
      const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
      return new TextDecoder().decode(bytes);
    }

    throw new Error('No hay decodificador disponible en el entorno actual.');
  }

  private normalizeBase64Url(base64UrlValue: string): string {
    const base64Value = base64UrlValue.replace(/-/g, '+').replace(/_/g, '/');
    const paddingLength = (4 - (base64Value.length % 4)) % 4;
    return `${base64Value}${'='.repeat(paddingLength)}`;
  }



}

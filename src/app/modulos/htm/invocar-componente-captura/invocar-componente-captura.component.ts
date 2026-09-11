import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PlantillaFormularioHtmComponent } from '../plantilla-formulario-htm/plantilla-formulario-htm.component';
import { InvocarComponenteCapturaService } from './invocar-componente-captura.service';
import { FormularioJSONEntity } from '../../../entidades/forms-captura/formulario-json.entity';
import { ParamsFormHTMEntity } from '../../../entidades/htm/params-form-htm.entity';

@Component({
  selector: 'htm-invocar-componente-captura',
  imports: [FormsModule, PlantillaFormularioHtmComponent],
  templateUrl: './invocar-componente-captura.component.html',
  styleUrl: './invocar-componente-captura.component.scss',
})
export class InvocarComponenteCapturaComponent {
  private readonly platformId = inject(PLATFORM_ID);

  field1 = '';
  field8 = '';
  field9 = '';
  

  validationStatus = '';

  public idFormulario?: ParamsFormHTMEntity = undefined;    

  public isFormularioReady = false;

  public authenticated = false;

  public formularioHtm?: FormularioJSONEntity = undefined;

  private readonly blockedPasswords = new Set(['password', 'PASSWORD', '1234567', '0123456']);

  
  public constructor(
    private route: ActivatedRoute,
    private invocarComponenteCapturaService: InvocarComponenteCapturaService
  ) {
    var idFormularioEnc = this.route.snapshot.paramMap.get('id') ?? '';
    this.idFormulario = this.decodeHTMFormParams(idFormularioEnc);
  }

  ngOnInit(): void {
    this.loadFormularioHtm();
  }

  private loadFormularioHtm(): void {
    if (!this.idFormulario) {
      this.isFormularioReady = false;
      return;
    }

    // Avoid Node/SSR request to self-signed HTTPS endpoints.
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.isFormularioReady = false;
    this.invocarComponenteCapturaService.obtenerFormularioHtm(this.idFormulario).subscribe({
      next: (response) => {
        console.log('Formulario HTM obtenido:', response, response.respuesta);
        this.formularioHtm = response.respuesta;
        this.isFormularioReady = true;
        this.authenticated = true;
        setTimeout(() => this.refrescarAltura(), 0);
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


  private decodeHTMFormParams(idFormularioEnc: string): ParamsFormHTMEntity | undefined {
    if (!idFormularioEnc) {
      return undefined;
    }

    try {
      const encodedParam = this.safelyDecodeURIComponent(idFormularioEnc);
      const jsonPayload = this.decodeBase64UrlToUtf8(encodedParam);
      const parsedPayload = JSON.parse(jsonPayload) as unknown;
      return this.toParamsFormHTMEntity(parsedPayload);
    } catch (error) {
      console.warn('No fue posible decodificar los parametros de entrada.', error);
    }

    return undefined;
  }

  private toParamsFormHTMEntity(parsedPayload: unknown): ParamsFormHTMEntity {
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
  
    private lastHeight = 0;

  ngAfterViewInit(): void {
    this.enviarAltura();
  }

  public refrescarAltura(): void {
    setTimeout(() => this.enviarAltura(), 0);
  }

  private enviarAltura(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const height = Math.max(
      document.body?.scrollHeight ?? 0,
      document.documentElement?.scrollHeight ?? 0,
      document.body?.offsetHeight ?? 0,
      document.documentElement?.offsetHeight ?? 0
    );

    const nextHeight = Math.ceil(height);

    if (Math.abs(nextHeight - this.lastHeight) < 5) {
      return;
    }

    this.lastHeight = nextHeight;

    window.parent.postMessage(
      {
        type: 'iframe-height',
        height: nextHeight
      },
      '*'
    );
  }
}
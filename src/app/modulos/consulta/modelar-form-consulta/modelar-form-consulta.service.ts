import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormularioConsultaJSONEntity } from '../../../entidades/forms-consulta/formulario-consulta-json.entity';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ModelarFormConsultaService {
  public constructor(private http: HttpClient) {}

  public getFormulario(formName: string): Observable<unknown> {
    return this.http.get<unknown>(
      `${environment.creacionFormulariosApiUrl}/form/getFormConsulta?formName=${formName}`,
    );
  }

  // El endpoint de guardado de formularios de consulta aún no está confirmado en el
  // backend; se sigue la convención de /form/saveForm para que el swap sea directo.
  public guardarFormulario(formData: FormularioConsultaJSONEntity): Observable<unknown> {
    return this.http.post<unknown>(
      `${environment.creacionFormulariosApiUrl}/form/saveFormConsulta`,
      formData,
      {},
    );
  }
}

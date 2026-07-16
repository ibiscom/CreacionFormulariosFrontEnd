import { Injectable } from '@angular/core';
import { FrmResponseEntity } from '../../../entidades/backend/frm-response.entity';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormularioJSONEntity } from '../../../entidades/forms-captura/formulario-json.entity';
import { Observable } from 'rxjs';
import { ParamsFormConsultaHTMEntity } from '../../../entidades/htm/params-form-consulta-htm.entity';

@Injectable({
  providedIn: 'root',
})
export class InvocarFormularioConsultaService {
  
   constructor(private http: HttpClient) {}


  public obtenerFormularioConsultaHtm(params: ParamsFormConsultaHTMEntity): Observable<FrmResponseEntity<FormularioJSONEntity>> {
    // TODO  Cambiar a la ruta correcta para obtener el formulario de consulta, cuando exista.
    return this.http.post<FrmResponseEntity<FormularioJSONEntity>>(
      `${environment.creacionFormulariosApiUrl}/formHTM/loadForm?userName=Admin`,  
      params
    );
  }
  
}

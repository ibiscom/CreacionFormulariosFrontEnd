import { Injectable } from '@angular/core';
import { FrmResponseEntity } from '../../../entidades/backend/frm-response.entity';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormularioJSONEntity } from '../../../entidades/forms-captura/formulario-json.entity';
import { Observable } from 'rxjs';
import { ParamsFormHTMEntity } from '../../../entidades/htm/params-form-htm.entity';
import { ParamsFormConsultaHTMEntity } from '../../../entidades/htm/params-form-consulta-htm.entity';

@Injectable({
  providedIn: 'root',
})
export class InvocarComponenteCapturaService {
  
   constructor(private http: HttpClient) {}


  public obtenerFormularioHtm(params: ParamsFormHTMEntity): Observable<FrmResponseEntity<FormularioJSONEntity>> {
    return this.http.post<FrmResponseEntity<FormularioJSONEntity>>(
      `${environment.creacionFormulariosApiUrl}/formHTM/loadForm?userName=Admin`,  
      params
    );
  }
  
}

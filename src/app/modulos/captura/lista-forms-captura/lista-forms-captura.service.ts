import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { FrmResponseEntity } from '../../../entidades/backend/frm-response.entity';

@Injectable({
  providedIn: 'root',
})
export class ListaFormulariosService {
  constructor(private http: HttpClient) {}

  public getFormularios(filtroNomForm: string): Observable<FrmResponseEntity<any[]>> {
    return this.http.get<FrmResponseEntity<any[]>>(
      `${environment.creacionFormulariosApiUrl}/form/getForms?formName=${filtroNomForm}`,
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { FormularioJSONEntity } from '../../../entidades/forms-captura/formulario-json.entity';

@Injectable({
  providedIn: 'root',
})
export class PlantillaFormCapturaService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  public getFormulario(formName: string): Observable<unknown> {
    /*return this.http.get<FrmResponseEntity<string>>(
      `${environment.creacionFormulariosApiUrl}/form/getFormStructure?formName=${formName}`,
    );*/
    return this.http.get<unknown>(
      `${environment.creacionFormulariosApiUrl}/form/getForm?formName=${formName}`,
    );
  }

  public guardarFormulario(formData: FormularioJSONEntity): Observable<unknown> {
    const token = this.cookieService.get('token');
    return this.http.post<unknown>(
      `${environment.creacionFormulariosApiUrl}/form/saveForm`,
      formData,{});
      /*{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );*/
  }
}

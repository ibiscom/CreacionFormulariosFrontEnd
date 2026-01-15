import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { FrmResponseEntity } from '../entities/backend/frm-response.entity';
import { environment } from '../../environments/environment';
import { FormularioJSONEntity } from '../entities/ver-formulario/formulario-json.entity';

@Injectable({
  providedIn: 'root',
})
export class VerFormularioService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  public getFormulario(formName: string): Observable<FrmResponseEntity<string>> {
    return this.http.get<FrmResponseEntity<string>>(
      `${environment.creacionFormulariosApiUrl}/form/getFormStructure?formName=${formName}`,
    );
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlantillaFormConsultaService {

  public constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {} 

  public getFormulario(formName: string): Observable<unknown> {
    return this.http.get<unknown>(
      `${environment.creacionFormulariosApiUrl}/form/getFormConsulta?formName=${formName}`,
    );
  }
  
}

import { Injectable } from '@angular/core';
import { FrmResponseEntity } from '../../../entidades/backend/frm-response.entity';
import { FormularioJSONEntity } from '../../../entidades/forms-captura/formulario-json.entity';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class PlantillaFormularioHtmService {
   
  constructor(private http: HttpClient) {}

  public guardarFormularioHTM(formulario: any): Observable<FrmResponseEntity<any>> {
    return of({
      success: true,
      message: 'Formulario guardado.',
      data: '',
    } as unknown as FrmResponseEntity<string>);
    //TODO: Descomentar cuando se tenga el endpoint de guardado de formulario normal HTM
    /*return this.http.post<FrmResponseEntity<any>>(
      `${environment.creacionFormulariosApiUrl}/form/saveForm`,
      formulario
    );*/
  }

  public editarFormularioHTM(formulario: FormularioJSONEntity) : Observable<FrmResponseEntity<any>> {
    return of({
      success: true,
      message: 'Formulario editado.',
      data: '',
    } as unknown as FrmResponseEntity<string>); 
    //TODO: Descomentar cuando se tenga el endpoint de edición de formulario normal HTM
    return this.http.put<FrmResponseEntity<any>>(
      `${environment.creacionFormulariosApiUrl}/form/updateForm`,
      formulario
    );
  }

  public eliminarRegistroFormularioHTM(formulario: FormularioJSONEntity) : Observable<FrmResponseEntity<any>> {
    return of({
      success: true,
      message: 'Formulario eliminado.',
      data: '',
    } as unknown as FrmResponseEntity<string>); 
    //TODO: Descomentar cuando se tenga el endpoint de eliminación de formulario normal HTM (se tiene que pasar el id del formulario a eliminar antes de llamar el metodo)
    return this.http.delete<FrmResponseEntity<any>>(
      `${environment.creacionFormulariosApiUrl}/form/deleteForm/${formulario.id }}`
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FrmResponseEntity } from '../../../entidades/backend/frm-response.entity';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { FormularioJSONEntity } from '../../../entidades/forms-captura/formulario-json.entity';

@Injectable({
  providedIn: 'root',
})
export class PlantillaFormularioNormalHtmService {
  
  constructor(private http: HttpClient) {}

  public guardarFormularioNormalHTM(formulario: any): Observable<FrmResponseEntity<any>> {
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

  public editarFormularioNormalHTM(formulario: FormularioJSONEntity) {
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

  public eliminarRegistroFormularioNormalHTM(formulario: FormularioJSONEntity) {
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

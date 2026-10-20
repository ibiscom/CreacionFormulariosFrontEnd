import { Injectable } from '@angular/core';
import { EntidadCatalogoEntity } from '../../entidades/forms-captura/entidad-catalogo.entity';

/** Selección de entidades que la pantalla de selección entrega al modelador. */
export interface SeleccionTablaEntity {
  entidadPrincipal: EntidadCatalogoEntity;
  entidadesRelacionadas: EntidadCatalogoEntity[];
}

/**
 * Reemplaza el sessionMap del bean legado: la pantalla de selección deja aquí la
 * entidad escogida y el modelador la consume una sola vez al inicializarse.
 */
@Injectable({ providedIn: 'root' })
export class SeleccionTablaService {
  private seleccion: SeleccionTablaEntity | null = null;

  public establecerSeleccion(seleccion: SeleccionTablaEntity): void {
    this.seleccion = seleccion;
  }

  /** Devuelve la selección pendiente y la limpia, para que no se reaplique. */
  public consumirSeleccion(): SeleccionTablaEntity | null {
    const seleccion = this.seleccion;
    this.seleccion = null;
    return seleccion;
  }
}

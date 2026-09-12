/** Relación observador → columna de unión de un componente (getObservadores + relacionObservadorColumna del bean legado). */
export interface ObservadorComponenteEntity {
  claveComponente: string;
  nombre: string;
  idColumna: string;
  atributoUnion: string;
}

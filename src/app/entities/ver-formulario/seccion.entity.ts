import { BooleanString } from './boolean-string.type';
import { ComponentesEntity } from './componentes.entity';

/** Sección del formulario */
export interface SeccionEntity {
  titulo: string;
  descripcion: string;
  componentesIzq: ComponentesEntity | '';
  componentesCent: ComponentesEntity | ''; // en ejemplo viene ""
  componentesDer: ComponentesEntity | ''; // en ejemplo viene ""
  guardado: BooleanString;
  expandido: BooleanString;
}

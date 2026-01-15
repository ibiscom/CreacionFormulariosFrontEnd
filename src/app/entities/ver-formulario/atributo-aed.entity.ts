/** Estructura del atributo de validación lógica (lado izquierdo) */
export interface AtributoAEDEntity {
  atributo: {
    componente: {
      class: 'InPutText' | string;
      reference: string;
    };
    valor: string;
  };
  comparador: string; // Ej: '='
  valor: string;
  arbolesExpresionComoHijoIzquierdo: string;
  arbolesExpresionComoHijoDerecho: string;
}

/**
 * Compatibilidad de flags booleanos.
 * El backend historicamente enviaba 'true'/'false', pero ahora tambien puede enviar boolean nativo.
 */
export type BooleanString = boolean | 'true' | 'false';

export class MessageUtil {
  public static buildErrorMessageFrmResponse(baseMessage: string, e: any): string {
    return e.error
      ? baseMessage + ': ' + e.error.codigo + ': ' + e.error.mensaje
      : e.message + '. ';
  }

  public static buildErrorMessage(baseMessage: string, error: any): string {
    let mensaje: string = '';
    if (error instanceof Error) {
      mensaje = baseMessage + ': ' + error.message;
    } else {
      mensaje = baseMessage + ': ' + String(error);
    }
    return mensaje;
  }
}

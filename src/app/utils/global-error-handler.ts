import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private zone: NgZone) {}

  handleError(error: any): void {
    this.zone.run(() => {
      console.error('Global error caught:', error);
      
      // Registro mejorado de errores con stack trace
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        
        // Intentar extraer información más detallada
        if (error.stack) {
          const stackLines = error.stack.split('\n');
          const relevantLines = stackLines.filter(line => 
            line.includes('.ts:') || 
            line.includes('src/') ||
            line.includes('app/') ||
            line.includes('webpack:///')
          );
          
          if (relevantLines.length > 0) {
            console.error('TypeScript source locations:', relevantLines);
            
            // Registro detallado adicional en desarrollo
            if (environment.enableDetailedErrorLogging) {
              relevantLines.forEach((line, index) => {
                console.error(`Source ${index + 1}:`, line.trim());
              });
            }
          }
        }
      }
      
      // Registrar errores específicos de Angular con más detalle
      if (error?.rejection) {
        console.error('Promise rejection:', error.rejection);
      }
      
      // Registrar información de contexto si está disponible
      if (error?.context) {
        console.error('Error context:', error.context);
      }
      
      // Extraer información de template/componente si está disponible
      if (error?.ngOriginalError) {
        console.error('Angular original error:', error.ngOriginalError);
      }
      
      if (error?.source) {
        console.error('Error source:', error.source);
      }
      
      // Registrar URL de depuración si está disponible
      if (error?.debugInfo) {
        console.error('Debug info:', error.debugInfo);
      }
      
      // Modo de desarrollo: Información adicional de depuración
      if (environment.enableDetailedErrorLogging && !environment.production) {
        console.group('🔍 Detailed Error Analysis');
        console.log('Error type:', error.constructor.name);
        console.log('Error keys:', Object.keys(error));
        console.log('Full error object:', error);
        console.groupEnd();
      }
    });
  }
}
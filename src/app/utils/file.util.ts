export class FileUtil {
  public static getLastPathPart(path: string): string {
    const idx = Math.max(path.lastIndexOf('/'), path.lastIndexOf('\\'));
    return idx >= 0 ? path.substring(idx + 1) : path;
  }

  public static async convertToBase64File(archivo: File): Promise<string> {
    const reader = new FileReader();
    reader.readAsDataURL(archivo);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        console.log('Base64 String:', base64String);
        resolve(base64String);
      };
      reader.onerror = (error) => {
        console.error('Error al leer el archivo:', error);
        reject(error);
      };
      reader.readAsDataURL(archivo);
    });
  }
}

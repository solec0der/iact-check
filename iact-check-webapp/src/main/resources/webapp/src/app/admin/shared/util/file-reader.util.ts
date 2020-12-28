export class FileReaderUtil {
  public static async readBlobAsDataUrl(
    blob: Blob
  ): Promise<string | ArrayBuffer | null> {
    return await new Promise((resolve) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.readAsDataURL(blob);
    });
  }

  public static convertBlobToFile(blob: Blob, filename: string): File {
    let file: any = blob;
    file.lastModifiedDate = new Date();
    file.name = filename;

    return <File>file;
  }
}

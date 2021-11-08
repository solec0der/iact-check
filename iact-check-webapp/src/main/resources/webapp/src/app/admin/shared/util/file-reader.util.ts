export class FileReaderUtil {
  public static convertBlobToFile(blob: Blob, filename: string): File {
    let file: any = blob;
    file.lastModifiedDate = new Date();
    file.name = filename;

    return <File>file;
  }
}

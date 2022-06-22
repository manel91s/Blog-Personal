import multer from 'multer';

class FileStorage {
  private multer;

  private storage: any;

  constructor(name: string) {
    this.multer = multer().single(name);
    this.saveFile(name);
  }

  saveFile(name: string) {
    this.storage = multer.diskStorage({
      destination(req, file, cb) {
        cb(null, `/storage/${name}`);
      },
      filename(req, file, cb) {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        cb(null, `${file.fieldname}-${uniqueSuffix}`);
      },
    });
    const { storage } = this;
    return multer({ storage });
  }

  getMulter() {
    return this.multer;
  }
}

export default FileStorage;

import multer from 'multer';

class Uploader {
  private upload: any;

  uploadSingleImage(fileName :string) {
    this.upload = multer({
      storage: this.storage(fileName),
      fileFilter: (req : any, file: any, cb:any) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
          cb(null, true);
        } else {
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
      },
    });

    return this.upload.single(fileName);
  }

  storage(fileName: string) {
    return multer.diskStorage({
      destination(req:any, file:any, cb:any) {
        cb(null, `./src/storage/${fileName}`);
      },
      filename(req:any, file:any, cb:any) {
        cb(null, `${file.fieldname}-${Date.now()}`);
      },
    });
  }
}

export default Uploader;

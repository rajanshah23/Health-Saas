import { Request } from "express";
import multer from "multer";

const storage = multer.diskStorage({
  //Yo ho location   incoming file  lai kaha rakhney
  ///cb--->callback function--------------cb(error,success)
  destination: function (req: Request, file: Express.Multer.File, cb: any) {
    cb(null, "./src/storage");
  },
  filename: function (req: Request, file: Express.Multer.File, cb: any) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
export default { multer, storage };

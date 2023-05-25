import { Response, Request } from "express";
import GoogleDriveApiService from "../servies/google.drive.service";
import { removeFileWithPath, readtAndWrite } from '../utils/filesHandles'
class GoogleApis {
  

  constructor() {}

  async fileUploadtoGDrive(req: Request | any, res: Response) {
    const GDriveService = new GoogleDriveApiService();
    try {
      let filePath = `${__dirname}\\..\\dev-data\\file-upload.json`
      const response = await GDriveService.uploadFile({ ...req.files });
      
      const writeJson = await readtAndWrite({
        readPath: filePath,
        writePath: filePath,
        writeData: response
      })
      res.send({
        message: "Success",
        cred: process.env.CLIENT_ID,
        data: response,
        createOrUpdateSuccess: writeJson
      })
    } catch (e: any) {
      console.log("ERROR", e);
      res.send({
        status: false,
        message: e.message,
      });
    }
  }

  async deleteFiles(req: Request, res: Response) {
    try{
      const GDriveService = new GoogleDriveApiService();
      await GDriveService.deleteFile()

    }catch(e){

    }
  }

  async getAllFiles(req: Request, res: Response) {
    //
  }

  async getOneFile(req: Request, res: Response) {
    //
  }

  async updateFile(req: Request, res: Response) {
    //
  }
}

export default new GoogleApis();

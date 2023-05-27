import { google } from "googleapis";
import * as mime from "mime-types";
import { readStream, removeFileWithPath} from '../utils/filesHandles'

export default class GoogleDriveApiService {
  oAuthToClinet: any;
  drive: any;

  constructor() {
    //Initialize oAuth client
    this.oAuthToClinet = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URI
    );

    // Set refresh token credentials
    this.oAuthToClinet.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });

    this.drive = google.drive({
      version: "v3",
      auth: this.oAuthToClinet,
    });
  }

  async getFile() {}

  async getFiles() {}

  async uploadFile(object: Record<string, any>): Promise<any>{
    console.log('object', object)
    if(!Array.isArray(object.file)){

        return new Promise(async (resolve, reject) => {
          try {
            let createParams = {
              requestBody: {
                name: object.file.name,
                mimetype: object.file.mimetype,
              },
              media: {
                mimetype: object.mimetype,
                body: readStream(object.file.tempFilePath),
              },
            };
            const driveReponse = await this.drive.files.create(createParams);
            await removeFileWithPath(object.file.tempFilePath)
            resolve(
                driveReponse.data
            );
          } catch (e: any) {
            reject({
              status: false,
              messge: e.message,
            });
          }
        });
    }else{
        return this.uploadFiles(object)
    }
  }

  async uploadFiles(object: Record<string, any>): Promise<any> {
    if(Array.isArray(object.file)){
        return new Promise(async (resolve, reject) => {
            try {
                let driveResArray: unknown[] = []
                for(let i=0 ; i < object.file.length; i++){
                    let item = object.file[i]
                    let createParams = {
                        requestBody: {
                          name: item.name,
                          mimetype: item.mimetype,
                        },
                        media: {
                          mimetype: item.mimetype,
                          body: readStream(item.tempFilePath),
                        },
                      };
                      const driveReponse = await this.drive.files.create(createParams);
                      driveResArray.push(driveReponse.data)
                      await removeFileWithPath(item.tempFilePath)
                }
              
              resolve(
                driveResArray
              );
            } catch (e: any) {
              reject({
                status: false,
                messge: e.message,
              });
            }
          });
    }else{
        return this.uploadFile(object)
    }
  }

  async updateFile() {}

  async deleteFile(object: Record<string,any>): Promise<any> {

      return new Promise(async (resolve, reject) => {
        try{
         const response =  await this.drive.files.delete({
            fieldId: object?.file?.id
          })
          // In delete time status only return 
          resolve({
            status: response?.status === ''
          })
        }catch(e: any){
          reject({
            status: false,
            message: e.message
          })
        }
      })
  }

  getMimeTypeOfFile(fileOrPath: string) {
    return mime.lookup(fileOrPath);
  }
}

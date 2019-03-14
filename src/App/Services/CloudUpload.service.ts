/**
 * @author Leon Mwandiringa
 * @uses define file uploads service
 * @return file url or returned error
 */

import Config from "../../../Bootstrap/Config"; 
import { promises } from "fs";
let cloudinary = require("cloudinary").v2;
cloudinary.config({ 
    cloud_name: Config.STORAGE.cloudinary.name, 
    api_key: Config.STORAGE.cloudinary.key, 
    api_secret: Config.STORAGE.cloudinary.secret
  });

class CloudUploadService{

    //init file upload
   async Init(payload: any){

        return new Promise((resolve: any, reject: any)=>{

            cloudinary.uploader.upload(payload, {timeout:60000, resource_type: "auto"}, (error: any, result: any)=>{

                if(error){
                    return reject(error);
                }

                return resolve(result);

            });

        });
        
   }

}

export default new CloudUploadService();

/**
 * @author Leon Mwandiringa
 * @uses define file uploads service
 * @return file url or returned error
 */

import Config from "../../Config"; 
import { promises } from "fs";
let cloudinary = require("cloudinary").v2;
import ServiceResponse from "../Interfaces/ServiceResponse.interface";

//defining cloud service client
cloudinary.config({ 
    cloud_name: Config.STORAGE.cloudinary.name, 
    api_key: Config.STORAGE.cloudinary.key, 
    api_secret: Config.STORAGE.cloudinary.secret
});

class CloudUploadService{

    /**
     * @uses uploading to cloudinary
     * @returns rerror | success message accordingly
     */
   async Init(payload: any){

        return new Promise((resolve: any, reject: any)=>{

            cloudinary.uploader.upload(payload, {timeout:60000, resource_type: "auto"}, (error: any, result: any)=>{

                if(error){
                    return reject(<ServiceResponse>{
                        error: error,
                        notice: "an error occured creating file",
                        result: null
                    });
                }

                return resolve(<ServiceResponse>{
                    error: null,
                    notice: "File was succesfully created",
                    result: result
                });

            });

        });
        
   }

}

export default new CloudUploadService();

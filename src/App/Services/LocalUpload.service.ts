/**
 * @author Leon Mwandiringa
 * @uses define file uploads service
 * @return file url or returned error
 */

import * as filesys from "fs";
import * as path from "path";
import ServiceResponse from "../Interfaces/ServiceResponse.interface";

class LocalUploadService{

    //init file upload
   public Init(resource: any, payload: any): object{

        let fs: any = filesys;
        let filename = `${resource.name}-${String(Date.now()).slice(4)}.${resource.extention}`;

        let fileLocation = `${resource.folder}/${filename}`;
        let rawWritableStream = fs.createWriteStream(path.join(__dirname, fileLocation));

        try{

            rawWritableStream.write(payload.split(";base64,").pop(), {encoding: "base64"});
            return <ServiceResponse>{
                notice: "file was successfully written",
                error: null,
                result: {
                    folder: resource.folder,
                    file: fileLocation
                }
            }

        }catch(err){

            return <ServiceResponse>{
                notice: "file was not successfully written",
                error: err,
                result: null
            }
            
        }

   }

}

export default new LocalUploadService();
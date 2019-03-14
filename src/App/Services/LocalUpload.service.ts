/**
 * @author Leon Mwandiringa
 * @uses define file uploads service
 * @return file url or returned error
 */

import Config from "../../../Bootstrap/Config";
import {Request, Response } from "express";
import * as filesys from "fs";
import * as path from "path";

class UploadService{

    //init file upload
   public Init(resource: any, preExec: any, payload: any): object{

        let fs: any = filesys;
        let filename = `${name}-${String(Date.now()).slice(4)}.${resource.extention}`;

        let fileLocation = `${preExec.folder}/${filename}`;
        let rawWritableStream = fs.createWriteStream(fileLocation);

        try{
            rawWritableStream.write(payload.split(";base64,").pop(), {encoding: "base64"});
        }catch(err){
            console.log(err);
        }

        return {
            folder: preExec.folder,
            file: fileLocation
        };
    
   }

}

export default new UploadService();
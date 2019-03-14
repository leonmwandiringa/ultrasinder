/**
 * @author Leon Mwandiringa
 * @uses define file uploads service
 * @return file url or returned error
 */


import * as filesys from "fs";
import * as path from "path";

class LocalFsService{

    //init file upload
   public Init(resourcemeta: any, exec: string): any{

        if(exec === "createdir"){
            return LocalFsService.mkDir(resourcemeta);
        }

   }

   public static mkDir(resourcemeta: any): object{

        let fs: any = filesys;
        let folder = path.join(__dirname, `../../../../uploads/${resourcemeta.name}${String(Date.now())}-folder`);
        try{
            fs.mkdirSync(folder);
            
        }
        catch(err){
            console.log(err);
            return {
                created: false,
                folder: null,
                name: null
            }
        }

        return {
            created: true,
            folder: folder,
            name: resourcemeta.name
        }

   }

}

export default new LocalFsService();
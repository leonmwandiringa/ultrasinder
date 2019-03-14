/**
 * @author Leon Mwandiringa
 * @uses define file uploads service
 * @return file url or returned error
 */


import { Setting } from "../../Models";

class SettingsService{

    //handle settings
   public Init(exec: string, params: any = null): any{

            switch(exec){
                case "getsetting":
                    return SettingsService.getSettings();
                break;
                case "setsetting":
                    return SettingsService.setSettings(params);
                break;
            }


   }

   public static async getSettings(){

        let returnSetting = await Setting.find({setting: "ON"});

            return {
                found: true,
                error: null,
                notice: "Portal Staus attached",
                result: returnSetting
            }
   }

    public static async setSettings(params: any){

        try{
            let userAdmin = await Setting.findOneAndUpdate({_id: params.user});
            if(userAdmin.type != "ADMIN"){
                return {
                    found: true,
                    error: null,
                    notice: "User wasnt allowed to edit setting. requires elevated priviledges",
                    result: false
                }
            }
        }catch(err){
            return {
                found: true,
                error: null,
                notice: "There was an error finding user and editing",
                result: false
            }
        }
        let settings = params.payload;
        let setSetting = await Setting.findOneAndUpdate({setting: params.setting}, {settings});

            return {
                found: true,
                error: null,
                notice: "Portal Staus attached",
                result: true
            }
   }

}

export default new SettingsService();
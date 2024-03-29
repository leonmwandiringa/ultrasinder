/**
 * @author Leon Mwandiringa
 * @uses define file uploads service
 * @return file url or returned error
 */


let jwt = require("jsonwebtoken");
import Config from "../../Config";

class CsrfTokenService{

    //init file upload
   public Init(): any{

        return CsrfTokenService.genToken();

   }

   /**
    * @uses generating csrf tokens
    * @return 256bit encrypted jwt token
    * @params null
    */
   public static genToken(): any{

        let randomKey = Math.floor(Math.random() * 7);
        let Rawtoken = Config.CSRF_TOKENS[randomKey];

        const Encryptedtoken = jwt.sign({
            data: Rawtoken,
        }, Config.CSRF_SECRET,{
            expiresIn: '5h'
        } );

        return Encryptedtoken;

   }

}

export default new CsrfTokenService();
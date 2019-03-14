/**
 * @author Leon Mwandiringa
 * @uses define file uploads service
 * @return file url or returned error
 */


let jwt = require("jsonwebtoken");
import Config from "../../../Bootstrap/Config";

class AuthTokenService{

    //init file upload
   public Init(user: object): any{

        return AuthTokenService.genToken(user);

   }

   public static genToken({name, email, _id}: any): any{

        const Encryptedtoken = jwt.sign({
            data: {
                name,
                email,
                _id
            },
        }, Config.JWT_SECRET,{
            expiresIn: '120h'
        } );

        return Encryptedtoken;

   }

}

export default new AuthTokenService();
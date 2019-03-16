/**
 * @author Leon Mwandiringa
 * @uses define base JWT SECURITY Middleware checks submitted JWT Auth-----
 * @return a Jwt auth security middleware
 */

import { Request, Response, NextFunction } from "express";
import Config from "../../Config";
import MessageResponse from "../Interfaces/HttpResponse.interface";
let jwt = require("jsonwebtoken");
import { User } from "../Models";

class JWTAuthMiddleware{

   //initiate csrf security
   public initSecurity(req: Request, res: Response, next: NextFunction){

        let JWTToken: any;
        let message: MessageResponse;


        req.checkHeaders("Authorization", "Auth Token Header is required").notEmpty();
        JWTToken = String(req.header("Authorization")).trim().slice(6).trim();

        //check validity final
        let validationError = req.validationErrors();

            //handle invalid posted values
            if(validationError){

                return res.status(403).json(<MessageResponse>{
                    status: false,
                    validationMessage: validationError,
                    response: null,
                    responseMessage: `There was a problem validating your authenticity token`
                });

            }else{
                
                //check validty of jwt token
                jwt.verify(JWTToken, Config.JWT_SECRET, async (err: any, decoded: any)=>{

                    if(err){

                        return res.status(403).json(<MessageResponse>{
                            status: false,
                            validationMessage: err,
                            response: null,
                            responseMessage: `There was a problem validating your authenticity token`
                        });

                    }
                    
                    let decodedToken = decoded.data;

                    try{

                        let FoundUser = await User.findOne({email: decodedToken.email});
                        return FoundUser ? next() : res.status(403).json(<MessageResponse>{
                            status: false,
                            validationMessage: "error",
                            response: null,
                            responseMessage: `There was a problem validating your token`
                        });

                    }catch(err){

                        return res.status(403).json(<MessageResponse>{
                            status: false,
                            validationMessage: "error",
                            response: null,
                            responseMessage: `There was a problem validating your token`
                        });

                    }
                    

                });

            }

   }


}

export default new JWTAuthMiddleware();
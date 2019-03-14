/**
 * @author Leon Mwandiringa
 * @uses define base CSRF SECURITY Middleware checks submitted csrf input------- staeless csrf security
 * @return a csrf security middleware
 */

import { Router, Request, Response, NextFunction } from "express";
import Config from "../../Config";
import MessageResponse from "../Interfaces/Response.interface";
const jwt = require("jsonwebtoken");

class CSRFHeaderSecurity{

   protected router: Router;
   constructor(){

       this.router = Router();

   }

   //initiate csrf security
   public static initSecurity(req: Request, res: Response, next: NextFunction){

        let csrftoken: any;
        let message: MessageResponse;

        req.checkHeaders("X-Csrf-Token", "CSRF token Header is required").notEmpty();
        csrftoken = req.header("X-Csrf-Token");


        //check validity final
        let validationError = req.validationErrors();

            //handle invalid posted values
            if(validationError){
                
                message =  {
                    status: false,
                    validationMessage: validationError,
                    response: null,
                    responseMessage: 'Csrf Token is required'
                }
                return res.status(403).json(message);

            }else{

                //check validty of csrf token
                jwt.verify(csrftoken, Config.CSRF_SECRET, (err: any, decoded: any)=>{

                    if(err){
                    
                        return res.status(403).json({
                            status: false,
                            validationMessage: "error",
                            response: null,
                            responseMessage: `There was a problem validating your authenticity token`
                        });


                    }
        
                    //verify token fro provided tokens 
                    if(Config.CSRF_TOKENS.indexOf(decoded.data) != -1){
        
                        next();
        
                    }else{

                        return res.status(403).json({
                            status: false,
                            validationMessage: "error",
                            response: null,
                            responseMessage: `Your CSRF Token Header is invalid`
                        });
                        
                    }
        
                });

            }

   }


}

export default CSRFHeaderSecurity;
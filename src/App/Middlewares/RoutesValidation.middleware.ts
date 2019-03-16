/**
 * @author Leon Mwandiringa
 * @uses define auth router middleware
 * @return response || next router
 */

import { Request, Response, NextFunction } from "express";
import MessageResponse from "../Interfaces/HttpResponse.interface";

//validate auth routes
class AuthRoutesValidation{

   /**
    * @uses validating routes
    * @params case insertion of route requirements
    * @returns express middleware
    */
   public static ValidateParams(req: Request, res: Response, next: NextFunction): any{

        switch(req.url){

            case "v1/auth/register":
                req.checkBody("name", "Name is required").notEmpty();
                req.checkBody("email", "email is required").notEmpty();
                req.checkBody("password", "password is required").notEmpty();
            break;

            case "v1/auth/login":
                req.checkBody("email", "email is required").notEmpty();
                req.checkBody("email", "email is invalid").isEmail();
                req.checkBody("password", "password is required").notEmpty();
            break;

            case "v1/auth/forgot-password":
                req.checkBody("email", "email is required").notEmpty();
                req.checkBody("email", "email is invalid").isEmail();
            break;

            case "v1/auth/reset-password":
                req.checkBody("email", "email is required").notEmpty();
                req.checkBody("email", "email is invalid").isEmail();
            break;

        }


       if(req.validationErrors()){

            return res.status(200).json(<MessageResponse>{
                status: false,
                validationMessage: req.validationErrors(),
                response: null,
                responseMessage: "provided params are invalid"
            });

        }

       return next();

   }

}

export default AuthRoutesValidation;
/**
 * @author Leon Mwandiringa
 * @uses define auth router middleware
 * @return response || next router
 */

import { Request, Response, NextFunction } from "express";
import ResponseInterface from "../Interfaces/Response.interface";

//validate auth routes
class AuthRoutesValidation{

   private static responseMessage: ResponseInterface;

   //validate incomig requests for such routes
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

            AuthRoutesValidation.responseMessage = {

                status: false,
                validationMessage: req.validationErrors(),
                response: null,
                responseMessage: "provided params are invalid"

            }

            return res.status(200).json(AuthRoutesValidation.responseMessage);

        }

       return next();

   }

}

export default AuthRoutesValidation;
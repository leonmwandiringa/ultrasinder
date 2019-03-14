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

            case "/auth/register":
                req.checkBody("name", "Name is required").notEmpty();
                req.checkBody("email", "email is required").notEmpty();
                req.checkBody("password", "password is required").notEmpty();
                req.checkBody("type", "Account Type is required").notEmpty();
            break;

            case "/auth/login":
                req.checkBody("email", "email is required").notEmpty();
                req.checkBody("password", "password is required").notEmpty();
            break;

            case "/awardsubmission/create":
                req.checkBody("title", "title is required").notEmpty();
                req.checkBody("category", "category is required").notEmpty();
                req.checkBody("award", "award is required").notEmpty();
                //req.checkBody("attachments", "attachments is required").notEmpty();
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
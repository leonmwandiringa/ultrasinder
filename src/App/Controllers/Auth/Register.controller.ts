/**
 * @author Leon Mwandiringa
 * @uses define projects creating and edits
 * @return event instance
 */

import {Request, Response } from "express";
import ResponseInterface from "../../Interfaces/Response.interface";
import { AuthService } from "../../Services";
import { ServerResponse } from "http";

class RegisterController{

   public static SvResponse: ResponseInterface;

    //register user
   public async Init(req: Request, res: Response){

        let ServiceResponse = await AuthService.Init("register", req.body);

        switch(ServiceResponse.result){

            case null:
                return res.status(403).json({
                    status: false,
                    validationMessage: ServiceResponse.error,
                    response: null,
                    responseMessage: ServiceResponse.notice
                });
            break;
            default:
                return res.status(200).json({
                    status: true,
                    validationMessage: null,
                    response: ServiceResponse.result,
                    responseMessage: ServiceResponse.notice
                });
            break;
            
        }

   }

}

export default new RegisterController();
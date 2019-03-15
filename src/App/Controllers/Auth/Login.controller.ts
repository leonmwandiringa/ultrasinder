/**
 * @author Leon Mwandiringa
 * @uses define projects creating and edits
 * @return event instance
 */

import {Request, Response } from "express";
import ResponseInterface from "../../Interfaces/Response.interface";
import { AuthService } from "../../Services";

class LoginController{

   public static SvResponse: ResponseInterface;

    //new project creation
    public async Init(req: Request, res: Response){

        let ServiceResponse = await AuthService.Init("login", req.body);

        switch(ServiceResponse.user){

            case null:
                return res.status(403).json({
                    status: false,
                    validationMessage: ServiceResponse.error,
                    response: ServiceResponse.user,
                    responseMessage: ServiceResponse.notice
                });
            break;
            default:
                return res.status(200).json({
                    status: true,
                    validationMessage: null,
                    response: ServiceResponse.user,
                    responseMessage: ServiceResponse.notice
                });
            
        }

   }

}

export default new LoginController();
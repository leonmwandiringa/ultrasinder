/**
 * @author Leon Mwandiringa
 * @uses define ResetPassword Controller
 * @return ResetPasswordController obj
 */

import {Request, Response } from "express";
import ResponseInterface from "../../Interfaces/Response.interface";
import { AuthService } from "../../Services";

class ResetPasswordController{

   public static SvResponse: ResponseInterface;

    //reset PasswordMethod
    public async Init(req: Request, res: Response){

        let ResetReset = await AuthService.Init("applyreset", req.body);

        switch(ResetReset.result){

            case null:
                return res.status(403).json({
                    status: false,
                    validationMessage: ResetReset.error,
                    response: ResetReset.result,
                    responseMessage: ResetReset.notice
                });
            break;
            default:
                return res.status(200).json({
                    status: true,
                    validationMessage: null,
                    response: ResetReset.result,
                    responseMessage: ResetReset.notice
                });
            
        }

   }

}

export default new ResetPasswordController();
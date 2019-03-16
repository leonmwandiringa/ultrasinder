/**
 * @author Leon Mwandiringa
 * @uses define ResetPassword Controller
 * @return ResetPasswordController obj
 */

import {Request, Response } from "express";
import { AuthService } from "../../Services";
import MessageResponse from "../../Interfaces/HttpResponse.interface";

class ResetPasswordController{

    /**
     * @uses reset user password
     * @return response exec
     * @params req, res
     */
    public async Init(req: Request, res: Response){

        let ResetReset: any = await AuthService.CreateUser(req.body);

        switch(ResetReset.result){

            case null:
                return res.status(403).json(<MessageResponse>{
                    status: false,
                    validationMessage: ResetReset.error,
                    response: ResetReset.result,
                    responseMessage: ResetReset.notice
                });
            break;
            default:
                return res.status(200).json(<MessageResponse>{
                    status: true,
                    validationMessage: null,
                    response: ResetReset.result,
                    responseMessage: ResetReset.notice
                });
            
        }

   }

}

export default new ResetPasswordController();
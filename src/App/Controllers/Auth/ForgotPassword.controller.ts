/**
 * @author Leon Mwandiringa
 * @uses forgot password exec
 * @return forgot password object
 */

import { Request, Response } from "express";
import ResponseInterface from "../../Interfaces/HttpResponse.interface";
import { AuthService } from "../../Services";

class ForgotPasswordController{

   public static SvResponse: ResponseInterface;

    //new project creation
    public async Init(req: Request, res: Response){

        let ServiceResponse = await AuthService.Init("reset", req.body);

        switch(ServiceResponse.result){

            case null:
                return res.status(403).json({
                    status: false,
                    validationMessage: ServiceResponse.error,
                    response: ServiceResponse.result,
                    responseMessage: ServiceResponse.notice
                });
            break;
            default:
                return res.status(200).json({
                    status: true,
                    validationMessage: null,
                    response: ServiceResponse.result,
                    responseMessage: ServiceResponse.error
                });
            
        }

   }

}

export default new ForgotPasswordController();
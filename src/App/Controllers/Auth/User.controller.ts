/**
 * @author Leon Mwandiringa
 * @uses define projects creating and edits
 * @return event instance
 */

import {Request, Response } from "express";
import ResponseInterface from "../../Interfaces/HttpResponse.interface";
import { AuthService } from "../../Services";
import { ServerResponse } from "http";

class UserController{

   public static SvResponse: ResponseInterface;

   //new project creation
    public async User(req: Request, res: Response){

        let { user } = req.params;
        let ServerResponse = await AuthService.Init("user", user);

        switch(ServerResponse.result){

            case null:
                return res.status(200).json({
                    status: false,
                    validationMessage: ServerResponse.error,
                    response: ServerResponse.result,
                    responseMessage: ServerResponse.error
                });
            break;
            default:
                return res.status(200).json({
                    status: true,
                    validationMessage: null,
                    response: ServerResponse.result,
                    responseMessage: ServerResponse.error
                });
            
        }

   }

      //new project creation
    public async AllUsers(req: Request, res: Response){

        let ServerResponse = await AuthService.Init("users");

        switch(ServerResponse.result){

            case null:
                return res.status(200).json({
                    status: false,
                    validationMessage: ServerResponse.error,
                    response: ServerResponse.result,
                    responseMessage: ServerResponse.error
                });
            break;
            default:
                return res.status(200).json({
                    status: true,
                    validationMessage: null,
                    response: ServerResponse.result,
                    responseMessage: ServerResponse.error
                });
            
        }

   }



    //new project creation
    public async DeleteUser(req: Request, res: Response){

        let { user } = req.params;
        let ServerResponse = await AuthService.Init("delete", user);

        switch(ServerResponse.result){

            case null:
                return res.status(200).json({
                    status: false,
                    validationMessage: ServerResponse.error,
                    response: ServerResponse.result,
                    responseMessage: ServerResponse.notice
                });
            break;
            default:
                return res.status(200).json({
                    status: true,
                    validationMessage: null,
                    response: ServerResponse.result,
                    responseMessage: ServerResponse.notice
                });
            break;
            
        }

   }

    //update user by admin
    public async UpdateUserByAdmin(req: Request, res: Response){

        let ServerResponse = await AuthService.Init("updateuserbyadmin", req.body);

        switch(ServerResponse.result){

            case null:
                return res.status(200).json({
                    status: false,
                    validationMessage: ServerResponse.error,
                    response: ServerResponse.result,
                    responseMessage: ServerResponse.notice
                });
            break;
            default:
                return res.status(200).json({
                    status: true,
                    validationMessage: null,
                    response: ServerResponse.result,
                    responseMessage: ServerResponse.notice
                });
            break;
            
        }

   }
            
   //update current user
    public async UpdateUser(req: Request, res: Response){

        let ServerResponse = await AuthService.Init("updateuser", req.body);

        switch(ServerResponse.result){

            case null:
                return res.status(200).json({
                    status: false,
                    validationMessage: ServerResponse.error,
                    response: ServerResponse.result,
                    responseMessage: ServerResponse.notice
                });
            break;
            default:
                return res.status(200).json({
                    status: true,
                    validationMessage: null,
                    response: ServerResponse.result,
                    responseMessage: ServerResponse.notice
                });
            break;
            
        }

   }


}

export default new UserController();
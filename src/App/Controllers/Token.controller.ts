/**
 * @author Leon Mwandiringa
 * @uses define projects creating and edits
 * @return event instance
 */

import {Request, Response } from "express";
import ResponseInterface from "../Interfaces/Response.interface";
import CsrfTokenService from "../Services/CsrfToken.service";

class Token{

   public static SvResponse: ResponseInterface;

   //new project creation
   public Init(req: Request, res: Response): Response{

        try{

            let CsrfToken = CsrfTokenService.Init();

            return res.status(200).json({
                status: true,
                validationMessage: null,
                response: CsrfToken,
                responseMessage: "success"
            });

        }catch(e){

            return res.status(200).json({
                status: true,
                validationMessage: null,
                response: e,
                responseMessage: "success"
            });

        }

   }

}

export default new Token();
/**
 * @author Leon Mwandiringa
 * @uses define base JWT SECURITY Middleware checks submitted JWT Auth-----
 * @return a Jwt auth security middleware
 */

import { Router, Request, Response, NextFunction } from "express";
import Config from "../../Config";
import MessageResponse from "../Interfaces/Response.interface";
let jwt = require("jsonwebtoken");
import User from "../Models/Schema/User.schema";

class JWTAuthMiddleware{

   //initiate csrf security
   public initSecurity(req: Request, res: Response, next: NextFunction){

        let JWTToken: any;
        let message: MessageResponse;


        req.checkHeaders("Authorization", "Auth Token Header is required").notEmpty();
        JWTToken = String(req.header("Authorization")).trim().slice(6).trim();

        //check validity final
        let validationError = req.validationErrors();

            //handle invalid posted values
            if(validationError){
                
                message =  {
                    status: false,
                    validationMessage: validationError,
                    response: null,
                    responseMessage: `There was a problem validating your authenticity token`
                }

                return res.status(403).json(message);

            }else{
                
                //check validty of jwt token
                jwt.verify(JWTToken, Config.JWT_SECRET, (err: any, decoded: any)=>{

                    if(err){

                        return res.status(403).json({
                            status: false,
                            validationMessage: validationError,
                            response: null,
                            responseMessage: `There was a problem validating your authenticity token`
                        });

                    }
                    
                    let decodedToken = decoded.data;

                    User.findOne({email: decodedToken.email}, (err: any, user: any)=>{

                        if(err){

                            return res.status(500).json({
                                status: false,
                                validationMessage: "error",
                                response: null,
                                responseMessage: `There was a problem looking for this user`
                            });
                            
                        }

                        if(user == null){

                            return res.status(403).json({
                                status: false,
                                validationMessage: "error",
                                response: null,
                                responseMessage: `There was a problem validating your token`
                            });

                        }else{
                            //pass user data to the next route controller
                            //didnt wanna go through adding extra interface props with strict types
                            next();

                        }


                    });
                    

                });

            }

   }


}

export default new JWTAuthMiddleware();
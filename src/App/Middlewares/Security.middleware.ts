/**
 * @author Leon Mwandiringa
 * @uses define and run base server instance security
 * @return Router and Nextfunction object if emmited
 */

import Middleware from "./Base.middleware";
import { Request, Response, NextFunction } from "express";

 class Security{

    public Init(req: Request, res: Response, next: NextFunction){

        Security.CORE();
        Security.CORS();
        Security.XSS();
        Security.CSP();
        Security.CrossDomainPolicy();
        next();

    }
    //define basic base security
    public static CORE(){

        return function(res: Response){
            res.header("X-Powered-By", "Seciuritycoat security");
            res.header("X-Frame-Options", "ALLOW-FROM https://www.URL.com");
            res.header("X-Download-Options", "noopen");
        }  

    }

    //run Cors middleware
    public static CORS(){

        return function(res: Response){
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, X-HTTP-METHOD, X-Csrf-Token, Authorization");
            res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, DELETE, PUT");                                
        }
    }

    //define basic XSS protection
    public static XSS(){

        return function(res: Response){
            res.header("X-Content-Type-Option", "nosniff");
            res.header("X-XSS-Protection", "1; mode=block");
            res.header("Referrer-Policy", "same-origin");
        }

    }

    //define basic CSP security
    public static CSP(){

        return function(res: Response){
            res.header("Content-Security-Policy", "default src");
        }

    }

    //permitted cross dmain policy(flash and acrobat instruction)
    public static CrossDomainPolicy(){

        return function(res: Response){
            res.header("X-Permitted-Cross-Domain-Policies", "none");
        }

    }


 }

 export default new Security();
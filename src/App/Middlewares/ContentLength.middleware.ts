/**
 * @author Leon Mwandiringa
 * @uses define content length security
 * @return defined content length max size
 */

import { Router, Request, Response, NextFunction } from "express";
import HttpResponse from "../Interfaces/HttpResponse.interface";

class ContentLengthMiddleware{

    private static contentLength = {
        DEFAULT_MAX_LENGTH: 999,
    };

   public static Init(opts?: object){

        let _opts: any = opts || {};

        var _maxLength = _opts.max || ContentLengthMiddleware.contentLength.DEFAULT_MAX_LENGTH;

        var _middleware = function(request: Request, response: Response, next: NextFunction) {
            var _contentLength: any = request.headers['content-length'] ? parseInt(request.headers['content-length']) : null;

            if (_contentLength > _maxLength) {
                
                response.status(403).json(<HttpResponse>{
                    status: false,
                    validationMessage: "Invalid payload; too big.",
                    response: null,
                    responseMessage: "Invalid payload; too big."
                });

                return;
            }

            next();
        }

        return _middleware;

   }

}

export default ContentLengthMiddleware;

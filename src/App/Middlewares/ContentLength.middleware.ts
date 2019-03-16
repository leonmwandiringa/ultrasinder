/**
 * @author Leon Mwandiringa
 * @uses define content length security
 * @return defined content length max size
 */

import { Router, Request, Response, NextFunction } from "express";
import MessageResponse from "../Interfaces/HttpResponse.interface";

class ContentLengthMiddleware{

    private static contentLength = {
        DEFAULT_MAX_LENGTH: 999,
        DEFAULT_ERROR_MESSAGE: "Invalid payload; too big."
    };

   public static Init(opts?: object){

        let _opts: any = opts || {};

        var _maxLength = _opts.max || ContentLengthMiddleware.contentLength.DEFAULT_MAX_LENGTH;
        var _message = _opts.message || ContentLengthMiddleware.contentLength.DEFAULT_ERROR_MESSAGE;

        var _middleware = function(request: Request, response: Response, next: NextFunction) {
            var _contentLength: any = request.headers['content-length'] ? parseInt(request.headers['content-length']) : null;

            if (_contentLength > _maxLength) {
                
                response.status(403).json(<MessageResponse>{
                    status: false,
                    validationMessage: _message,
                    response: null,
                    responseMessage: _message
                });

                return;
            }

            next();
        }

        return _middleware;

   }

}

export default ContentLengthMiddleware;

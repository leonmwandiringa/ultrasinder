/**
 * @author Leon Mwandiringa
 * @uses define global input and output validator
 * @return express validation object
 */

 import * as expressValidator  from "express-validator";

 class ValidationMiddleware {

    public static Validation(){

        return expressValidator({

            errorFormatter: function(param, msg, value): any {

                var namespace = param.split('.')
                  , root    = namespace.shift()
                  , formParam = root;
              
                while(namespace.length) {
                  formParam += '[' + namespace.shift() + ']';
                }

                return {
                    param : formParam,
                    msg   : msg,
                    value : value
                };
            }

        });

    }

 }

 export default ValidationMiddleware;
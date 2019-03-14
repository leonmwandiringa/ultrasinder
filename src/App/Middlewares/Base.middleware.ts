/**
 * @author Leon Mwandiringa
 * @uses define base Middleware
 * @return Router and Nextfunction object if emmited
 */

import { Router, Request, Response, NextFunction } from "express";

class Middleware{

   protected router: Router;
   constructor(){

       this.router = Router();

   }

}

export default Middleware;

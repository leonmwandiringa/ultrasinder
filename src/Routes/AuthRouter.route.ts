/**
 * @author Leon Mwandiringa
 * @uses define global state routes exec initiator
 * @return server app object
 */

import {Router} from "express";
import { CSRF, RoutesValidation, Auth } from "../App/Middlewares";

class StateRoutes{

    public router: Router;

    constructor(){
        this.router = Router();
        this.router.use(RoutesValidation.ValidateParams);
        this.initiateRoutes();
    }

    //bundle routes
    private initiateRoutes(): void{

    }

}

export default new StateRoutes().router;
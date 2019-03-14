/**
 * @author Leon Mwandiringa
 * @uses define global unauthenticated users base routes
 * @return server app object
 */

import { Router } from "express";
import { RoutesValidation, CSRF } from "../App/Middlewares";
import MainController from "../App/Controllers/Main.controller";


class GuestRoutes{

    public router: Router;

    constructor(){
        this.router = Router();
        this.router.use(RoutesValidation.ValidateParams);
        this.initiateRoutes();
    }

    //bundle routes
    private initiateRoutes(): void{

        this.router.get("/token", MainController.SingleGet("token"));

        this.router.post("/auth/register", CSRF.initSecurity, MainController.SingleAuth("register"));

        this.router.post("/auth/login", CSRF.initSecurity, MainController.SingleAuth("login"));

        this.router.post("/auth/forgot-password", CSRF.initSecurity, MainController.SingleAuth("reset"));

        this.router.post("/auth/reset-password", CSRF.initSecurity, MainController.SingleAuth("applyreset"));

        this.router.get("/rawfile/:url", MainController.SingleGet("rawfile"));

    }

}

export default new GuestRoutes().router;
/**
 * @author Leon Mwandiringa
 * @uses define global unauthenticated users base routes
 * @return server app object
 */

import { Router } from "express";
import { RoutesValidation, CSRF } from "../App/Middlewares";
import { TokenController, RegisterController, ResetPasswordController, ForgotPasswordController, LoginController } from "../App/Controllers";


class GuestRoutes{

    public router: Router;

    constructor(){
        this.router = Router();
        this.router.use(RoutesValidation.ValidateParams);
        this.initiateRoutes();
    }

    /**
     * @uses Bundle all guest Routes
     */
    private initiateRoutes(): void{

        this.router.get("v1/token", TokenController.Init);
        this.AuthRoutes();
    }

    /**
     * @uses Authentication routes
     * @returns void
     */
    private AuthRoutes(): void{
        this.router.post("v1/auth/register", CSRF.initSecurity, RegisterController.Init);

        this.router.post("v1/auth/login", CSRF.initSecurity, LoginController.Init);

        this.router.post("v1/auth/forgot-password", CSRF.initSecurity, ForgotPasswordController.Init);

        this.router.post("v1/auth/reset-password", CSRF.initSecurity, ResetPasswordController.Init);
    }

}

export default new GuestRoutes().router;
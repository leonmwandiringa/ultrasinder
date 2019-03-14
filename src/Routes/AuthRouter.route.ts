/**
 * @author Leon Mwandiringa
 * @uses define global state routes exec initiator
 * @return server app object
 */

import {Router} from "express";
import MainController from "../App/Controllers/Main.controller";
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

        this.router.post("/awardsubmission/create", CSRF.initSecurity, Auth.initSecurity, MainController.SingleCreate("submission"));
        
        this.router.get("/awardsubmission/listing/:user", CSRF.initSecurity, Auth.initSecurity, MainController.MultipleGet("awardsforuser"));

        this.router.get("/awardsubmission/listings/:user", CSRF.initSecurity, Auth.initSecurity, MainController.MultipleGet("awards"));

        this.router.get("/awardsubmission/review/:user", CSRF.initSecurity, Auth.initSecurity, MainController.MultipleGet("reviewawards"));

        this.router.get("/details/user/:user", CSRF.initSecurity, Auth.initSecurity, MainController.SingleAuth("user"));

        this.router.delete("/details/user/:user", CSRF.initSecurity, Auth.initSecurity, MainController.SingleAuth("delete"));

        this.router.get("/details/user", CSRF.initSecurity, Auth.initSecurity, MainController.SingleAuth("users"));

        this.router.post("/awardsubmission/judge", CSRF.initSecurity, Auth.initSecurity, MainController.SingleModify("submission"));

        this.router.post("/awardsubmissionedit/judge", CSRF.initSecurity, Auth.initSecurity, MainController.SingleModify("editsubmission"));

        this.router.get("/details/admin", CSRF.initSecurity, Auth.initSecurity, MainController.SingleStats("admin"));

        this.router.delete("/award/:id", CSRF.initSecurity, Auth.initSecurity, MainController.SingleDelete("award"));

        this.router.put("/award/:id", CSRF.initSecurity, Auth.initSecurity, MainController.SingleModify("updaterecord"));

        this.router.put("/user/:id", CSRF.initSecurity, Auth.initSecurity, MainController.SingleModify("updateuser"));

        this.router.put("/user/adminset/:id", CSRF.initSecurity, Auth.initSecurity, MainController.SingleModify("updateuserbyadmin"));

        //this.router.get("/settings", CSRF.initSecurity, Auth.initSecurity, MainController.SingleGet("settings"));

    }

}

export default new StateRoutes().router;
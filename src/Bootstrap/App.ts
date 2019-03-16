/**
 * @author Leon Mwandiringa
 * @uses bootsrap mvc app instance
 * @return server app object
 */


const superdooper = require("superdooper");
import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as gzip from "compression";
import { Security, GlobalValidation, ContentLength } from "../App/Middlewares";
//import GlobalValidation from "../App/Middlewares/BaseValidations.middleware";
import GuestRoutes from "../Routes/GuestRouter.route";
import AuthRoutes from "../Routes/AuthRouter.route";
import Config from "../Config";

//import RealtimeMiddleware from "../App/Middlewares/RealtimeLogger";

class App{

    public express: express.Application;

    constructor(){

        this.express = express();
        this.moduleMiddlewares();
        this.LocalMiddlewares();
        this.dbConfig();
        this.routes();
        //this.RunEventsDispatcher();

    }

    /* define db connection */
    private dbConfig(){
        let mongo: any = mongoose;
        let url: string = Config.MONGO_URL_PROD;
        mongo.Promise = global.Promise;
        mongo.connect(url, { useNewUrlParser: true });
        //let db = mongoose.connect(url, { useNewUrlParser: true });
        return mongo;

    }

    /* run global modules middlewares */
    private moduleMiddlewares(): void{

        this.express.use(gzip());
        this.express.use(bodyParser.json({limit: '500000mb'}));
        this.express.use(bodyParser.urlencoded({extended: true, limit: '500000mb'}));

    }

    /* define and run global local middlewares */
    private LocalMiddlewares(): void{

        //logger to file middlewares
        this.express.use(superdooper('Logs/logs.log'));
        //security middlewares
        this.express.use(Security.Init);
        //global validations
        this.express.use(GlobalValidation.Validation());
        //content length security
        this.express.use(ContentLength.Init({}));

    }

    /* call and run global router middlewares */
    private routes(): void{

        this.express.use(GuestRoutes);
        this.express.use(AuthRoutes);
  
    }

}

export default new App().express;
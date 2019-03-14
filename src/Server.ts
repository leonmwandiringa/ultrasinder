/**
 * @author Leon Mwandiringa
 * @uses run node server instance
 * @return mixed exec 
 */
import * as http from "http";
import * as debug from "debug";
import App from "./Bootstrap/App";
import { CoreService } from "./App/Services";

//set debug for express server
debug("ts-express:server");

let Port: number = CoreService.normalize(process.env.PORT || 3000); 

App.set("port", Port);

let Server: http.Server = http.createServer(App);

Server.listen(Port);
Server.on("listening", ()=>{
        let addr = Server.address();
        let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
        debug(`Listening on ${bind}`);
        console.log("running");
});
Server.on("error", CoreService.onError);
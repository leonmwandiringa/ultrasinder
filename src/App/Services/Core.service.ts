/**
 * @author Leon Mwandiringa
 * @uses bundle core server utilities and helpers
 * @return mixed values
 */

 /* Normalized parsed port number to the required type */
 class CoreService{

  /**
   * @uses normalize parsed values to number
   * @return number
   * @params number } string
   */
    public static normalize(value: number | string): number{

        let port: string | number = value;
        let resolvedPort: number;
        if(typeof port == "string"){
            resolvedPort = parseInt(port);
        }else{
            resolvedPort = port;
        }

        return resolvedPort;
    } 

    /**
     * @uses runtime error handling
     * @returns void
     * @params error obj, port number
     */
    public static onError(error: NodeJS.ErrnoException, port: number | string): void{

        if (error.syscall !== 'listen'){
            throw error;
        }

        let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;

        switch(error.code) {
          case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
          case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
          default:
            throw error;
        }
          
    }

 }

 export default CoreService;
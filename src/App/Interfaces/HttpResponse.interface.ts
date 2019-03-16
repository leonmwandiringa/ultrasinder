
 /**
 * @author Leon Mwandiringa
 * @uses define global controllers type and return interface
 * @return type anot object
 */

 interface MessageResponse{

    status: boolean,
    validationMessage: any,
    response: any,
    responseMessage: string

 }

 export default MessageResponse;
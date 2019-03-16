
 /**
 * @author Leon Mwandiringa
 * @uses define global controllers type and return interface
 * @return type anot object
 */

interface ServiceResponse{

    error: object | string | null,
    notice: object | string,
    result: any
 }

 export default ServiceResponse;
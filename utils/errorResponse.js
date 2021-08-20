class ErrorResponse extends Error {
    constructor(message,statuscode){
        super (message)
        this.statuscode=statuscode
        this.message=message
    }
}
export default ErrorResponse
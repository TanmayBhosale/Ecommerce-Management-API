export class CustomError{
    public msg: string = ""
    public error: any

    constructor(msg:string,error:any){
        this.msg = msg
        this.error = error
    }
}
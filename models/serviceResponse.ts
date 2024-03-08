interface Body{
    msg: string,
    data: any
}

export default class ServiceResponse{
    public statusCode: number = 0
    public body : Body

    constructor(statusCode:number,msg:string,data:any){
        this.statusCode = statusCode,
        this.body = {
            msg,
            data
        }
    }
}
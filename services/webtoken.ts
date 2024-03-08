import jwt from "jsonwebtoken"
const secret = process.env.TOKEN_SECRET!
export function signToken(data:any){
    return jwt.sign(data,secret)
}

export function verifyToken(token:string){
    try{
        return jwt.verify(token,secret)
    }catch(e){
        // console.log(e)
        return null
    }
}
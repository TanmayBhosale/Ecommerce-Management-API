import { Request, Response } from "express"
import { createUser, loginUser } from "../services/user"
import { RoleTypes } from "../models/role"

export async function createUserController(req:Request,res:Response){
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const role = req.body.role

    if(typeof name === "undefined" || typeof email === "undefined" || typeof password === "undefined" || typeof role === "undefined"){
        res.statusCode = 400
        return res.json({msg:"incomplete data",data:null})
    }
    
    const data = await createUser(name,email,password,role as RoleTypes)

    res.statusCode = data.statusCode
    return res.json(data.body)
}

export async function loginUserController(req:Request,res:Response){
    const email = req.body.email
    const password = req.body.password

    if(typeof email === "undefined" || typeof password === "undefined"){
        res.statusCode = 400
        return res.json({msg:"incomplete data",data:null})
    }

    const data = await loginUser(email,password)

    res.statusCode = data.statusCode
    return res.json(data.body)
}
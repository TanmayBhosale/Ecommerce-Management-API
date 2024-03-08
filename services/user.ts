import { NextFunction, Request, Response } from "express";
import { RoleTypes, getRoleById } from "../models/role";
import ServiceResponse from "../models/serviceResponse";
import { createNewUser, getUserByEmail } from "../models/user";
import {signToken, verifyToken} from "./webtoken";
import serverConfig from "../serverConfig";
import { Role, User } from "@prisma/client";

export async function createUser(name:string,email:string,password:string,role:RoleTypes){
    try{
        let user = await getUserByEmail(email)
        if(user !== null){
            return new ServiceResponse(409,"user exists",null)
        }

        user = await createNewUser(name,email,role,password)

        if(user === null){
            return new ServiceResponse(500,"unable to create user",null)
        }
        const roleModel = await getRoleById(user.role.id)
        if(roleModel === null){
            return new ServiceResponse(404,"User role not found",null)
        }
        const token = signToken(user)
        return new ServiceResponse(201,"user created",{...user,token})
    }catch(e){
        return new ServiceResponse(500,"internal server error",null)
    }
}

export async function loginUser(email:string,password:string){
    try{
        const user = await getUserByEmail(email)

        if(user === null){
            return new ServiceResponse(404,"User not found",null)
        }

        if(user.password !== password){
            return new ServiceResponse(400,"incorrect information",null)
        } 
        const token = signToken(user)
        return new ServiceResponse(200,"loggedin",{...user,token})
    }catch(e){
        return new ServiceResponse(500,"internal server error",e)
    }
}

export function authUser(req:Request,res:Response,next:NextFunction){
    const openRoutes = serverConfig["open-routes"]
    const userRoutes = serverConfig["user-routes"]
    const route = req.url

    console.log(route)
    if(openRoutes.has(route)) return next()

    const authBearer = req.headers.authorization
    if(authBearer === undefined){
        res.statusCode = 401
        return res.json({mag:"Unauthorized 1",data:null})
    }
    const token = authBearer.split(" ")[1]
    const user = verifyToken(token)
    if(user === null){
        res.statusCode = 401
        return res.json({msg:"Unauthorized 2",data:null})
    }
    req.body.user = user as User
    req.body.role = (user as any).role as Role
    if(!userRoutes.has(route) && req.body.role.name !== "Admin"){
        res.statusCode = 401
        return res.json({msg:"Unauthorized 3",data:null})
    }

    next()
}
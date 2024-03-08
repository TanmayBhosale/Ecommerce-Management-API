import prisma from "../services/prismaClient"
import { CustomError } from "./error"
import { RoleTypes, getRoleByName } from "./role"

export async function createNewUser(name:string,email:string,role:RoleTypes,password:string){
    const roleModel = await getRoleByName(role)
    if(!roleModel){
        console.log("role null")
        return null
    }
    try{

        const user = await prisma.user.create({
            select:{
                id: true,
                name: true,
                email: true,
                password: true,
                role: {
                    select:{
                        id: true,
                        name: true
                    }
                }
            },
            data : {
                name,
                email,
                password,
                role: {
                    connect: roleModel
                }
            }
        })

        return user
    }catch(e){
        throw new CustomError("unable to create user",e)
    }
}

export async function getUserByEmail(email:string){
    try{
        const user = await prisma.user.findUnique({
            select:{
                id: true,
                name: true,
                email: true,
                password: true,
                role: {
                    select:{
                        id: true,
                        name: true
                    }
                }
            },
            where:{
                email: email
            }
        })
        return user
    }catch(e){
        throw new CustomError("User not found",e)
    }
}
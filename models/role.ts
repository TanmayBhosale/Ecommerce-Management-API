import prisma from "../services/prismaClient";

export type RoleTypes = "Admin" | "User"

export async function getRoleByName(name:RoleTypes){
    try{
        const data = await prisma.role.findFirst({
            where: {
                name : name
            }
        })

        return data
    }catch(e){
        return null
    }
}

export async function getRoleById(id:string){
    try{
        const role = await prisma.role.findUnique({
            where:{
                id: id
            }
        })

        return role
    }catch(e){
        return null
    }
}
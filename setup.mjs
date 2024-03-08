import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function setup(){
    try{
        const data = await prisma.role.deleteMany({
            where:{
                name: {
                    in: ["Admin","User"]
                }
            }
        })

        const roles = await prisma.role.createMany({
            data:[{
                name: "Admin"
            },{
                name: "User"
            }]
        })

        console.log(roles)
    }catch(e){
        console.log(e)
    }
}

setup()
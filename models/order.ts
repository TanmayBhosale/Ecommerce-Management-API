import { OrderItem } from "@prisma/client";
import prisma from "../services/prismaClient";

export async function createOrderModel(forUserId:string,orderItems:OrderItem[]){
    try{
        const order = await prisma.order.create({
            data: {
                userId: forUserId,
                orderItems: {
                    connect: orderItems.map(o => ({
                        id:o.id
                    }))
                }
            }
        })

        return order
    }catch(e){

        console.log(e)
        return null
    }
}

export async function getUserOrderModel(forUserId:string){
    try{
        const orders = await prisma.order.findMany({
            where: {
                userId: forUserId
            },
            include: {
                orderItems: true
            }
        })

        return orders
    }catch(e){
        console.log(e)

        return null
    }
}
import { OrderItem } from "@prisma/client";
import prisma from "../services/prismaClient";

export async function createOrderItemsModel(orderItems:OrderItem[]){
    try{
        const promises:Promise<OrderItem>[] = []

        orderItems.forEach(order => promises.push(prisma.orderItem.create({
            data: {
                itemId : order.itemId,
                quentity: order.quentity,
                price: order.price,
                // orderId: order.orderId
            }
        })))

        const d = Promise.all(promises)

        return d
    }catch(e){
        return null
    }
}
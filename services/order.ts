import { Item, OrderItem } from "@prisma/client"
import ServiceResponse from "../models/serviceResponse"
import { getItemsByIdsService, updateItemsService } from "./item"
import { createOrderItemsModel } from "../models/orderItem"
import { createOrderModel, getUserOrderModel } from "../models/order"

export type OrderItemType = {
    id: string,
    quantity: number
}

export async function placeOrderService(forUserId:string,orderItems:OrderItemType[]){
    try{
        const itemIds = orderItems.map(o => o.id)
        const response = await getItemsByIdsService(itemIds)

        if(response.statusCode !== 200){
            return new ServiceResponse(424,"Unable to place order",response.body.data)
        }

        const items = response.body.data as Item[]

        const itemsMap:Map<string,Item> = new Map()

        items.forEach(item => itemsMap.set(item.id,item))

        const oderItemsEntry: OrderItem[] = []

        for(let i=0;i<orderItems.length;i++){
            const itemId = orderItems[i].id
            const itemQuantity = orderItems[i].quantity
            const availableItem = itemsMap.get(itemId)

            if(typeof availableItem === "undefined"){
                return new ServiceResponse(404,"Item with id "+itemId+" not found",null)
            }

            if(availableItem.quantity < itemQuantity){
                return new ServiceResponse(400,"Item with id "+itemId+" out of stock",null)
            }

            oderItemsEntry.push({
                id: "",
                itemId: itemId,
                orderId: "",
                price: availableItem.price,
                quentity: itemQuantity
            })

            availableItem.quantity -= itemQuantity

            itemsMap.set(itemId,availableItem)
        }

        const orderItemsDb = await createOrderItemsModel(oderItemsEntry)
        
        if(orderItemsDb === null) return new ServiceResponse(424,"Unable to create order items",null)

        const orderDb = await createOrderModel(forUserId,orderItemsDb)

        if(orderDb === null) return new ServiceResponse(424,"Unable to place order",null)

        const updatedItems = await updateItemsService(Array.from(itemsMap.values()))

        if(updatedItems === null) return new ServiceResponse(424,"Unable to update items",null)

        return new ServiceResponse(201,"Ok",orderDb)
    }catch(e){
        console.log(e)
        return new ServiceResponse(500,"Internal Server Error",null)
    }
}

export async function getUserOrderService(forUserId:string){
    try{
        const orders = await getUserOrderModel(forUserId)

        if(orders === null) return new ServiceResponse(404,"Orders not found",null)

        return new ServiceResponse(200,"Ok",orders)
    }catch(e){
        return new ServiceResponse(500,"Internal Server Error",null)
    }
}
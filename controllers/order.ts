import { Request, Response } from "express";
import { OrderItemType, getUserOrderService, placeOrderService } from "../services/order";
import { User } from "@prisma/client";

export async function placeOrderController(req:Request,res:Response){
    const user = req.body.user as User
    const orderItems = req.body.orderItems as OrderItemType[]

    if(typeof user === "undefined" || typeof orderItems === "undefined"){
        res.statusCode = 400
        return res.json({msg:"incomplete data",data:null})
    }

    const data = await placeOrderService(user.id,orderItems)

    res.statusCode = data.statusCode
    return res.json(data.body)
}

export async function getUserOrderController(req:Request,res:Response){
    const user = req.body.user as User

    if(typeof user === "undefined"){
        res.statusCode = 401
        return res.json({msg:"Unauthorized",data:null})
    }

    const data = await getUserOrderService(user.id)

    res.statusCode = data.statusCode
    return res.json(data.body)
}
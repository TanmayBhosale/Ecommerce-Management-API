import { Request, Response } from "express";
import { createItemService, deleteItemsService, getAllItemsService, updateItemsService } from "../services/item";
import { Item } from "@prisma/client";

export async function createItemController(req:Request,res:Response){
    const name = req.body.name
    const quantity = req.body.quantity
    const price = req.body.price

    if(typeof name === "undefined" || typeof quantity === "undefined" || typeof quantity !== "number" || typeof price !== 'number'){
        res.statusCode = 400
        return res.json({msg:"incomplete data",data:null})
    }
    
    const data = await createItemService(name,quantity,price)

    res.statusCode = data.statusCode
    return res.json(data.body)
}

export async function getAllItemsController(req:Request,res:Response){
    const data = await getAllItemsService()

    res.statusCode = data.statusCode
    return res.json(data.body)
}

export async function updateItemsController(req:Request,res:Response){
    const items = req.body.items as Item[]

    if(typeof items === "undefined"){
        res.statusCode = 400
        return res.json({msg:"Incomplete data",data:null})
    }

    const data = await updateItemsService(items)

    res.statusCode = data.statusCode
    return res.json(data.body)

}

export async function deleteItemsController(req:Request,res:Response){
    const ids = req.body.ids as string[]

    if(typeof ids === "undefined"){
        res.statusCode = 400
        return res.json({msg:"Incomplete data",data:null})
    }

    const data = await deleteItemsService(ids)

    res.statusCode = data.statusCode
    return res.json(data.body)
}
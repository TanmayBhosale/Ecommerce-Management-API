import { Item } from "@prisma/client";
import { createItemModel, deleteItemsModel, getAllItemsModel, getItemsByIdsModel, updateItemsModel } from "../models/item";
import ServiceResponse from "../models/serviceResponse";

export async function createItemService(name:string,quantity:number,price:number){
    try{
        const item = await createItemModel(name,quantity,price)

        if(item === null){
            return new ServiceResponse(424,"Unable to create item",null)
        }

        return new ServiceResponse(201,"Item created",item)
    }catch(e){
        return new ServiceResponse(500,"Internal server error",e)
    }
}

export async function getAllItemsService(){
    try{
        const items = await getAllItemsModel()

        if(items === null){
            return new ServiceResponse(424,"Unable to create item",null)
        }

        return new ServiceResponse(200,"Ok",items)
    }catch(e){
        return new ServiceResponse(500,"Internal server error",e)
    }
}

export async function updateItemsService(items:Item[]){
    try{
        const updatedItems = await updateItemsModel(items)

        if(updatedItems === null){
            return new ServiceResponse(424,"Unable to update Items",null)
        }

        return new ServiceResponse(200,"ok",updatedItems)
    }catch(e){
        return new ServiceResponse(500,"Internal server error",e)
    }
}

export async function deleteItemsService(ids:string[]){
    try{
        const data = await deleteItemsModel(ids)

        if(data === null){
            return new ServiceResponse(410,"Item already deleted",null)
        }

        return new ServiceResponse(204,"Item deleted",data)
    }catch(e){
        return new ServiceResponse(500,"Internal server error",e)
    }
}

export async function getItemsByIdsService(ids:string[]) {
    try{
        const data = await getItemsByIdsModel(ids)

        if(data === null){
            return new ServiceResponse(404,"Items not found",null)
        }

        return new ServiceResponse(200,"ok",data)
    }catch(e){
        return new ServiceResponse(500,"Internal server error",e)
    }
}
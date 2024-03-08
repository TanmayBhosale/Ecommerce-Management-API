import { Item, Prisma } from "@prisma/client"
import prisma from "../services/prismaClient"

export async function createItemModel(name:string,quantity:number,price:number){
    try{
        const item = await prisma.item.create({
            data: {
                name: name,
                quantity: quantity,
                price: price
            }
        })

        return item
    }catch(e){
        return null
    }
}

export async function getAllItemsModel(){
    try{
        const items = await prisma.item.findMany()

        return items
    }catch(e){
        return null
    }
}

export async function getItemsByIdsModel(ids:string[]) {
    try{
        const items = await prisma.item.findMany({
            where:{
                id:{in:ids}
            }
        })

        return items
    }catch(e){  
        return null
    }
}

export async function updateItemsModel(items:Item[]){
    try{
        const promises: Promise<Item>[] = []

        items.forEach(item => promises.push(prisma.item.update({
            where:{
                id: item.id
            },
            data:{
                ...item
            }
        })))

        const data = await Promise.all(promises)

        return data
    }catch(e){
        console.log(e)
        return null
    }
}

export async function deleteItemsModel(ids:string[]){
    try{
        const data = await prisma.item.deleteMany({
            where:{
                id:{in:ids}
            }
        })

        return {count:data.count}
    }catch(e){
        return null
    }
}
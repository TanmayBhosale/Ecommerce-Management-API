import express from "express"
import { authUser, createUser, loginUser } from "./services/user"
import { RoleTypes } from "./models/role"
import { createUserController, loginUserController } from "./controllers/user"
import { createItemController, deleteItemsController, getAllItemsController, updateItemsController } from "./controllers/item"
import { getUserOrderController, placeOrderController } from "./controllers/order"

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(authUser)

app.get("/",(req,res)=>{
    return res.send("Welcome to Grocery Booking Api")
})

app.post("/user/create", createUserController)

app.post("/user/login",loginUserController)

app.post("/items/create",createItemController)

app.get("/items",getAllItemsController)

app.post("/items/update/",updateItemsController)

app.post("/items/delete",deleteItemsController)

app.post("/orders/place",placeOrderController)

app.get("/orders",getUserOrderController)

app.listen(PORT,()=>console.log(`Server running on port ${PORT} 🚀...`))
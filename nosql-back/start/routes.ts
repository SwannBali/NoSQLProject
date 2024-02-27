/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route"
import Redis from "@ioc:Adonis/Addons/Redis"
import Logger from "@ioc:Adonis/Core/Logger"
Redis.connection()

Route.get("/", async () => {
    return { hello: "world" }
})

Route.get("/test", async () => {
    Logger.info("before test")
    return { hello: "dzadazdazdazd" }
})

Route.get("/redis", async () => {
    const test = await Redis.get("test")

    const allKeys = await Redis.hkeys("produits")

    return { allKeys }
})

Route.post("/register", "AuthController.register")
Route.post("/login", "AuthController.login")

Route.post("/product", "ProductsController.create").middleware("auth")
Route.get("/products", "ProductsController.getAll").middleware("auth")

Route.get("/product/:id", "ProductsController.getOne")
Route.post("/product/search", "ProductsController.search").middleware("auth")

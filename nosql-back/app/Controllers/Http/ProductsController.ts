import Redis from "@ioc:Adonis/Addons/Redis"
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import Product from "App/Models/Product"
import Logger from "@ioc:Adonis/Core/Logger"
import { MongoType } from "App/Types/types"
import { Types } from "@ioc:Adonis/Addons/Mongoose"

// Ici on a trois méthodes, create, getAll et getOne.
// La méthode create permet de créer un produit dans la base de données.
// La méthode getAll permet de récupérer tous les produits de la base de données.
// La méthode getOne permet de récupérer un produit de la base de données en fonction de son id.

Redis.connection()

export default class ProductsController {
    public async create({ request, response }: HttpContextContract) {
        const { name, description, price } = request.all()

        if (!name)
            return response.status(400).json({ message: "Name is required" })
        if (!price)
            return response.status(400).json({ message: "Price is required" })

        const product = Product.create({
            _id: new Types.ObjectId(),
            name,
            description,
            price,
        })

        const result = await Product.find({ _id: (await product)._id })

        return response.status(201).json({
            message: "Produit créé avec succès",
            result,
        })
    }

    public async getAll({ response }: HttpContextContract) {
        const products = await Product.find()

        return response.status(200).json({
            message: "Liste des produits",
            products,
        })
    }

    public async getOne({ params, response }: HttpContextContract) {
        const id = params.id as string

        const product = await Product.find({ _id: id })

        if (!product)
            return response.status(404).json({ message: "Produit introuvable" })

        return response.status(200).json({
            message: "Produit trouvé",
            product,
        })
    }

    public async search({ request, response }: HttpContextContract) {
        const searchTerm = request.input("searchTerm")
        const allKeys = await Redis.hkeys("produits")

        // await Redis.setex("/test", 60, "test")

        const matchingKeys = allKeys.filter((key) => key.startsWith(searchTerm))

        const jsonResult = await Redis.hget("produits", matchingKeys[0])

        Logger.info("before redis")

        if (jsonResult) return response.json(JSON.parse(jsonResult))

        const results = await Product.find({
            name: { $regex: new RegExp(searchTerm, "i") },
        })

        await Redis.hsetnx("produits", searchTerm, JSON.stringify(results))

        return response.json(results)
    }
}

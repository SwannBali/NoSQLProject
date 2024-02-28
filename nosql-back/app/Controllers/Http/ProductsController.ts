import Redis from "@ioc:Adonis/Addons/Redis"
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import Product from "App/Models/Product"
import { Types } from "@ioc:Adonis/Addons/Mongoose"

// Ici on a 4 méthodes, create, getAll et getOne, search.
// La méthode create permet de créer un produit dans la base de données.
// La méthode getAll permet de récupérer tous les produits de la base de données.
// La méthode getOne permet de récupérer un produit de la base de données en fonction de son id.
// La méthode search permet de faire une recherche de produit en fonction du terme de recherche.

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
        const allKeys = await Redis.hkeys("produits") // Ici on récupère toutes les clés de notre base de données Redis

        const matchingKeys = allKeys.filter((key) => key.startsWith(searchTerm)) // Ici on filtre les clés qui commencent par le terme de recherche

        const jsonResult = await Redis.hget("produits", matchingKeys[0]) // Ici on récupère le résultat de la recherche dans notre base de données Redis

        if (jsonResult) return response.json(JSON.parse(jsonResult)) // Ici on retourne le résultat de la recherche si on le trouve dans notre base de données Redis

        const results = await Product.find({
            // Ici on fait la recherche dans notre base de données MongoDB si on ne trouve pas le résultat dans notre base de données Redis
            name: { $regex: new RegExp(searchTerm, "i") },
        })

        if (allKeys.length >= 5) {
            await Redis.hdel("produits", String(allKeys.reverse()[0])) // Ici on supprime la première clé de notre base de données Redis si on a déjà 5 clés
        }

        await Redis.hsetnx("produits", searchTerm, JSON.stringify(results)) // Ici on stocke le résultat de la recherche dans notre base de données Redis

        await Redis.expire("produits", 3600) // Ici on définit une expiration de 1 heure pour notre base de données Redis

        return response.json(results)
    }
}

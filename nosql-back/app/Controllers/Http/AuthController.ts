import { prisma } from "@ioc:Adonis/Addons/Prisma"
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import Hash from "@ioc:Adonis/Core/Hash"

// Ici on a deux méthodes, register et login.
// La méthode register permet de créer un utilisateur dans la base de données.
// La méthode login permet de connecter un utilisateur à l'application.

export default class AuthController {
    public async register({ request, auth }: HttpContextContract) {
        const user = await prisma.user.create({
            data: {
                email: request.input("email"),
                password: await Hash.make(request.input("password")),
                name: request.input("name"),
            },
        })

        const token = await auth.login(user)

        return token
    }

    public async login({ request, auth, response }: HttpContextContract) {
        try {
            const token = await auth.attempt(
                request.input("email"),
                request.input("password"),
            )

            return token
        } catch (error) {
            return response.unauthorized("Invalid credentials")
        }
    }
}

import { Document, Schema, connection } from "@ioc:Adonis/Addons/Mongoose"

export interface ProductInterface extends Document {
    name: string
    description?: string
    price: number
    dateCreated: Date
    dateUpdated: Date
}

const schema = new Schema<ProductInterface>(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: {
            createdAt: "dateCreated",
            updatedAt: "dateUpdated",
        },
    },
)

export default connection.model<ProductInterface>("Product", schema)

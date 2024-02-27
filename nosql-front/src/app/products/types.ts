export type Product = {
    id: string
    name: string
    description?: string
    price: number
}

export type MongoType = {
    _id: string
    name: string
    description?: string
    price: number
}

export type Token = {
    type: string
    token: string
}

export type ProductListProps = {
    products: Product[]
}

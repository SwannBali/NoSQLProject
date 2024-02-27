"use client"
import axios from "axios"
import ProductList from "./_components/ProductList"
import { useEffect, useMemo, useState } from "react"
import { MongoType, Product } from "./types"
import { CircularProgress, Typography } from "@mui/material"
import { useTokenStore } from "../../../TokenSlice/tokenSlice"

axios.defaults.baseURL = "http://127.0.0.1:3333"

const ProductPage = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)

    const token = useTokenStore((state) => state.token)

    useEffect(() => {
        axios
            .get("/products", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                if (response.status !== 200) setError(true)

                const productsresult = response.data.products.map(
                    (product: MongoType) => {
                        return {
                            id: product._id,
                            name: product.name,
                            price: product.price,
                        }
                    },
                ) as Product[]

                setProducts(productsresult)
                setLoading(false)
            })
            .catch((err) => {
                console.log("test")
            })
    }, [])

    return (
        <>
            {error && (
                <Typography variant="h1"> Une erreur est survenue </Typography>
            )}
            {loading && !error ? (
                <CircularProgress />
            ) : (
                <ProductList products={products} />
            )}
        </>
    )
}

export default ProductPage

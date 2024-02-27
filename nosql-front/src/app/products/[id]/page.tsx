"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import { useTokenStore } from "../../../../TokenSlice/tokenSlice"
import { MongoType, Product } from "../types"
import { useParams } from "next/navigation"
import { Grid, Typography } from "@mui/material"

axios.defaults.baseURL = "http://127.0.0.1:3333"

export default function Test() {
    const token = useTokenStore((state) => state.token)
    const param = useParams()
    const [product, setProduct] = useState({} as Product)

    console.log(param)

    useEffect(() => {
        axios
            .get(`/product/${param["id"]}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                if (response.status !== 200) return

                const productResult = response.data.product[0] as Product

                console.log(productResult)

                setProduct(productResult)
            })
            .catch((err) => {
                console.log("test")
            })
    }, [])

    // Or a custom loading skeleton component
    return (
        <Grid container flexDirection="column">
            <Typography variant="h2" textAlign="center">
                Fiche produit
            </Typography>
            <Grid item>
                <Typography variant="h1">{product.name}</Typography>
                <Typography variant="h3">{product.price}</Typography>
                <Typography variant="h6">{product.description}</Typography>
            </Grid>
        </Grid>
    )
}

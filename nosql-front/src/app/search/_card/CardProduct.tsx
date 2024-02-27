"use client"
import * as React from "react"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { Product } from "@/app/products/types"
import { useRouter } from "next/navigation"

const bull = (
    <Box
        component="span"
        sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
        •
    </Box>
)

export default function CardProduct({ product }: { product: Product }) {
    const router = useRouter()

    return (
        <Card
            sx={{
                minWidth: 200,
                border: "1px solid black",
            }}
        >
            <CardContent>
                <Typography variant="h5" component="div">
                    {product.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {product.price}$
                </Typography>
                <Typography variant="body2">{product.description}</Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    onClick={() => {
                        router.push(`/products/${product.id}`)
                    }}
                >
                    Voir
                </Button>
            </CardActions>
        </Card>
    )
}

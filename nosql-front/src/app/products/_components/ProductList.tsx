"use client"
import React, { useMemo, useState } from "react"
import { Box, Button, Typography } from "@mui/material"
import { ProductListProps } from "../types"

type sort = "" | "-name" | "name"

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    const [sort, setSort] = useState<sort>("")

    console.log(sort)

    const sortList = useMemo(() => {
        switch (sort) {
            case "-name":
                return products.sort((a, b) => a.name.localeCompare(b.name))
            case "name":
                return products.sort((a, b) => b.name.localeCompare(a.name))
            default:
                return products
        }
    }, [products, sort])

    return (
        <Box p={2}>
            <Typography variant="h4" textAlign="center">
                Product List
            </Typography>
            <Button
                onClick={() => {
                    if (sort === "") setSort("-name")

                    if (sort === "-name") setSort("name")

                    if (sort === "name") setSort("")
                }}
            >
                <Typography variant="body1">Sort by name</Typography>
            </Button>
            {sortList.length ? (
                sortList.map((product, i) => (
                    <Box
                        key={product.id + i}
                        sx={{
                            marginBottom: "0.5rem",
                            padding: "1rem",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    >
                        <Typography variant="h6">{product.name}</Typography>
                        <Typography variant="body1">
                            Price: ${product.price}
                        </Typography>
                    </Box>
                ))
            ) : (
                <Typography variant="h6">No products</Typography>
            )}
        </Box>
    )
}

export default ProductList

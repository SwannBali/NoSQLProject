"use client"
import {
    Box,
    Button,
    CircularProgress,
    Grid,
    IconButton,
    InputBase,
    Paper,
    TextField,
    Typography,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import SearchIcon from "@mui/icons-material/Search"
import axios from "axios"
import { MongoType, Product } from "../products/types"
import { useDebounce } from "usehooks-ts"
import { useTokenStore } from "../../../TokenSlice/tokenSlice"
import CardProduct from "./_card/CardProduct"

axios.defaults.baseURL = "http://127.0.0.1:3333"

const SearchPage: React.FC = () => {
    const [searchText, setSearchText] = useState("")
    const [results, setResults] = useState([] as Product[])
    const debouncedValue = useDebounce<string>(searchText, 400)
    const token = useTokenStore((state) => state.token)
    const [fetching, setFetching] = useState(false)

    const handleSubmit = (searchText: string) => {
        setFetching(true)
        axios
            .post(
                `/product/search`,
                { searchTerm: searchText },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            )
            .then((response) => {
                const productsresult = response.data.map(
                    (product: MongoType) => {
                        return {
                            id: product._id,
                            name: product.name,
                            price: product.price,
                        }
                    },
                ) as Product[]

                setFetching(false)
                setResults(productsresult)
            })
            .catch((err) => {
                console.error("Error:", err)
            })
    }

    useEffect(() => {
        if (!debouncedValue) {
            setResults([])
            return
        }
        handleSubmit(debouncedValue)
    }, [debouncedValue])

    return (
        <Grid
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "80%",
            }}
            gap={2}
        >
            <Paper
                component="form"
                sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: 400,
                    border: "1px solid #ccc",
                }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Entrer le nom d'un produit"
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <IconButton
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="search"
                    onClick={() => {
                        handleSubmit(searchText)
                    }}
                >
                    <SearchIcon />
                </IconButton>
            </Paper>

            <Grid
                container
                sx={{
                    padding: 2,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 2,
                }}
                height={100}
            >
                {!fetching &&
                    results.map((product) => {
                        return <CardProduct product={product} />
                    })}

                {fetching && <CircularProgress />}
            </Grid>
        </Grid>
    )
}

export default SearchPage

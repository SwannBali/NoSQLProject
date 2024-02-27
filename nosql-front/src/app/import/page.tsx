"use client"
import { Button, Grid, InputBase, Snackbar, Typography } from "@mui/material"
import { File } from "buffer"
import { MuiFileInput } from "mui-file-input"
import { useCallback, useEffect, useMemo, useState } from "react"
import AttachFileIcon from "@mui/icons-material/AttachFile"
import { Clear } from "@mui/icons-material"
import { Product } from "../products/types"
import axios from "axios"
import { useTokenStore } from "../../../TokenSlice/tokenSlice"

axios.defaults.baseURL = "http://127.0.0.1:3333"

export default function Import() {
    const token = useTokenStore((state) => state.token)
    const [file, setFile] = useState()
    const [fileResult, setFileResult] = useState<Product[]>([])
    const [open, setOpen] = useState(false)
    const [openSuccess, setOpenSuccess] = useState(false)

    useEffect(() => {
        console.log(file)
    }, [file])

    const handleChange = (newFile: any) => {
        if (newFile.type !== "application/json") {
            setOpen(true)
            return
        }

        setFile(newFile)

        const reader = new FileReader()

        reader.readAsText(newFile)

        reader.onload = function () {
            console.log(reader.result)

            const result = JSON.parse(reader.result as string)

            setFileResult(result)
        }
    }

    const deleteProduct = (index: number) => {
        const newFileResult = fileResult.filter((_, i) => i !== index)

        setFileResult(newFileResult)

        if (newFileResult.length === 0) {
            setFileResult([])
            setFile(undefined)
        }
    }

    const createProduct = () => {
        let goodImport = true

        for (let i = 0; i < fileResult.length; i++) {
            axios
                .post(
                    "/product",
                    {
                        name: fileResult[i].name,
                        description: fileResult[i].description,
                        price: fileResult[i].price,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                )
                .then((response) => {
                    if (response.status !== 200) {
                        goodImport = false
                    }
                })
                .catch((err) => {})
        }

        if (goodImport) {
            setOpenSuccess(true)
            setFileResult([])
            setFile(undefined)
        }
    }

    return (
        <Grid
            container
            display="flex"
            flexDirection="column"
            alignItems="center"
            p={2}
        >
            <Grid item display="flex" flexDirection="row" alignItems="center">
                <Button
                    disabled={!file}
                    variant="contained"
                    color="success"
                    sx={{
                        maxHeight: "50px",
                    }}
                    onClick={() => {
                        createProduct()
                    }}
                >
                    Importer
                </Button>
                <MuiFileInput
                    disabled={file}
                    InputProps={{
                        inputProps: {
                            accept: "json/*",
                        },
                        startAdornment: <AttachFileIcon />,
                    }}
                    sx={{
                        padding: 2,
                    }}
                    clearIconButtonProps={<Clear />}
                    label="Cliquez pour importer un fichier"
                    value={file}
                    onChange={handleChange}
                />
                <Button
                    onClick={() => {
                        setFileResult([])
                        setFile(undefined)
                    }}
                >
                    Clear
                </Button>
            </Grid>
            <Grid>
                {fileResult && (
                    <table>
                        <thead>
                            <tr>
                                <th>Nom du produit</th>
                                <th>Prix</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fileResult.map((product: Product, i) => (
                                <tr key={product.name + i}>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.description}</td>
                                    <td>
                                        <Button
                                            onClick={() => {
                                                deleteProduct(i)
                                            }}
                                        >
                                            X
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </Grid>
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={() => {
                    setOpen(false)
                }}
                message="Le fichier importer n'est pas un json"
            />

            <Snackbar
                open={openSuccess}
                autoHideDuration={4000}
                onClose={() => {
                    setOpenSuccess(false)
                }}
                message="Importation réussi"
            />
        </Grid>
    )
}

"use client"
import {
    Button,
    Grid,
    InputAdornment,
    OutlinedInput,
    Snackbar,
    TextField,
    Typography,
} from "@mui/material"
import { Formik, FormikContext, FormikProvider, useFormik } from "formik"
import React, { useState } from "react"
import * as Yup from "yup"
import { useTokenStore } from "../../../TokenSlice/tokenSlice"
import { useRouter } from "next/navigation"
import axios from "axios"

axios.defaults.baseURL = "http://127.0.0.1:3333"

const Create = () => {
    const [open, setOpen] = useState(false)
    const token = useTokenStore((state) => state.token)

    const handleCreate = (
        name: string,
        description: string,
        price: string,
        resetForm: any,
    ) => {
        console.log(name, description, price)

        axios
            .post(
                "/product",
                {
                    name: name,
                    description: description,
                    price: price,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            )
            .then(({ data }) => {
                setOpen(true)
            })
            .catch((err) => {})

        resetForm()
    }

    return (
        <Formik
            initialValues={{ name: "", description: "", price: "" }}
            validationSchema={
                Yup.object({
                    name: Yup.string().required("Required"),
                    description: Yup.string().required("Required"),
                    price: Yup.string().required("Required"),
                }) as any
            }
            onSubmit={(values, { setSubmitting, resetForm }) => {
                handleCreate(
                    values.name,
                    values.description,
                    values.price,
                    resetForm,
                )
            }}
        >
            {({
                values,
                handleChange,
                handleSubmit,
                errors,
                touched,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Grid container flexDirection="column" alignItems="center">
                        <Grid item xs={12}>
                            <Typography
                                variant="h2"
                                width="100%"
                                align="center"
                            >
                                Création d'un produit
                            </Typography>
                        </Grid>

                        <Grid
                            item
                            display="flex"
                            flexDirection="column"
                            gap={2}
                            pt={3}
                            xs={12}
                            sm={6}
                            md={3}
                            lg={3}
                            xl={3}
                            height="100%"
                        >
                            <TextField
                                name="name"
                                label="Name"
                                variant="outlined"
                                error={(errors.name && touched.name) || false}
                                fullWidth
                                onChange={handleChange}
                                value={values.name}
                            />
                            <TextField
                                name="description"
                                label="Description"
                                error={
                                    (errors.description &&
                                        touched.description) ||
                                    false
                                }
                                variant="outlined"
                                fullWidth
                                onChange={handleChange}
                                value={values.description}
                            />
                            <TextField
                                name="price"
                                label="Prix"
                                variant="outlined"
                                type="number"
                                error={(errors.price && touched.price) || false}
                                InputProps={{ inputProps: { min: 0 } }}
                                placeholder="€"
                                fullWidth
                                onChange={handleChange}
                                value={values.price}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth
                            >
                                Ajouter le produit
                            </Button>
                        </Grid>
                        <Snackbar
                            open={open}
                            autoHideDuration={6000}
                            onClose={() => {
                                setOpen(false)
                            }}
                            message="Produit ajouté avec succès"
                        />
                    </Grid>
                </form>
            )}
        </Formik>
    )
}

export default Create

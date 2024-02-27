"use client"
import { Button, Grid, Snackbar, TextField, Typography } from "@mui/material"
import { Formik, FormikContext, FormikProvider, useFormik } from "formik"
import React, { useState } from "react"
import * as Yup from "yup"
import { useTokenStore } from "../../../TokenSlice/tokenSlice"
import { useRouter } from "next/navigation"
import axios from "axios"

axios.defaults.baseURL = "http://127.0.0.1:3333"

const Login = () => {
    const setToken = useTokenStore((state) => state.setToken)
    const router = useRouter()

    const [openError, setOpenError] = useState(false)
    const [error, setError] = useState("")

    const handleLogin = async (email: string, password: string) => {
        await axios
            .post("/login", { email: email, password: password })
            .then(({ data }) => {
                console.log("data", data)
                setToken(data.token)
                router.push("/products")
            })
            .catch((err) => {
                setOpenError(true)
                setError(err.response.data)
            })
    }

    return (
        <>
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={(values, { setSubmitting }) => {
                    handleLogin(values.email, values.password)
                }}
            >
                {({ values, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <Grid
                            container
                            flexDirection="column"
                            alignItems="center"
                            height="100vh"
                        >
                            <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                                <Typography variant="h2" align="center">
                                    {" "}
                                    Connexion{" "}
                                </Typography>
                            </Grid>

                            <Grid
                                item
                                display="flex"
                                flexDirection="column"
                                gap={2}
                                xs={12}
                                sm={6}
                                md={3}
                                lg={3}
                                xl={3}
                                height="100%"
                            >
                                <TextField
                                    name="email"
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    onChange={handleChange}
                                    value={values.email}
                                />

                                <TextField
                                    name="password"
                                    label="Password"
                                    variant="outlined"
                                    fullWidth
                                    type="password"
                                    onChange={handleChange}
                                    value={values.password}
                                />

                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    fullWidth
                                >
                                    Connexion
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
            <Snackbar
                open={openError}
                color="error"
                autoHideDuration={4000}
                onClose={() => {
                    setOpenError(false)
                    setError("")
                }}
                message={error}
            />
        </>
    )
}

export default Login

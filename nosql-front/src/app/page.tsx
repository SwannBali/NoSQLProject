"use client"
import { Image } from "@mui/icons-material"
import { Grid, Typography } from "@mui/material"

export default function Home() {
    return (
        <>
            <Typography variant="h3" textAlign="center">
                Bienvenue sur notre site de produits
            </Typography>

            <Grid container justifyContent="space-evenly">
                <img
                    src="https://www.vectorlogo.zone/logos/redis/redis-official.svg"
                    alt="redis"
                />
                <img
                    style={{
                        width: "300px",
                        height: "300px",
                        objectFit: "contain",
                    }}
                    src="https://www.vectorlogo.zone/logos/mongodb/mongodb-ar21.svg"
                    alt="mongo"
                />
            </Grid>
        </>
    )
}

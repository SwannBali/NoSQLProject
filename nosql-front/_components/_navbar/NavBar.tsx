"use client"
import React from "react"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { IconButton, Link } from "@mui/material"
import { Logout, SpaceBar } from "@mui/icons-material"
import { GridSeparatorIcon } from "@mui/x-data-grid"
import { usePathname, useRouter } from "next/navigation"
import { useTokenStore } from "../../TokenSlice/tokenSlice"

const routes = [
    {
        name: "Accueil",
        route: "/",
    },
    {
        name: "Liste des produits",
        route: "/products",
    },
    {
        name: "Recherch produits",
        route: "/search",
    },
    {
        name: "Créer un produit",
        route: "/create",
    },
    {
        name: "Importer en json",
        route: "/import",
    },
]

const NavBar: React.FC = () => {
    const pathName = usePathname()
    const router = useRouter()
    const setToken = useTokenStore((state) => state.setToken)

    return (
        <>
            {pathName !== "/login" && (
                <AppBar
                    position="static"
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <Toolbar>
                        {routes.map((route, i) => {
                            return (
                                <>
                                    <Link
                                        key={route.name + i}
                                        underline="none"
                                        color={"white"}
                                        onClick={() => {
                                            router.push(route.route)
                                        }}
                                        sx={{
                                            "&:hover": {
                                                cursor: "pointer",
                                            },
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                border:
                                                    pathName === route.route
                                                        ? "1px solid white"
                                                        : "",
                                                borderRadius: "5px",
                                            }}
                                            p="5px"
                                            fontWeight={"bold"}
                                        >
                                            {route.name}
                                        </Typography>
                                    </Link>

                                    {i !== routes.length - 1 && (
                                        <GridSeparatorIcon />
                                    )}
                                </>
                            )
                        })}
                    </Toolbar>

                    <IconButton
                        sx={{
                            color: "white",
                        }}
                        onClick={() => {
                            setToken("")
                            router.push("/login")
                        }}
                    >
                        <Logout />
                    </IconButton>
                </AppBar>
            )}
        </>
    )
}

export default NavBar

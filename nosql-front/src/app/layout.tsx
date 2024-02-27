"use client"
import NavBar from "../../_components/_navbar/NavBar"
import "./index.css"
import { useEffect } from "react"
import { useTokenStore } from "../../TokenSlice/tokenSlice"
import { useRouter } from "next/navigation"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const token = useTokenStore((state) => state.token)
    const router = useRouter()

    useEffect(() => {
        if (!token) router.push("/login")
    }, [token])

    return (
        <html lang="en">
            <body>
                <NavBar />
                {children}
            </body>
        </html>
    )
}

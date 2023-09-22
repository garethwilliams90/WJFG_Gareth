import Link from "next/link"
import { CartProvider } from "./CartContext"
import React from "react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Link href={"/storefront"}>
          <button className="p-4 bg-blue-700 text-white rounded-md m-4 ">
            View Products
          </button>
        </Link>
      </div>
    </main>
  )
}

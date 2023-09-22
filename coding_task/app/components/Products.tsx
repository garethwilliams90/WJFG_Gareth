"use client"

import { useEffect, useState } from "react"
import Loading from "./Loading"
import { useCart } from "./CartContext"

export default function Products() {
  const [error, setError] = useState(null)
  const { addToCart, cart, inventory } = useCart()

  const addToCartClicked = (product) => {
    // Add the selected product to the cart
    addToCart(product)
  }

  const prods = inventory.map((product) => (
    <div key={product.id} className="bg-slate-100 p-4 rounded-lg">
      <h2>{product.title}</h2>
      <h2>{product.inventory}</h2>
      <p>Price: ${product.price}</p>
      <button
        disabled={product.inventory <= 0}
        className="bg-blue-700 text-white p-2 rounded-md text-sm"
        onClick={() => {
          addToCartClicked(product)
        }}
      >
        Add to Cart
      </button>
    </div>
  ))

  return <div className="flex flex-col gap-4">{prods}</div>
}

"use client"

import { useCart } from "./CartContext"

export default function CartIncrement({ product }) {
  const { addToCart, removeFromCart } = useCart()
  return (
    <div className="flex flex-row-reverse gap-2 text-black ">
      <button
        onClick={() => addToCart(product)}
        className="w-10 aspect-square p-2 rounded-lg bg-green-300"
      >
        +
      </button>
      <button
        onClick={() => removeFromCart(product)}
        className="w-10  aspect-square p-2 rounded-lg bg-red-300"
      >
        -
      </button>
    </div>
  )
}

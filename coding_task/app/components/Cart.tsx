"use client"

import React, { useEffect, useState } from "react"
import { useCart } from "../CartContext" // Import the useCart hook from your CartContext
import CartIncrement from "./CartIncrement"

export default function Cart() {
  const cart = useCart() // Use the cart state from your context
  const [cartTotal, setCartTotal] = useState(null)

  useEffect(() => {
    const total = cart.cart.reduce((acc, item) => {
      return acc + item.price * item.quantity
    }, 0)

    setCartTotal(total)
  }, [cart])

  return (
    <div>
      <h1 className="text-lg mb-4">Cart</h1>
      {cart && (
        <div>
          {cart.cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col mb-4 bg-slate-900 text-white p-2 rounded-md"
            >
              <p>{item.title}</p>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <CartIncrement product={item} />
            </div>
          ))}
        </div>
      )}

      <h1 className="font-bold">
        Total: ${(Math.round(cartTotal * 100) / 100).toFixed(2)}
      </h1>
    </div>
  )
}

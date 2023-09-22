"use client"

import Cart from "../components/Cart"
import { CartProvider, useCart } from "../components/CartContext"
import Checkout from "../components/Checkout"
import Products from "../components/Products"

export default function storefront() {
  const cart = useCart()

  return (
    <div className="flex flex-col gap-6 text-lg w-1/2">
      <h1>Products</h1>
      <hr></hr>
      <Products />
      <hr></hr>
      <Cart />
      <hr></hr>
      <Checkout />
    </div>
  )
}

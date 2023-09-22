"use client"

import { useState } from "react"
import { useCart } from "../CartContext"

export default function Checkout() {
  const { clearCart, cartTotal } = useCart() // Use the cart state and total from your context
  const [showDiscount, setShowDiscount] = useState(false)
  const [discountCode, setDiscountCode] = useState("")
  const [discountApplied, setDiscountApplied] = useState(false)

  // Function to handle discount code submission
  const handleDiscountSubmit = (e) => {
    e.preventDefault()
    if (discountCode === "AUTUMN20") {
      // Apply a 20% discount
      const newTotal = cartTotal * 0.8 // 20% discount
      setDiscountApplied(true) // Set a flag to show that the discount was applied
      clearCart() // Clear the cart after applying the discount
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className="bg-green-400 text-center font-medium p-4 rounded-lg w-full cursor-pointer"
        onClick={() => {
          setShowDiscount(true)
          setDiscountApplied(false) // Reset the discount flag
        }}
      >
        Checkout
      </div>

      {showDiscount && (
        <div className="rounded-lg p-2 bg-slate-900 text-white w-2/3">
          <form
            className="flex justify-between gap-x-4"
            onSubmit={handleDiscountSubmit}
          >
            <label>
              Discount Code:
              <input
                className="bg-slate-700 p-2 rounded-lg ml-2"
                type="text"
                name="name"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
              />
            </label>
            <input
              className="bg-blue-700 p-2 rounded-xl"
              type="submit"
              value="Submit"
            />
          </form>
          {discountApplied && (
            <p className="text-green-400 mt-2">Discount applied: 20%</p>
          )}
        </div>
      )}
    </div>
  )
}

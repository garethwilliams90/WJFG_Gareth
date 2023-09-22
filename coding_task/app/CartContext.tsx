"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import ProductType from "./types/ProductType"

// Define your CartContext
const CartContext = createContext<
  | {
      cart: ProductType[]
      addToCart: (product: ProductType) => void
      removeFromCart: (productToRemove: ProductType) => void
      clearCart: () => void
    }
  | undefined
>(undefined) // Provide an initial value of undefined

// Export a custom hook to access the CartContext
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

// Define your CartProvider component
export const CartProvider: React.FC = ({ children }) => {
  const [cart, setCart] = useState<ProductType[]>([])
  const [inventory, setInventory] = useState<ProductType[]>([])

  useEffect(() => {
    const getInventory = async () => {
      const res = await fetch(
        "https://0cf937f5-a71f-4b17-9a50-5895d739c295.mock.pstmn.io/products"
      )
      const products = await res.json()
      setInventory(products)
    }

    getInventory()
  }, [])

  const addToCart = (productToAdd: ProductType) => {
    const productIndex = inventory.findIndex(
      (item) => item.id === productToAdd.id
    )
    if (productIndex !== -1) {
      // If the product with the same ID exists in the inventory
      const updatedInventory = [...inventory]
      updatedInventory[productIndex].inventory -= 1 // Decrement the inventory

      // If inventory becomes 0, remove the product from the inventory
      if (updatedInventory[productIndex].inventory === 0) {
        updatedInventory.splice(productIndex, 1)
      }

      setInventory(updatedInventory)

      // If the product with the same ID exists in the cart
      const cartProductIndex = cart.findIndex(
        (item) => item.id === productToAdd.id
      )
      if (cartProductIndex !== -1) {
        const updatedCart = [...cart]
        updatedCart[cartProductIndex].quantity += 1 // Increment the quantity
        setCart(updatedCart)
      } else {
        // If the product with the same ID does not exist in the cart
        setCart([...cart, { ...productToAdd, quantity: 1 }])
      }
    }
  }

  const removeFromCart = (productToRemove: ProductType) => {
    const cartProductIndex = cart.findIndex(
      (item) => item.id === productToRemove.id
    )
    if (cartProductIndex !== -1) {
      // If the product with the same ID exists in the cart
      const updatedCart = [...cart]
      updatedCart[cartProductIndex].quantity -= 1 // Decrement the quantity

      // If quantity becomes 0, remove the product from the cart
      if (updatedCart[cartProductIndex].quantity === 0) {
        updatedCart.splice(cartProductIndex, 1)
      }

      setCart(updatedCart)

      // Add the selected product back to the inventory
      const productIndex = inventory.findIndex(
        (item) => item.id === productToRemove.id
      )
      if (productIndex !== -1) {
        const updatedInventory = [...inventory]
        updatedInventory[productIndex].inventory += 1 // Increment the inventory
        setInventory(updatedInventory)
      } else {
        // If the product with the same ID does not exist in the inventory
        setInventory([...inventory, { ...productToRemove, inventory: 1 }])
      }
    }
  }

  const clearCart = () => {
    // Add all products from the cart back to the inventory
    cart.forEach((cartItem) => {
      const productIndex = inventory.findIndex(
        (item) => item.id === cartItem.id
      )
      if (productIndex !== -1) {
        const updatedInventory = [...inventory]
        updatedInventory[productIndex].inventory += cartItem.quantity
        setInventory(updatedInventory)
      } else {
        setInventory([
          ...inventory,
          { ...cartItem, inventory: cartItem.quantity },
        ])
      }
    })

    setCart([])
  }

  // Provide the cart state and functions through CartContext.Provider
  return (
    <CartContext.Provider
      value={{
        cart,
        inventory,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

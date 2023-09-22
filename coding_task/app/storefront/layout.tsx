import Link from "next/link"
import { CartProvider } from "../components/CartContext"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <Link href={"/"}>
        <button className="p-4 bg-blue-700 text-white rounded-md m-4 fixed right-0">
          Back To Home
        </button>
      </Link>

      <div className=" w-auto p-4 text-lg lg:text-2xl font-bold text-primary rounded-xl">
        Gareth's Store
      </div>
      <CartProvider>{children}</CartProvider>
    </div>
  )
}

/* eslint-disable import/no-unresolved */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";

import Container from "@/components/ui/container";
import Button from "@/components/ui/button";
import useCart from "@/hooks/use-cart";

import Summary from "./components/summary";
import CartItem from "./components/cart-item";

export const revalidate = 0;

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {cart.items.length === 0 && (
                <>
                  <p className="text-neutral-500">No items added to cart!</p>
                  {/* {TODO: Add a link to the products page} */}
                  <Button
                    onClick={() => router.push("/")}
                    className="flex items-center rounded-full bg-black px-4 py-2 my-5"
                  >
                    <span className="mr-2 text-sm font-medium text-white">
                      Browse Products
                    </span>
                    <ShoppingBag size={20} color="white" />
                  </Button>
                </>
              )}
              <ul>
                {cart.items.map((item) => (
                  <CartItem key={item.id} data={item} />
                ))}
              </ul>
            </div>
            <Summary />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;

/* eslint-disable import/no-unresolved */
"use client";

import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

import { Product } from "@/types";
import useCart from "@/hooks/use-cart";

import Currency from "@/components/ui/currency";
import Button from "@/components/ui/button";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();
  const router = useRouter();
  // Check if the item is in the cart
  const isItemInCart = cart.items.some((item) => item.id === data.id);

  const onAddToCart = () => {
    if (isItemInCart) router.push("/cart");
    // Only navigate to cart if the item was not already in the cart
    cart.addItem(data);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Currency value={data?.price} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Size:</h3>
          <div>{data?.size?.value}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Color:</h3>
          <div
            className="h-6 w-6 rounded-full border border-gray-600"
            style={{ backgroundColor: data?.color?.value }}
          />
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button onClick={onAddToCart} className="flex items-center gap-x-2">
          {isItemInCart ? "Go to cart" : "Add to cart"}
          <ShoppingCart size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Info;

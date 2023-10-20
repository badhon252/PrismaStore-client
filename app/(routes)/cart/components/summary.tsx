"use client";
/* eslint-disable import/no-unresolved */
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";
import axios from "axios";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const toastShownRef = useRef(false);

  useEffect(() => {
    const successParam = searchParams.get("success");
    const canceledParam = searchParams.get("canceled");

    if (successParam && !toastShownRef.current) {
      toast.success("Payment completed.");
      removeAll();
      toastShownRef.current = true;
    }

    if (canceledParam && !toastShownRef.current) {
      toast.error("Something went wrong!");
      toastShownRef.current = true;
    }
  }, [searchParams, removeAll]);

  //? Calculate total quantity and total price and update the remaining quantities
  const { totalQuantity, totalPrice } = items.reduce(
    (acc, item) => {
      acc.totalQuantity += item.quantity;
      acc.totalPrice += Number(item.price) * Number(item.quantity);
      return acc;
    },
    { totalQuantity: 0, totalPrice: 0 },
  );

  const onCheckout = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        productIds: items.map((item) => item.id),
        quantities: items.map((item) => item.quantity), // Send quantities to the server
      },
    );

    window.location = response.data.url;
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={totalPrice} />
          <div className="">
            <span className="text-sm font-medium text-gray-500">
              {totalQuantity} items
            </span>
          </div>
        </div>
      </div>
      <Button
        onClick={onCheckout}
        disabled={items.length === 0}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </div>
  );
};

export default Summary;

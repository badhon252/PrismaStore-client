"use client";
import { useState, useCallback } from "react";
import { motion, Variants } from "framer-motion";
import { MinusIcon, PlusIcon } from "lucide-react";

interface QuantityControlProps {
  initialQuantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

const QuantityControl: React.FC<QuantityControlProps> = ({
  initialQuantity,
  onQuantityChange,
}) => {
  const [quantity, setQuantity] = useState<number>(initialQuantity);

  const debouncedQuantityChange = useCallback(
    debounce((newQuantity: number) => {
      onQuantityChange(newQuantity);
    }, 500),
    [onQuantityChange],
  );

  const increaseQuantity = useCallback(() => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    debouncedQuantityChange(newQuantity);
  }, [quantity, debouncedQuantityChange]);

  const decreaseQuantity = useCallback(() => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      debouncedQuantityChange(newQuantity);
    }
  }, [quantity, debouncedQuantityChange]);

  const buttonVariants: Variants = {
    initial: { scale: 1 },
    hover: { scale: 1.1 },
  };

  return (
    <div className="flex justify-center items-center mt-5">
      <p className="text-lg font-semibold text-stone-500 mx-3">Qty:</p>
      <div className="flex items-center">
        <motion.button
          onClick={decreaseQuantity}
          className="focus:outline-none"
          variants={buttonVariants}
          whileHover="hover"
        >
          <MinusIcon size={15} />
        </motion.button>
        <p className="text-lg font-semibold text-black mx-3">
          {initialQuantity}
        </p>
        <motion.button
          onClick={increaseQuantity}
          className="focus:outline-none"
          variants={buttonVariants}
          whileHover="hover"
        >
          <PlusIcon size={15} />
        </motion.button>
      </div>
    </div>
  );
};

export default QuantityControl;

function debounce<T extends (...args: any[]) => void>(
  func: T,
  timeout: number,
): T {
  let timer: NodeJS.Timeout;

  return ((...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  }) as T;
}

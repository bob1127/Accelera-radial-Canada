"use client";

import Image from "next/image";
import Link from "next/link";
import { startTransition } from "react";
import { useCart } from "../../components/cart/cart-context";
import { DeleteItemButton } from "../../components/cart/delete-item-button";
import { EditItemQuantityButton } from "../../components/cart/edit-item-quantity-button";

export default function CartPage() {
  const { cart, updateCartItem } = useCart();

  const optimisticUpdate = (id: string, type: "plus" | "minus" | "delete") => {
    startTransition(() => {
      updateCartItem(id, type);
    });
  };

  if (!cart || cart.totalQuantity === 0) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold mb-4">購物車是空的</h1>
        <Link href="/" className="text-blue-600 underline">
          返回首頁購物
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">購物車</h1>
      <div className="space-y-6">
        {cart.lines.map((item) => (
          <div
            key={item.merchandise.id}
            className="flex items-center gap-4 border-b pb-4"
          >
            {item.merchandise.product.featuredImage?.url && (
              <Image
                src={item.merchandise.product.featuredImage.url}
                alt={item.merchandise.product.title}
                width={80}
                height={80}
                className="object-cover rounded"
              />
            )}
            <div className="flex-1">
              <p className="font-semibold">{item.merchandise.product.title}</p>
              <p className="text-sm text-gray-500">{item.merchandise.title}</p>
              <div className="flex items-center mt-2 gap-2">
                <EditItemQuantityButton
                  item={item}
                  type="minus"
                  optimisticUpdate={optimisticUpdate}
                />
                <span>{item.quantity}</span>
                <EditItemQuantityButton
                  item={item}
                  type="plus"
                  optimisticUpdate={optimisticUpdate}
                />
                <DeleteItemButton
                  item={item}
                  optimisticUpdate={optimisticUpdate}
                />
              </div>
            </div>
            <div className="text-right">
              NT${Number(item.cost.totalAmount.amount).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-right">
        <p className="text-lg font-bold mb-2">
          總金額：NT${Number(cart.cost.totalAmount.amount).toLocaleString()}
        </p>
        <a
          href={cart.checkoutUrl}
          className="inline-block bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
        >
          前往結帳
        </a>
      </div>
    </div>
  );
}


import React from "react";
import type { FetchedOrderType } from "../../types/type";
import logoImg from '../assets/logo.png'

interface ReceiptProps {
  order: FetchedOrderType
}

export const HistoryReceipt = React.forwardRef<HTMLDivElement, ReceiptProps>(({ order }, ref) => {
  return (  
    <div className="w-full justify-center flex items-center">
        <div ref={ref} className="w-[300px] text-xs bg-white flex relative justify-center items-center  text-secondary-100 font-mono">
            <img src={logoImg} alt="" className="absolute opacity-10" />
            <div className="p-5 w-full relative flex justify-center items-center gap-4 flex-col">
                
                <div className="border-secondary-200 text-gray-500 flex flex-col w-full">
                    <p className="text-center text-md uppercase">Order {order._id}</p>  
                </div>

                <div className="py-2 border-dashed border-y-2 border-secondary-200 text-gray-500 flex flex-col gap-2 w-full">
                    <p><span className="font-bold text-secondary-100">Name:</span> {order.name}</p>
                    <p><span className="font-bold text-secondary-100">Date:</span> {new Date(order.placedAt).toLocaleString()}</p>
                    <p>
                        <span className={`font-bold text-secondary-100}`}>Status:</span> 
                        <span className={`${order.status=="completed"?"text-green-400":"text-red-500"}`}> {order.status}</span>
                    </p>
                </div>

                <div className="flex h-48 overflow-x-hidden overflow-y-auto flex-col w-full gap-2">
                    {order.items.map((item,index) => (
                        <div key={index} className="flex justify-between py-0.5 border-b border-gray-100 w-full">
                            <div className="flex gap-2">
                                <p>
                                    {item.foodId.name}
                                </p>
                                <p>
                                    x{item.quantity}
                                </p>
                            </div>
                            <span>₦{item.priceAtPurchase}</span>
                        </div>
                    ))}
                    <div className="flex justify-between py-0.5 border-b border-gray-100 w-full">
                        <div className="flex gap-2">
                            <p>
                                Delivery fee
                            </p>
                        </div>
                        <span>₦0</span>
                    </div>
                </div>
                <div className="flex justify-end w-full gap-1 font-bold">
                    <span>Total:</span>
                    <span>₦{order.total}</span>
                </div>
            </div>
        </div>
    </div>
  )
})

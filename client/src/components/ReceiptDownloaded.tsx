
import React from "react";
import type { FetchedOrderType } from "../../types/type";
import logoImg from '../assets/logo.png'

interface ReceiptProps {
  order: FetchedOrderType
}

export const ReceiptDownloaded = React.forwardRef<HTMLDivElement, ReceiptProps>(({ order }, ref) => {
  return (
    <div ref={ref} className="w-screen h-screen bg-white flex relative justify-center items-center  text-secondary-100 font-mono">
        <img src={logoImg} alt="" className="absolute opacity-10" />
        <div className="w-[400px] text-sm p-8 z-10 relative flex justify-center items-center gap-4 flex-col">
            
            <div className="border-secondary-200 text-gray-500 flex flex-col w-full">
                <h2 className="text-2xl font-bold text-center text-primary">Mori Cafe</h2>
                <p className="text-center text-md">Order Receipt</p>  
            </div>

            <div className="py-4 border-dashed border-y-4 border-secondary-200 text-gray-500 flex flex-col gap-2 w-full">
                <p><span className="font-bold text-secondary-100">Name:</span> {order.name}</p>
                <p><span className="font-bold text-secondary-100">Address:</span> {order.address}</p>
                <p><span className="font-bold text-secondary-100">Date:</span> {new Date(order.placedAt).toLocaleString()}</p>
                <p> <span className="font-bold text-secondary-100">ETA:</span>{" "} {new Date(new Date(order.placedAt).getTime() + 30 * 60000).toLocaleTimeString([], {hour: "numeric",minute: "2-digit"})}
                </p>
                <p>
                    <span className={`font-bold text-secondary-100}`}>Status:</span> 
                    <span className={`${order.status=="completed"?"text-green-400":"text-red-500"}`}>{order.status}</span>
                </p>
            </div>

            <div className="flex flex-col w-full gap-2">
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

            <p className="text-center">
                Your package will be delivered by  {new Date(new Date(order.placedAt).getTime() + 30 * 60000).toLocaleTimeString([], {hour: "numeric",minute: "2-digit"})}
            </p>

            <p className="text-xs text-gray-500 text-center mt-4">
                Thank you for dining with us
            </p>
        </div>
    </div>
  )
})

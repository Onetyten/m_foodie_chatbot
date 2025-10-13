import type { cartListType } from '../../types/type'
import { FaMinus,FaPlus } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setDeleteCartItem } from '../../store/cartDeleteSlice';


interface propType{
    food:cartListType,
}

export default function CheckoutItem(props:propType) {
    const {food} = props
    const [quantity,setQuantity] = useState(food.quantity)
    const dispatch = useDispatch()

    useEffect(()=>{
        if (quantity>10) return setQuantity(10)
        if (quantity<1){
            setQuantity(1)
            dispatch(setDeleteCartItem(food))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[quantity])

    function handleChange(delta:number){
        setQuantity(quantity+delta)
    }

  return (
    <div className="rounded-sm w-sm text-sm flex justify-between p-2 items-center gap-6 border border-secondary-100">
        <div className='flex items-center gap-2'>
            <img src={food.foodId.imageUrl} className="rounded-full size-10" alt={food.foodId.name} />
            <div className='flex flex-col gap-2'>
                <p>{food.foodId.name.slice(0,20)}{food.foodId.name.length>20?"...":""}</p>
                <div className='flex gap-2'>
                    <p>&#8358; {food.totalPrice}</p>
                    <p> x {food.quantity}</p>
                </div>
            </div>
        </div>
        <div className='flex select-none items-center gap-2'>
                <FaPlus onClick={()=>{handleChange(1)}} className='cursor-pointer' />
                    <p className='text-sm'>{quantity} </p>
                <FaMinus onClick={()=>{handleChange(-1)}} className='cursor-pointer' />
        </div>

    </div>
  )
}

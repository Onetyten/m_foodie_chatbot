/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { Digital } from "react-activity"
import logoImg from '../assets/logo.gif'
import {motion} from 'framer-motion'
import api from "../../utils/api"
import axios from "axios"
import CheckoutItem from "./CheckoutItem"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../utils/store"
import { setOrderList } from "../../store/OrderCartList"



interface propType{
    message:{
        type:string,
        sender:string,
        next:()=>void, 
        content:string[]
    },
    setOptions: React.Dispatch<React.SetStateAction<{
        name: string;
        onClick: () => void;
    }[]>>,
    getSomethingElseMessage: (message: string) => void,
    setShowOptions: React.Dispatch<React.SetStateAction<boolean>>,
    checkOutListSuccess: ()=> void
    checkOutListCleared: ()=> void
}

export default function CheckoutList(props:propType) {
    const {message,setShowOptions,checkOutListSuccess,checkOutListCleared} = props
    const [added,setAdded] = useState(false)
    const [checkedOut,setCheckedOut] = useState(false)
    const [feedBack,setFeedack] = useState(`Select item to order`)
    const cartList = useSelector((state:RootState)=>state.orderList.orderList)
    const newOrder = useSelector((state:RootState)=>state.newOrder.newOrder)
    const dispatch = useDispatch()
    useEffect(()=>{
        async function fetchCart() {
            try {
                setShowOptions(false)
                if (!message.next) return
                const response = await api.get('/order/cart/fetch')
                if (response.data.success === false){
                     return setFeedack(response.data.message)
                }
                const items = response.data.data
                dispatch(setOrderList(items))
                checkOutListSuccess()
            }
            catch (error) {
                console.error(error)
                if (axios.isAxiosError(error)){
                    return setFeedack(error.response?.data.message)
                }
                setFeedack(`Error getting your tab, please try again`)
            }
            finally{
                message.next()
                setAdded(true)
                setShowOptions(true)
            }
        }
        fetchCart()
    },[])

    useEffect(() => {
        if (added && cartList.length === 0 && !checkedOut) {
            setCheckedOut(true)
            setFeedack("Your tab is clear.")
            checkOutListCleared()
        }
        }, [cartList, checkedOut, added])

    useEffect(() => {
        if (added && !checkedOut && newOrder !== null) {
            setCheckedOut(true)
            setFeedack(`Ordering ${newOrder.items.map(item=>`${item.quantity} ${item.foodId.name}`).join(', ')}.`)
            checkOutListCleared()
        }
        }, [newOrder])


    if (checkedOut && newOrder === null){
        return null
    }


  return (
    <div className="w-full">
        {!checkedOut?(
                <div className="w-full">
                    {added?(
                    <div className="flex w-full ">
                        {cartList.length>0?(
                            <div className="w-full flex flex-col gap-6">
                                <div className="w-full max-w-8/12 flex gap-2 items-start justify-start">
                                    <div className='bg-primary min-w-10 size-10 rounded-full flex justify-center items-center'>
                                        <img src={logoImg} className="size-8" alt="" />
                                    </div>
                                    <div className=" flex justify-start items-center text-primary ">
                                        <div className='bg-primary p-2.5 px-6 text-background rounded-2xl rounded-tl-none text-sm' >
                                            {feedBack}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex gap-2 items-start justify-end">     
                                    <motion.div className="flex max-w-8/12 justify-end text-sm text-secondary-100 flex-col gap-2 ">
                                        {cartList.map((item,index)=>{
                                            return(
                                                <CheckoutItem food={item} key={index}/>
                                            )
                                        })}
                                    </motion.div>
                                </div>
                            </div>
                        ):(
                            <div className="w-full max-w-8/12 flex gap-2 items-start justify-start">
                                <div className='bg-primary min-w-10 size-10 rounded-full flex justify-center items-center'>
                                    <img src={logoImg} className="size-8" alt="" />
                                </div>
                                <div className=" flex justify-start items-center text-primary ">
                                    <div className='bg-primary p-2.5 px-6 rounded-2xl rounded-tl-none text-sm' >
                                        {feedBack}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ):
                (
                    <div className="w-full max-w-8/12 flex gap-2 items-start">
                        <div className='bg-primary min-w-10 size-10 rounded-full flex justify-center items-center'>
                            <img src={logoImg} className="size-8" alt="" />
                        </div>
                        <div className=" flex justify-start items-center text-primary ">
                            <div className='bg-primary p-2.5 px-6 rounded-2xl rounded-tl-none text-sm' >
                            <Digital/>  
                            </div>
                        </div>
                    </div>)}
            </div>
        ):(
        <div className="w-full flex gap-2 justify-end">
            <div className='flex max-w-8/12 flex-col gap-0.5 justify-end w-full '>
                <div className=" flex justify-end items-center text-primary ">
                    <p className='bg-secondary-200 text-white p-2.5 px-6 rounded-2xl rounded-tr-none text-sm' >
                        {feedBack}
                    </p>
                </div>
            </div>
        </div>
        )}
    </div>
  )
}

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
import useGetElse from "../../hooks/useGetElse"
import useCalculatePrice from "../../hooks/useCalculatePrice"
import type { messageListType } from "../../types/type"
import useSubcategory from "../../hooks/useSubcategory"



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
    setMessageList: React.Dispatch<React.SetStateAction<messageListType[]>>
}

export default function CheckoutList(props:propType) {
    const {message,setShowOptions,setOptions,setMessageList} = props
    const {getCategory} = useSubcategory(setOptions,setMessageList,setShowOptions)
    const getSomethingElseMessage = useGetElse(setShowOptions,setMessageList,setOptions,getCategory)
    const calculateSelectedPrice = useCalculatePrice(getSomethingElseMessage,setShowOptions,setOptions,setMessageList)
    const [added,setAdded] = useState(false)
    const [checkedOut,setCheckedOut] = useState(false)
    const [feedBack,setFeedback] = useState(`Select item to order`)
    const cartList = useSelector((state:RootState)=>state.orderList.orderList)
    const newOrder = useSelector((state:RootState)=>state.newOrder.newOrder)
    const dispatch = useDispatch()

    
    const checkOutListSuccess=() => {
        setTimeout(() => {
            setOptions([...[
            { name: 'Checkout', onClick: ()=>calculateSelectedPrice() },
            { name: 'Continue shopping', onClick: () => getSomethingElseMessage("Let's continue") }
            ]]);
            setShowOptions(true);
        }, 100);
    }
    
    function checkOutListCleared(){
        setOptions([{name:'Continue shopping', onClick:()=>getSomethingElseMessage("Let's continue")}])
    }



    useEffect(()=>{
        async function fetchCart() {
            try {
                setShowOptions(false)
                if (!message.next) return
                const response = await api.get('/order/cart/fetch')
                if (response.data.success === false){
                     return setFeedback(response.data.message)
                }
                const items = response.data.data
                dispatch(setOrderList(items))
                checkOutListSuccess()
            }
            catch (error) {
                console.error(error)
                if (axios.isAxiosError(error)){
                    return setFeedback(error.response?.data.message)
                }
                setFeedback(`Error getting your tab, please try again`)
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
            const newMessage = {type:"message",next:()=>{}, sender:"bot",content:["Your tab is empty."]}
            setMessageList((prev)=>[...prev, newMessage ])
            setFeedback("Your tab is empty.")
            checkOutListCleared()
        }
        }, [cartList, checkedOut, added])

    useEffect(() => {
        if (added && !checkedOut && newOrder !== null) {
            setCheckedOut(true)
            setFeedback(`Ordering ${newOrder.items.map(item=>`${item.quantity} ${item.foodId.name}`).join(', ')}.`)
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
                                        <div className='bg-primary p-2.5 px-6 text-background rounded-2xl rounded-tl-none text-xs sm:text-sm' >
                                            {feedBack}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex gap-2 items-start justify-end">     
                                    <motion.div className="flex max-w-full justify-end text-sm text-secondary-100 flex-col gap-2 ">
                                        {cartList
                                        .filter((item) => item && item.foodId)
                                        .map((item, index) => (
                                            <CheckoutItem food={item} key={index} />
                                        ))}
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
                            <div className='bg-primary text-background p-2.5 px-6 rounded-2xl rounded-tl-none text-sm' >
                            <Digital/>  
                            </div>
                        </div>
                    </div>)}
            </div>
        ):(
        <div className="w-full text-xs sm:text-sm  flex gap-2 justify-end">
            <div className='flex max-w-8/12 flex-col gap-0.5 justify-end w-full '>
                <div className=" flex justify-end items-center text-primary ">
                    <p className='bg-secondary-200 text-white p-2.5 px-6 rounded-2xl rounded-tr-none text-xs sm:text-sm' >
                        {feedBack}
                    </p>
                </div>
            </div>
        </div>
        )}
    </div>
  )
}

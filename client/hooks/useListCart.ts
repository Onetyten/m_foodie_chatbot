import React from "react"
import type {messageListType} from '../types/type'

export default function useListCart(setMessageList:React.Dispatch<React.SetStateAction<messageListType[]>>,addToCartCleanup:()=>void,setShowOptions:React.Dispatch<React.SetStateAction<boolean>>) {
    function CartList(){
        const newMessage = {type:"message",next:()=>{}, sender:"user",content:[`Let's Checkout`]}
        setMessageList((prev)=>[...prev, newMessage ])
        setShowOptions(false)
        const newFeedBack = {type:"cart-list-feedback",next:addToCartCleanup, sender:"bot",content:['']}
        setMessageList((prev)=>[...prev, newFeedBack ])
    }
    return CartList
}

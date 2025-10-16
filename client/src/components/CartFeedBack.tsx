import { useEffect, useState } from "react"
import { Digital } from "react-activity"
import logoImg from '../assets/logo.gif'
import {motion} from 'framer-motion'
import api from "../../config/api"
import { useSelector } from "react-redux"
import type { RootState } from "../../config/store"

interface propType{
    message:{
        type:string,
        sender:string,
        next:()=>void, 
        content:string[]
    },
    isAdding: React.RefObject<boolean>
}

export default function CartFeedBack(props:propType) {
    const {message,isAdding} = props
    const [added,setAdded] = useState(false)
    const food = useSelector((state:RootState)=>state.cart.cart)
    const [feedBack,setFeedack] = useState(`Added ${message.content[0]} to tab, would you like anything else`)

    useEffect(()=>{
        if (!food) return
        
        async function addToCart() {
            try {
                if (!message.next) return
                const response = await api.post('/order/cart/add',food)
                if (response.data.success === false){
                     setFeedack(`Couldn't add ${message.content[0]} to cart, please try again`)
                }
                // const item = response.data.data
            }
            catch (error) {
                console.error(error)
                setFeedack(`Couldn't add ${message.content[0]} to cart, please try again`)
            }
            finally{
                isAdding.current = false
                message.next()
                setAdded(true)
            }
        }
        addToCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  return (
    <div className="max-w-8/12 flex gap-2 items-start">
        <div className='bg-secondary-100 min-w-10 size-10 rounded-full flex justify-center items-center'>
            <img src={logoImg} className="size-8" alt="" />
        </div>
        {added?(
            <div className=" flex justify-start items-center text-primary ">
                <motion.p initial={{x:15, y:50, opacity:0}}  animate={{x:0,y:0,opacity:100}} transition={{duration:0.2}}  className='bg-secondary-100 p-2.5 px-6 rounded-2xl text-sm' >
                    {feedBack}
                </motion.p>
            </div>
        ):
        (
            <div className=" flex justify-start items-center text-primary ">
                <div className='bg-secondary-100 p-2.5 px-6 rounded-2xl text-sm' >
                <Digital/>  
                </div>
            </div>
        )}

    </div>
  )
}

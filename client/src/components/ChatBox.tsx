import React, { useState } from "react"
import BotMessage from "./BotMessage"
import ChatMessage from "./ChatMessage"
import OptionsInput from "./OptionsInput"
import SubCarousel from "./SubCarousel"
import type { cartType, FoodType, messageListType, subCategoryType } from "../../types/type"
import FoodCarousel from "./FoodCarousel"
import NumberInput from "./NumberInput"
import { useDispatch, useSelector } from "react-redux"
import { setFood } from "../../store/currentFoodSlice"
import type { RootState } from "../../config/store"
import CustomisationList from "./customisationList"
import CartFeedBack from "./CartFeedBack"
import { setCurrentCart } from "../../store/currentCartItem"
import CheckoutList from "./CheckoutList"


interface propType{
    setShowModal:React.Dispatch<React.SetStateAction<boolean>>
}

export default function ChatBox(props:propType) {
    const {setShowModal} = props
    const dispatch = useDispatch()
    const currentFood = useSelector((state:RootState)=>state.food.food)
    // const currentCartItem = useSelector((state:RootState)=>state.cart.cart)
    const [messagelist,setMessageList] = useState<messageListType[]>([
        {type:"message", sender:"bot", next:()=>showAnsweroptions(), content:['Hey there! I’m Mori','your digital barista','What are you craving today?']},
    ])
    const [showoptions,setShowOptions] = useState(false)
    function showAnsweroptions(){
        setShowOptions(true)
    }
    const [options,setOptions] = useState([{name:'Coffee', onClick:()=>getCategory('coffee')},{name:'Drink',onClick:()=>getCategory('drink')},{name:'Snacks',onClick:()=>getCategory('snack')}])

    const [loading,setLoading] = useState(false)
    const getCategory= (food:string)=>{
        setShowOptions(false)
        const  newMessage = {type:"message",next:()=>getSubcategoryMessage(food), sender:"user",content:[` ${food==='snack'?"Some":"A"} ${food}${food==='snack'?"s":""}`]}
        setMessageList((prev)=>[...prev, newMessage ])
    }
    
    const getSubcategoryMessage = (category:string)=>{
        setShowOptions(false)
        const newMessage = {type:"message",next:()=>showSubcategoryCarousel(category), sender:"bot",content:[`What kind of ${category} would you like`]}
        setMessageList((prev)=>[...prev, newMessage ])
    }

    const showSubcategoryCarousel=(category:string)=>{
        setShowOptions(false)
        const newCarousel = {type:"subcarousel",next:()=>subCategoryCleanup(), sender:"bot",content:[category]}
        setMessageList((prev)=>[...prev, newCarousel ])
    }

    function subCategoryCleanup(){
        setOptions([{name:'Get something else', onClick:()=>getSomethingElseMessage("Let’s try something different.")}])
        setShowOptions(true)
    }

    const getSomethingElseMessage = (message:string)=>{
        setShowOptions(false)
        const  newMessage = {type:"message",next:()=>{}, sender:"user",content:[message]}
        setMessageList((prev)=>[...prev, newMessage])
        const newQuestion = {type:"message",next:()=>{}, sender:"bot",content:[`What would you like`]}
        setTimeout(()=>{
            setMessageList((prev)=>[...prev, newQuestion])
        },500)
        setOptions([{name:'Coffee', onClick:()=>getCategory('coffee')},{name:'Drink',onClick:()=>getCategory('drink')},{name:'Snacks',onClick:()=>getCategory('snack')}])
        setTimeout(()=>{
            setShowOptions(true)
        },1000)
    }

    function fetchFoodList(category:subCategoryType){
        if (loading) return
        setLoading(true)
        try
        {
            const newMessage = {type:"message",next:()=>{}, sender:"bot",content:[`Which one`]}
            setMessageList((prev)=>[...prev, newMessage ])
            setShowOptions(false)
            const newList:messageListType = {type:"food-list",next:()=>{}, sender:"bot",content:[category._id]}
            setMessageList((prev)=>[...prev, newList])
            setOptions([{name:'View all', onClick:()=>{setShowModal(true)}},{name:'Get something else', onClick:()=>getSomethingElseMessage("Let’s try something different.")}])
            setShowOptions(false)
        }
        catch (error) {
            console.error(error)
        }
    }

    function optionCount(food:FoodType){
        if (loading) return console.log("something is loading")
        setLoading(true)
        setShowOptions(false)
        const newPick = {type:"message",next:()=>{}, sender:"user",content:[`I’ll have the ${food.name}`]}
        dispatch(setFood(food))
        setMessageList((prev)=>[...prev, newPick ])
        setTimeout(()=>{
            const newMessage = {type:"message",next:()=>{}, sender:"bot",content:[`Great choice! How many ${food.name} orders should I add?`]}
            setMessageList((prev)=>[...prev, newMessage ])
        },1000)
        setTimeout(()=>{
            const newInput = {type:"number-input",next:()=>{}, sender:"user",content:[food]}
            setMessageList((prev)=>[...prev, newInput ])
        },1000)
    }

    

    function comfirmToCart (value:number){
        if (!currentFood){
            setShowOptions(true)
            return setLoading(false)
        }
        
        setLoading(true)
        console.log(value,currentFood.name)
        const cartPayload:cartType = {foodId:currentFood._id,quantity:value,customisation:[],totalPrice:currentFood.price}
        dispatch(setCurrentCart(cartPayload))
        if (currentFood.customisationId.length>0){
            setTimeout(()=>{
                const newMessage = {type:"message",next:()=>{}, sender:"bot",content:[`Should I add any custom options to your order${value>1?"s":""}`]}
                setMessageList((prev)=>[...prev, newMessage ])
            },1000)
            setTimeout(()=>{
                setOptions([{name:'Yes',onClick:()=>customiseOrder(currentFood)},{name:'No', onClick:()=>{
                            const newAnswer = {type:"message",next:()=>{}, sender:"user",content:[`No`]}
        setMessageList((prev)=>[...prev, newAnswer ])
                    addToCart(cartPayload,currentFood.name)}}])
                setShowOptions(true)
            },2000)
        }
        else{
            addToCart(cartPayload,currentFood.name)
        }
    }
    
    async function customiseOrder(food:FoodType){
        setShowOptions(false)
        const newMessage = {type:"message",next:()=>{}, sender:"user",content:[`Yes`]}
        setMessageList((prev)=>[...prev, newMessage ])
        setTimeout(()=>{
            const newConfirm = {type:"message",next:()=>{}, sender:"bot",content:[`Please select your options`]}
            setMessageList((prev)=>[...prev, newConfirm ])
        },1000)
        setTimeout(()=>{
            const editDisplay = {type:"edit-list",next:()=>{}, sender:"user",content:[food.customisationId,food._id]}
            setMessageList((prev)=>[...prev, editDisplay ])   
        },2500)
    }

    function addToCart(payload:cartType,foodName:string){
        console.log("Added to cart")
        setShowOptions(false)
        setTimeout(()=>{
            const CartfeedBack = {type:"cart-feedback",next:addToCartCleanup, sender:"bot",content:[foodName]}
            setMessageList((prev)=>[...prev, CartfeedBack ])
        },500)
        console.log(payload)
    }

    function addToCartCleanup(){
        setLoading(false)
        setOptions([{name:'Checkout tab', onClick:CartList},{name:'Continue shopping', onClick:()=>getSomethingElseMessage("Let's continue")}])
        setTimeout(()=>{
            setShowOptions(true)
        },1000)
    }

    function CartList(){
        const newMessage = {type:"message",next:()=>{}, sender:"user",content:[`Let's Checkout`]}
        setMessageList((prev)=>[...prev, newMessage ])
        setShowOptions(false)
        const newFeedBack = {type:"cart-list-feedback",next:addToCartCleanup, sender:"bot",content:['']}
        setMessageList((prev)=>[...prev, newFeedBack ])
    }

  return (
    <div className="flex w-full text-sm pb-12 overflow-scroll bg-primary text-secondary-100 flex-1 flex-col justify-start mt-12 items-center gap-3 h-full">
        <div className="w-full flex flex-col gap-6 justify-start">
            {messagelist.map((item,index:number)=>{
                return(
                    <div className="w-full" key={index}>
                        { 
                        item.type === "message"?item.sender==="bot"?<BotMessage message={item}/>:<ChatMessage message={item}/>
                        :item.type === "subcarousel"?<SubCarousel message={item} fetchFoodList={fetchFoodList}  />
                        :item.type === "number-input"?<NumberInput message={item} confirm={comfirmToCart} />
                        :item.type === "cart-feedback"?<CartFeedBack message={item}/>
                        :item.type === "cart-list-feedback"?<CheckoutList message={item} />
                        :item.type === "edit-list"?<CustomisationList message={item} addToCart = {addToCart} />
                        :item.type === "food-list"?<FoodCarousel setShowOptions={setShowOptions} setLoading={setLoading} message={item} onClick={optionCount}/>:''
                        }
                    </div>
                )
            })}
        </div>
        {showoptions&& <OptionsInput options = {options}/>}
    </div>
  )
}

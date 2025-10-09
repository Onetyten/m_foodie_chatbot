import React, { useState } from "react"
import BotMessage from "./BotMessage"
import ChatMessage from "./ChatMessage"
import OptionsInput from "./OptionsInput"
import SubCarousel from "./SubCarousel"
import type { FoodType, messageListType, subCategoryType } from "../../types/type"
import FoodCarousel from "./FoodCarousel"

interface propType{
    setShowModal:React.Dispatch<React.SetStateAction<boolean>>
}

export default function ChatBox(props:propType) {
    const {setShowModal} = props
    const [messagelist,setMessageList] = useState([
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
        setOptions([{name:'Get something else', onClick:()=>getSomethingElseMessage()}])
        setShowOptions(true)
    }
    const getSomethingElseMessage = ()=>{
        setShowOptions(false)
        const  newMessage = {type:"message",next:()=>{}, sender:"user",content:[`Let’s try something different.`]}
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
            const newList:messageListType = {type:"foodList",next:()=>{}, sender:"bot",content:[category._id]}
            setMessageList((prev)=>[...prev, newList])
            setOptions([{name:'View all', onClick:()=>{setShowModal(true)}},{name:'Get something else', onClick:()=>getSomethingElseMessage()}])
            setTimeout(()=>{
                setShowOptions(true)
            },1000)
        }
        catch (error) {
            console.error(error)
        }
    }

    function addToCart(food:FoodType){
        if (loading) return
        setLoading(true)
        setShowOptions(false)
        console.log(food.name)
        const newPick = {type:"message",next:()=>{}, sender:"user",content:[`I'd like a ${food.name}`]}
        setMessageList((prev)=>[...prev, newPick ])
        setTimeout(()=>{
            const newMessage = {type:"message",next:()=>{}, sender:"bot",content:[`Adding ${food.name} to basket`]}
            setMessageList((prev)=>[...prev, newMessage ])
        },1000)


        setOptions([{name:'Checkout', onClick:()=>{}},{name:'Continue shopping', onClick:()=>getSomethingElseMessage()}])
        setTimeout(()=>{
            setShowOptions(true)
        },2000)

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
                        :item.type === "foodList"?<FoodCarousel setLoading={setLoading} message={item} onClick={addToCart}/>:''
                        }
                    </div>
                )
            })}
        </div>
        {showoptions&& <OptionsInput options = {options}/>}
    </div>
  )
}
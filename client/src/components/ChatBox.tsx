import { useState } from "react"
import BotMessage from "./BotMessage"
import ChatMessage from "./ChatMessage"
import OptionsInput from "./OptionsInput"
import SubCarousel from "./SubCarousel"





export default function ChatBox() {
    const [messagelist,setMessageList] = useState([
        {type:"message", sender:"bot", next:()=>showAnsweroptions(), content:['Hey there! I’m Mori','your digital barista','What are you craving today?']},
    ])
    const [options] = useState([{name:'Coffee', onClick:()=>getCategory('coffee')},{name:'Tea',onClick:()=>getCategory('tea')},{name:'Snacks',onClick:()=>getCategory('snack')}])
    const [showoptions,setShowOptions] = useState(false)

    function showAnsweroptions(){
        setShowOptions(true)
    }
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
        const newCarousel = {type:"subcarousel",next:()=>{}, sender:"bot",content:[category]}
        setMessageList((prev)=>[...prev, newCarousel ])
    }
    // const fetchSubcategoryCarousel=(category:string)=>{
    //     setShowOptions(false)
    //     console.log('fetching...')
    // }
    

  return (
    <div className="flex w-full text-sm overflow-scroll bg-primary text-secondary-100 flex-1 flex-col justify-start mt-12 items-center gap-2 h-full">
        <div className="w-full flex flex-col gap-2 justify-start">
            {messagelist.map((item,index)=>{
                return(
                    <div className="w-full" key={index}>
                        { 
                        item.type === "message"?item.sender==="bot"?<BotMessage message={item}/>:<ChatMessage message={item}/>
                        :item.type === "subcarousel"?<SubCarousel message={item}/>:''
                        }
                    </div>
                )
            })}
        </div>
        {showoptions&& <OptionsInput options = {options}/>}
    </div>
  )
}
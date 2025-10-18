/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react"
import BotMessage from "./BotMessage"
import ChatMessage from "./ChatMessage"
import OptionsInput from "./OptionsInput"
import SubCarousel from "./SubCarousel"
import type {cartType, FoodType, messageListType, subCategoryType } from "../../types/type"
import FoodCarousel from "./FoodCarousel"
import NumberInput from "./NumberInput"
import { useDispatch, useSelector, useStore } from "react-redux"
import { setFood } from "../../store/currentFoodSlice"
import type { RootState } from "../../utils/store"
import CustomisationList from "./customisationList"
import CartFeedBack from "./CartFeedBack"
import { setCurrentCart } from "../../store/currentCartItem"
import CheckoutList from "./CheckoutList"
import UserInfoInput from "./UserInfoInput"
import BotErrorMessage from "./BotErrorMessage"
import {setOrder} from '../../store/newOrderSlice'
import OrderFeedback from "./OrderFeedback"
import OrderReceipt from "./OrderReceipt"




export default function ChatBox() {
    const scrollRef = useRef<HTMLDivElement|null>(null)
    const dispatch = useDispatch()
    const store = useStore<RootState>()
    const currentFood = useSelector((state:RootState)=>state.food.food)
    const user = useSelector((state:RootState)=>state.user.user)
    const pendingOrders = useSelector((state:RootState)=>state.pendingOrders.pendingOrders)
    const [messagelist,setMessageList] = useState<messageListType[]>([])
    const initiatedRef = useRef<boolean>(false)


    useEffect(()=>{
        if (!initiatedRef.current==false)return
        initiatedRef.current = true
        if (pendingOrders.length>0 && user ){
            const newMessage = {type:"message", sender:"bot", next:()=>{}, content:['Please wait while I confirm your payment…']}
            setMessageList((prev)=>[...prev,newMessage])

            setTimeout(()=>{
               const newMessage = {type:"order-receipt", sender:"bot", next:()=>introMessage(), content:[]}
                setMessageList((prev)=>[...prev,newMessage]) 
            },1500)
        }
        else{
            introMessage()
        }
        return ()=>{
            initiatedRef.current = true
        }
    },[])

    function introMessage(){
        const newMessage = {type:"message", sender:"bot", next:()=>showAnsweroptions(), content:['Hey there! I’m Mori','your digital barista','What are you craving today?']}
        setMessageList((prev)=>[...prev,newMessage])
    }

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
    useEffect(()=>{
        const timer = setTimeout(()=>{
            scrollRef.current?.scrollIntoView({behavior:"smooth"})
        },500)
        return ()=>clearTimeout(timer)
    },[messagelist])

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
            setOptions([{name:'Get something else', onClick:()=>getSomethingElseMessage("Let’s try something different.")}])
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
            setShowOptions(false)
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
        const cartPayload:cartType = {foodId:currentFood._id,quantity:value,customisation:[],totalPrice:currentFood.price}
        dispatch(setCurrentCart(cartPayload))
        if (currentFood.customisationId.length>0){
            setTimeout(()=>{
                const newMessage = {type:"message",next:()=>{}, sender:"bot",content:[`Should I add any custom options to your order${value>1?"s":""}`]}
                setMessageList((prev)=>[...prev, newMessage ])
            },1000)
            setTimeout(()=>{
                setOptions([{name:'Yes',onClick:()=>customiseOrder(currentFood)},{name:'No', onClick:()=>{
                            const newAnswer = {
                            type:"message",next:()=>{}, sender:"user",content:[`No`]}
                            setMessageList((prev)=>[...prev, newAnswer ])
                            addToCart(currentFood.name)}}])

                setShowOptions(true)
            },2000)
        }
        else{
            addToCart(currentFood.name)
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
            setShowOptions(false)
            const editDisplay = {type:"edit-list",next:()=>{}, sender:"user",content:[food.customisationId,food._id]}
            setMessageList((prev)=>[...prev, editDisplay ])   
        },2500)
    }

    const isAdding = useRef(false)
    function addToCart(foodName:string){
        if (isAdding.current) return
        isAdding.current = true
        setShowOptions(false)
        setTimeout(()=>{
            setShowOptions(false)
            const CartfeedBack = {type:"cart-feedback",next:addToCartCleanup, sender:"bot",content:[foodName]}
            setMessageList((prev)=>[...prev, CartfeedBack ])
        },500)
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

    function calculateSelectedPrice(){
        const cart = store.getState().orderList.orderList
        const OrderPayload = {
            name:"",
            address:"",
            email:"",
            phone_number:"",
            items:cart
        }
        dispatch(setOrder(OrderPayload))
        setShowOptions(false)
        const orderPrice = cart.reduce((sum,delta)=>sum+(delta.totalPrice*delta.quantity),0)
        const newMessage = {type:"message",next:()=>{}, sender:"bot",content:[`Your total is ${orderPrice}`]}
        setMessageList((prev)=>[...prev, newMessage ])
        setTimeout(()=>{
            setOptions([{name:'Select address', onClick:selectInfo},{name:'Continue shopping', onClick:()=>getSomethingElseMessage("Let's continue")}])
            setShowOptions(true)
        },1500)
    }

    
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

    function selectInfo(){
        const newMessage = {type:"message",next:()=>{}, sender:"bot",content:[`Enter your delivery information`]}
        setMessageList((prev)=>[...prev, newMessage ])
        
        setTimeout(()=>{
            setOptions([{name:'Continue shopping', onClick:()=>getSomethingElseMessage("Let's continue")}])
            const newInput = {type:"enter-info",next:()=>{}, sender:"bot",content:[]}
            setMessageList((prev)=>[...prev, newInput ])
        },1000)
    }
    
    function ProceedToPayment(){
        // const newOrder = store.getState().newOrder.newOrder
        setShowOptions(false)
        const newMessage = {type:"message",next:()=>{}, sender:"user",content:[`Proceed to payment`]}
        setMessageList((prev)=>[...prev, newMessage ])
        setTimeout(()=>{
            const newResponse = {type:"message",next:()=>{}, sender:"bot",content:[`Creating your order`]}
            setMessageList((prev)=>[...prev, newResponse ])
            const orderMessage = {type:"order-feedback",next:()=>{}, sender:"bot",content:[]}
            setMessageList((prev)=>[...prev, orderMessage ])
        },1000)
    }


  return (
    <div className="flex w-full chat-box font-outfit text-sm pb-12 overflow-y-scroll overflow-x-hidden  scroll-hide text-secondary-100 flex-1 flex-col justify-start mt-12 items-center gap-3 h-full">
        <div className="w-full flex flex-col gap-6 justify-start">
            {messagelist.map((item,index:number)=>{
                return(
                        item.type === "message"?item.sender==="bot"?<BotMessage key={index} message={item}/>:item.sender === "bot-error"?<BotErrorMessage key={index} message={item}/>:<ChatMessage message={item} key={index}/>
                        :item.type === "subcarousel"?<SubCarousel message={item} key={index} fetchFoodList={fetchFoodList}  />
                        :item.type === "number-input"?<NumberInput message={item} key={index} confirm={comfirmToCart} />
                        :item.type === "cart-feedback"?<CartFeedBack message={item} key={index} isAdding={isAdding}/>
                        :item.type === "order-feedback"?<OrderFeedback key={index}/>
                        :item.type === "order-receipt"?<OrderReceipt key={index} setMessageList={setMessageList} message={item}/>
                        :item.type === "cart-list-feedback"?<CheckoutList key={index} message={item} setShowOptions={setShowOptions} setOptions={setOptions} getSomethingElseMessage = {getSomethingElseMessage} checkOutListSuccess={checkOutListSuccess} checkOutListCleared={checkOutListCleared}/>
                        :item.type === "edit-list"?<CustomisationList key={index} message={item} addToCart = {addToCart} />
                        :item.type === "enter-info"?<UserInfoInput key={index} setMessageList={setMessageList} setOptions={setOptions} setShowOptions={setShowOptions} getSomethingElseMessage={getSomethingElseMessage} ProceedToPayment={ProceedToPayment} />
                        :item.type === "food-list"?<FoodCarousel key={index} setShowOptions={setShowOptions} setLoading={setLoading} message={item} onClick={optionCount}/>:''
                )
            })}
        </div>
        {showoptions&& <OptionsInput options = {options}/>}
        <div ref={scrollRef} className="w-2 h-2">

        </div>
    </div>
  )
}
import { useRef, useState } from "react"
import BotMessage from "./BotMessage"
import ChatMessage from "./ChatMessage"
import OptionsInput from "./OptionsInput"
import SubCarousel from "./SubCarousel"
import type { messageListType, } from "../../types/type"
import FoodCarousel from "./FoodCarousel"
import NumberInput from "./NumberInput"
import CustomisationList from "./customisationList"
import CartFeedBack from "./CartFeedBack"
import CheckoutList from "./CheckoutList"
import UserInfoInput from "./UserInfoInput"
import BotErrorMessage from "./BotErrorMessage"
import OrderFeedback from "./OrderFeedback"
import OrderReceipt from "./OrderReceipt"
import OrderHandler from "./OrderHandler"
import useListCart from "../../hooks/useListCart"
import useFetchFoodList from "../../hooks/useFetchFoodList.ts"
import useConfirmToCart from "../../hooks/useConfirmToCart.ts"
import useSubcategory from "../../hooks/useSubcategory.tsx"
import useGetElse from "../../hooks/useGetElse.ts"
import useProceedPayment from "../../hooks/useProceedPayment.ts"
import useOptionCount from "../../hooks/useOptionCount.ts"
import useAddToCart from "../../hooks/useAddToCart.ts"
import {useChatInit} from "../../hooks/useChatInit.ts"
import SearchBar from "./SearchBar"
import ReceiptCarousel from "./ReceiptCarousel.tsx"




export default function ChatBox() {
    const scrollRef = useRef<HTMLDivElement|null>(null)
    const [messagelist,setMessageList] = useState<messageListType[]>([])
    const [showoptions,setShowOptions] = useState(false)
    const [loading,setLoading] = useState(false)
    const initiatedRef = useRef<boolean>(false)
    const [options,setOptions] = useState([{name:'Coffee', onClick:()=>getCategory('coffee')},{name:'Drink',onClick:()=>getCategory('drink')},{name:'Snacks',onClick:()=>getCategory('snack')}])
    const [showButtons,setShowButtons] = useState(false)
    const isAdding = useRef(false)

    // hooks
    useChatInit({scrollRef,messagelist,initiatedRef,setMessageList,setShowOptions,setShowButtons})
    const {getCategory} = useSubcategory(setOptions,setMessageList,setShowOptions)
    const getSomethingElseMessage = useGetElse(setShowOptions,setMessageList,setOptions,getCategory)
    const fetchFoodList = useFetchFoodList(loading,setLoading,setMessageList,setShowOptions,setOptions,getSomethingElseMessage)
    const CartList = useListCart(setMessageList,setShowOptions,setLoading,setOptions,getSomethingElseMessage)
    const {addToCart} = useAddToCart(setShowOptions,setMessageList,CartList,getSomethingElseMessage,setLoading,setOptions,isAdding)
    const comfirmToCart = useConfirmToCart(setLoading,setMessageList,setShowOptions,addToCart,setOptions)
    const optionCount = useOptionCount(setShowOptions,setLoading,loading,setMessageList)
    const ProceedToPayment = useProceedPayment(setShowOptions,setMessageList)
    
  return (
    <div className="xs:w-md sm:w-lg md:w-xl w-full max-w-full h-full px-2 flex flex-col gap-4">
        <div className="flex w-full chat-box font-outfit text-sm pb-12 overflow-y-scroll overflow-x-hidden  scroll-hide text-secondary-100 flex-1 flex-col justify-start mt-12 items-center gap-3 h-full">
            <div className="w-full flex flex-col gap-6 justify-start">
                {messagelist.map((item,index:number)=>{
                    return(
                            item.type === "message"?item.sender==="bot"?<BotMessage key={index} message={item}/>:item.sender === "bot-error"?<BotErrorMessage key={index} message={item}/>:<ChatMessage message={item} key={index}/>
                            :item.type === "subcarousel"?<SubCarousel message={item} key={index} fetchFoodList={fetchFoodList}  />
                            :item.type === "number-input"?<NumberInput message={item} key={index} confirm={comfirmToCart} />
                            :item.type === "cart-feedback"?<CartFeedBack message={item} key={index} isAdding={isAdding}/>
                            :item.type === "order-handle"?<OrderHandler message={item} key={index}/>
                            :item.type === "order-feedback"?<OrderFeedback key={index}/>
                            :item.type === "order-receipt"?<OrderReceipt key={index} setMessageList={setMessageList} message={item}/>
                            :item.type === "cart-list-feedback"?<CheckoutList key={index} message={item} setShowOptions={setShowOptions} setOptions={setOptions} getSomethingElseMessage = {getSomethingElseMessage} setMessageList={setMessageList}/>
                            :item.type === "edit-list"?<CustomisationList key={index} message={item} addToCart = {addToCart} />
                            :item.type === "enter-info"?<UserInfoInput key={index} setMessageList={setMessageList} setOptions={setOptions} setShowOptions={setShowOptions} getSomethingElseMessage={getSomethingElseMessage} ProceedToPayment={ProceedToPayment} />
                            :item.type === "food-list"?<FoodCarousel key={index} setShowOptions={setShowOptions} setMessageList={setMessageList} setLoading={setLoading} message={item} onClick={optionCount}/>
                            :item.type === "receipt-list"?<ReceiptCarousel key={index} setShowOptions={setShowOptions} setMessageList={setMessageList} setLoading={setLoading} message={item}/>:''
                    )
                })}
            </div>
              <div ref={scrollRef} className="w-2 h-2">

            </div>
            {showoptions&& <OptionsInput options = {options}/>}
          
        </div>
        <SearchBar messagelist={messagelist} setMessageList={setMessageList} setOptions={setOptions} setShowOptions={setShowOptions} setLoading={setLoading} loading = {loading} showButtons={showButtons} setShowButtons={setShowButtons}/>
    </div>
    
  )
}
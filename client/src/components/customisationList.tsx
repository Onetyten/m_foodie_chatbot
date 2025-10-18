import { useEffect, useRef, useState } from "react"
import { Spinner } from "react-activity"
import api from "../../utils/api"
import type { customisationType, messageListType, tweakType } from "../../types/type"
import {motion} from 'framer-motion'
import OptionSelect from "./OptionSelect"
import OptionCheckbox from "./OptionCheckbox"
import OptionQuantity from "./OptionQuantity"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../utils/store"
import { toWords } from "number-to-words"
import { setCurrentCart } from "../../store/currentCartItem"



interface propType{
    message:messageListType,
    addToCart:(foodName:string)=>void
}

export default function CustomisationList(props:propType) {
    const {message,addToCart} = props
    const dispatch = useDispatch()
    const currentCartFood = useSelector((state:RootState)=>state.cart.cart)
    const foodRedux = useSelector((state:RootState)=>state.food.food)
    const [options,setOptions] = useState<customisationType[]>([]) 
    const selectOptions = options.filter((option)=>option.type == "option")
    const checkOptions = options.filter((option)=>option.type == "check")
    const sizeOptions = options.filter((option)=>option.type == "quantity")
    const customIds = message.content[0]
    const foodId = message.content[1]
    const [tweakList,setTweakList] = useState<tweakType[]>(currentCartFood?.customisation??[])
    const [addedToCart,setAddedToCart] = useState(false)
    const gettingOptions = useRef(false)

    useEffect(()=>{
        if (gettingOptions.current == true) return
        gettingOptions.current = true
        if (foodId !== foodRedux?._id){
            return message.next()
        }
        async function getOptions(){
            try {
                const response = await api.post('/food/custom/fetch',{customisationId:customIds})
                if (!response.data.success) return
                const customisations = response.data.data
                setOptions(customisations)
            } 
            catch (error) {
                console.error(error)
                message.next()
            }
            finally{
                gettingOptions.current = false
            }
        }
        getOptions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[message, message.content])

    function handleAddCustomOptions() {
        if (!foodRedux || !currentCartFood) return
        const updatedCart = { ...currentCartFood, customisation: tweakList }
        dispatch(setCurrentCart(updatedCart))
        addToCart(foodRedux.name)
        setAddedToCart(true)
    }

    if (options.length==0){
        return(
            <div className="w-full flex justify-end items-end  flex-col gap-2">
                {message.content.map((index)=>{
                    return(
                        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1, ease:['easeOut']}} key={index} className="w-72 rounded-sm bg-muted/40 hover:bg-muted/50 h-10 text-sm flex justify-center items-center">
                            <Spinner/>
                        </motion.div>
                    )
                })}
            </div>
        )
    }

  return (
    <div className="w-full flex justify-end items-end  flex-col gap-2">
        {!addedToCart?(
            <div className="flex gap-2 justify-start flex-col items-end">
                {selectOptions.map((item,index)=>{
                    return(
                        <OptionSelect tweakList={tweakList} setTweakList={setTweakList} edit={item} key={index}/>
                    )
                })}
                {sizeOptions.map((item,index)=>{
                    return(
                        <OptionQuantity tweakList={tweakList} setTweakList={setTweakList} edit={item} key={index}/>
                    )
                })}
                {checkOptions.map((item,index)=>{
                    return(
                        <OptionCheckbox tweakList={tweakList} setTweakList={setTweakList} edit={item} key={index}/>
                    )   
                })}
                <motion.div onClick={handleAddCustomOptions}
                initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1,delay:1.5,ease:['easeOut']}} className="rounded-sm h-10 text-sm flex justify-center px-4 items-center gap-1 select-none border border-secondary-100 hover:bg-secondary-300/10 cursor-pointer">
                    Confirm
                </motion.div>
            </div>
        ):(
            <div>
                <div className='bg-secondary-200 flex gap-2 flex-col items-start text-white p-2.5 px-6 rounded-2xl rounded-tr-none text-sm' >
                    <p>
                        I want my <span>{foodRedux?.name || "food"}</span> to be made with:
                    </p>
                    {tweakList.map((item,index)=>{
                        return(
                            <div key={index} className="capitalize">
                                {item.type=="option"? `${item.name} : ${item.value} `
                                :
                                item.type === "quantity" ? `${toWords(parseInt(item.value))} ${ parseInt(item.value) === 1 && item.name.endsWith("s") ? item.name.slice(0, -1) : item.name}`
                                :
                                `${item.name}`}
                            </div>
                        )
                    })}
                </div>
            </div>
        )}
    </div>
  )
}

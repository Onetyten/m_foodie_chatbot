import { useEffect } from "react";
import type { messageListType } from "../types/type";
import { useSelector } from "react-redux";
import type { RootState } from "../utils/store";
import { useSearchParams } from "react-router";
import useSubcategory from "./useSubcategory";
import useGetElse from "./useGetElse";
import useFetchFoodList from "./useFetchFoodList";

interface UseChatInitProps {
    loading:boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setOptions: React.Dispatch<React.SetStateAction<{ name: string;onClick: () => void }[]>>;
    scrollRef: React.RefObject<HTMLDivElement | null>;
    messagelist: messageListType[];
    initiatedRef: React.RefObject<boolean>;
    setMessageList: React.Dispatch<React.SetStateAction<messageListType[]>>;
    setShowOptions:React.Dispatch<React.SetStateAction<boolean>>;
    setShowButtons: React.Dispatch<React.SetStateAction<boolean>>
}

export function useChatInit({loading,setLoading,setOptions,scrollRef,messagelist,initiatedRef,setMessageList,setShowOptions,setShowButtons}: UseChatInitProps) {
    const pendingOrders = useSelector((state:RootState)=>state.pendingOrders.pendingOrders);
    const {getCategory} = useSubcategory(setOptions,setMessageList,setShowOptions)
    const getSomethingElseMessage = useGetElse(setShowOptions,setMessageList,setOptions,getCategory)
    const fetchFoodList = useFetchFoodList(loading,setLoading,setMessageList,setShowOptions,setOptions,getSomethingElseMessage)
    const user = useSelector((state:RootState)=>state.user.user);
    const [searchParams]= useSearchParams();
    const allowedCategories = ['coffee','drink','snack']

    function introMessage(){
        const newMessage = {type:"message", sender:"bot", next:()=>{setShowOptions(true)}, content:['Hey there! I’m Mori','your digital barista','What are you craving today?']}
        setMessageList((prev)=>[...prev,newMessage])
    }

    useEffect(() => {
        const timer = setTimeout(() => {
        setShowButtons(false)
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 500);
        return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messagelist, scrollRef]);


    useEffect(()=>{
        if (!initiatedRef.current==false)return
        initiatedRef.current = true

        const category = searchParams.get("category")
        const searchQuery = searchParams.get("query")

        if (pendingOrders.length>0 && user ){
            const newMessage = {type:"message", sender:"bot", next:()=>{}, content:['Please wait while I confirm your payment…']}
            setMessageList((prev)=>[...prev,newMessage])

            setTimeout(()=>{const newMessage = {type:"order-receipt", sender:"bot", next:()=>introMessage(), content:[]}
                setMessageList((prev)=>[...prev,newMessage]) 
            },1500)

            if (category && allowedCategories.includes(category)){
                getCategory(category)
                return
            }
            if (searchQuery?.trim()){
                fetchFoodList(`/food/list?q=${searchQuery}`,"Searching...")
                return 
            }
        }
        else{
            if (category && allowedCategories.includes(category)){
                getCategory(category)
                return
            }
            if (searchQuery?.trim()){
                fetchFoodList(`/food/list?q=${searchQuery}`,"Searching...")
                return 
            }
            introMessage()
        }

        return ()=>{
            initiatedRef.current = true
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

}


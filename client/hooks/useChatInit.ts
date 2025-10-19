import { useEffect } from "react";
import type { messageListType } from "../types/type";
import { useSelector } from "react-redux";
import type { RootState } from "../utils/store";

interface UseChatInitProps {
    scrollRef: React.RefObject<HTMLDivElement | null>;
    messagelist: messageListType[];
    initiatedRef: React.RefObject<boolean>;
    setMessageList: React.Dispatch<React.SetStateAction<messageListType[]>>;
    setShowOptions:React.Dispatch<React.SetStateAction<boolean>>
}

export function useChatInit({scrollRef,messagelist,initiatedRef,setMessageList,setShowOptions}: UseChatInitProps) {
    const pendingOrders = useSelector((state:RootState)=>state.pendingOrders.pendingOrders)
    const user = useSelector((state:RootState)=>state.user.user)

    function introMessage(){
        const newMessage = {type:"message", sender:"bot", next:()=>{setShowOptions(true)}, content:['Hey there! I’m Mori','your digital barista','What are you craving today?']}
        setMessageList((prev)=>[...prev,newMessage])
    }

    useEffect(() => {
        const timer = setTimeout(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 500);

        return () => clearTimeout(timer);
    }, [messagelist, scrollRef]);


    useEffect(()=>{
        if (!initiatedRef.current==false)return
        initiatedRef.current = true
        if (pendingOrders.length>0 && user ){
            const newMessage = {type:"message", sender:"bot", next:()=>{}, content:['Please wait while I confirm your payment…']}
            setMessageList((prev)=>[...prev,newMessage])

            setTimeout(()=>{const newMessage = {type:"order-receipt", sender:"bot", next:()=>introMessage(), content:[]}
                setMessageList((prev)=>[...prev,newMessage]) 
            },1500)
        }
        else{
            introMessage()
        }

        return ()=>{
            initiatedRef.current = true
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

}


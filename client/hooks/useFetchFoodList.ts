import React from 'react'
import type {subCategoryType,messageListType} from "../types/type"

export default function useFetchFoodList(loading:boolean,setLoading:React.Dispatch<React.SetStateAction<boolean>>,setMessageList:React.Dispatch<React.SetStateAction<messageListType[]>>,setShowOptions:React.Dispatch<React.SetStateAction<boolean>>,setOptions: React.Dispatch<React.SetStateAction<{name: string; onClick: () => void}[]>>,getSomethingElseMessage:(message: string) => void)
{
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

    return fetchFoodList
}

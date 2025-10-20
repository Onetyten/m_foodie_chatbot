import React, { useState } from "react";
import { BiSolidCoffeeBean } from "react-icons/bi";
import { IoSend } from "react-icons/io5";
import OutsideClickHandler from 'react-outside-click-handler';
import QuickActions from "./searchbar/QuickActions";
import type { messageListType } from "../../types/type";
import useFetchFoodList from "../../hooks/useFetchFoodList";
import useGetElse from "../../hooks/useGetElse";
import useSubcategory from "../../hooks/useSubcategory";

interface propType{
    messagelist:messageListType[];
    setMessageList:React.Dispatch<React.SetStateAction<messageListType[]>>;
    setShowOptions: React.Dispatch<React.SetStateAction<boolean>>;
    setOptions: React.Dispatch<React.SetStateAction<{name: string; onClick: () => void;}[]>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    loading: boolean;
    showButtons: boolean;
    setShowButtons: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchBar(props:propType) {
  const {messagelist,setMessageList,setLoading,setOptions,setShowOptions,loading,showButtons,setShowButtons} = props
  const [query,setQuery] = useState("")
  const {getCategory} = useSubcategory(setOptions,setMessageList,setShowOptions)
  const getSomethingElseMessage = useGetElse(setShowOptions,setMessageList,setOptions,getCategory)
  const fetchFoodList = useFetchFoodList(loading,setLoading,setMessageList,setShowOptions,setOptions,getSomethingElseMessage)
  

  function HandleSubmit(e:React.FormEvent){
    e.preventDefault()
    if (query.length==0) return
    fetchFoodList(`/food/list?q=${query}`,"Searching...")
    setQuery("")
  }
  

  return (
    <div className="w-full flex justify-center items-center h-11 mb-2 xl:mb-6">
      <div className="mx-6 h-full flex gap-2 justify-between px-1 items-center w-full rounded-full bg-secondary-300/15">
        <div className="relative">


            <OutsideClickHandler onOutsideClick={() => setShowButtons(false)}>
              <div className="bg-primary hover:text-white p-2 rounded-full z-20 text-background relative">
                <BiSolidCoffeeBean onClick={()=>setShowButtons(!showButtons)} className="text-xl" />
              </div>
              <QuickActions showButtons={showButtons} messagelist={messagelist} setMessageList={setMessageList} setShowOptions={setShowOptions} setLoading={setLoading} setOptions={setOptions} loading={loading} />
            </OutsideClickHandler>
        </div>

        <form onSubmit={HandleSubmit} className="flex justify-between items-center w-full h-full ">
          <input type="text" value={query} onChange={(e)=>{setQuery(e.target.value)}} placeholder="Search order" className="w-full text-sm placeholder:text-muted h-full focus:outline-0 focus:bg-secondary-300/5 px-2" />
          <button type="submit" className="bg-primary hover:text-white p-2 rounded-full text-background">
            <IoSend className="text-xl" />
          </button>
        </form>

      </div>
    </div>
  )
}

import ChatBox from "./components/ChatBox"
import "react-activity/dist/library.css"
import { Provider} from "react-redux"
import {PersistGate} from "redux-persist/integration/react"
import store,{persistor} from "../utils/store"
import UserCheck from "./components/UserCheck"
import Comfirmation from "./components/Comfirmation"
import { BiSolidCoffeeBean } from "react-icons/bi";
import FloraImg from "./assets/floral/flora.webp"
import type { messageListType } from "../types/type"
import { useState } from "react"


function App() {
  const [messagelist,setMessageList] = useState<messageListType[]>([])
  const [showoptions,setShowOptions] = useState(false)
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <main className='w-screen h-screen relative font-outfit overflow-hidden flex flex-col justify-center items-center'>
          <UserCheck/>
          <div className="absolute font-black text-primary capitalize top-2 xl:top-4 left-6 text-2xl font-squada">
            Mori cafe
          </div>
          
          <ChatBox messagelist={messagelist} setMessageList={setMessageList} showoptions={showoptions} setShowOptions={setShowOptions} />
        
          <Comfirmation/>
           <BiSolidCoffeeBean className="xl:size-64 size-0 text-secondary-200 -z-10  absolute opacity-15 2xl:right-1/10 -right-20 sm:-right-1/10 md:-top-[13%] sm:-top-2/10 top-2/10 rotate-12 md:rotate-0"/>

          <BiSolidCoffeeBean className="xl:size-52 size-0 text-secondary-200 -z-10 absolute opacity-15 sm:-right-[5%] -right-[10%] sm:top-5/10 top-[75%] lg:top-4/10"/>
         
          <BiSolidCoffeeBean className="xl:size-32 text-secondary-200 -z-10 size-0 absolute opacity-15 2xl:right-[20%] xl:right-[10%] lg:right-[15%] right-[25%] xl:top-[25%] lg:top-[25%] sm:top-[35%] top-[55%] -rotate-12 sm:rotate-12"/>
          <img src={FloraImg} className="2xl:size-4/10 xl:size-3/10 size-0 opacity-40 -z-10 absolute object-contain -left-1/10 bottom-0"/>
        </main>
      </PersistGate>
    </Provider>
  )
}
export default App
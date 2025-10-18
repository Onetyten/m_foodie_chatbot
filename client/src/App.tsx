import ChatBox from "./components/ChatBox"
import SearchBar from "./components/SearchBar"
import "react-activity/dist/library.css"
import { Provider} from "react-redux"
import {PersistGate} from "redux-persist/integration/react"
import store,{persistor} from "../utils/store"
import UserCheck from "./components/UserCheck"
import Comfirmation from "./components/Comfirmation"
import { BiSolidCoffeeBean } from "react-icons/bi";
import FloraImg from "./assets/floral/flora.webp"


function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <main className='w-screen h-screen relative font-outfit overflow-hidden bg-background -z-20 flex flex-col justify-center items-center'>
          <UserCheck/>
          <div className="absolute font-black text-primary capitalize top-4 left-6 text-2xl font-squada">
            Mori cafe
          </div>
          <div className="xs:w-md sm:w-lg md:w-xl w-full max-w-full pt-6 h-full px-2 flex flex-col gap-4">
            <ChatBox />
            <SearchBar/>
          </div>
          <Comfirmation/>
           <BiSolidCoffeeBean className="lg:size-64 text-secondary-200 -z-10 xs:size-48 size-36 absolute opacity-30 2xl:right-1/10 -right-20 sm:-right-1/10 md:-top-[13%] sm:-top-2/10 top-2/10 rotate-12 md:rotate-0"/>

          <BiSolidCoffeeBean className="2xl:size-52 text-secondary-200 -z-10 lg:size-44 size-32 absolute opacity-30 sm:-right-[5%] -right-[10%] sm:top-5/10 top-[75%] lg:top-4/10"/>
         
          <BiSolidCoffeeBean className="xl:size-32 text-secondary-200 -z-10 size-24 absolute opacity-30 2xl:right-[20%] xl:right-[10%] lg:right-[15%] right-[25%] xl:top-[25%] lg:top-[25%] sm:top-[35%] top-[55%] -rotate-12 sm:rotate-12"/>
          <img src={FloraImg} className="sm:size-4/10 size-5/10 -z-10 absolute object-contain -left-1/10 bottom-0"/>



        </main>
      </PersistGate>
    </Provider>
  )
}
export default App
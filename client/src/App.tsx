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
        <main className='w-screen h-screen relative font-outfit overflow-hidden bg-background flex flex-col justify-center items-center'>
          <UserCheck/>
          <div className="absolute font-black text-primary capitalize top-4 left-4 text-2xl font-squada">
            Mori cafe
          </div>
          <div className="w-xl h-full flex flex-col gap-4">
            <ChatBox />
            <SearchBar/>
          </div>
          <Comfirmation/>

          <div className="size-52 absolute bg-secondary-200/30 rounded-full right-[5%] top-4/10"></div>
          <div className="size-64 absolute bg-secondary-200/30 rounded-full right-1/10 -top-1/10"></div>
          <div className="size-32 absolute bg-secondary-200/30 rounded-full right-[20%] top-[25%]"></div>
          <img src={FloraImg} className="size-4/10 absolute object-contain -left-1/10 bottom-0"/>



        </main>
      </PersistGate>
    </Provider>
  )
}
export default App
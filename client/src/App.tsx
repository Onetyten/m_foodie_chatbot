import ChatBox from "./components/ChatBox"
import SearchBar from "./components/SearchBar"
import "react-activity/dist/library.css"
import { Provider} from "react-redux"
import {PersistGate} from "redux-persist/integration/react"
import store,{persistor} from "../config/store"
import UserCheck from "./components/UserCheck"
import FoodModal from "./components/FoodModal"
import { useState } from "react"

function App() {

  const [showModal,setShowModal] =useState(false)
  const [messagelist,setMessageList] = useState([
      {type:"message", sender:"bot", next:()=>showAnsweroptions(), content:['Hey there! I’m Mori','your digital barista','What are you craving today?']},
  ])
  const [showoptions,setShowOptions] = useState(false)
  function showAnsweroptions(){
      setShowOptions(true)
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <main className='w-screen h-screen font-baskerville relative overflow-hidden bg-primary flex flex-col justify-center items-center'>
          <UserCheck/>
          <div className="absolute top-4 left-4 text-2xl font-squada">
            Mori cafe
          </div>
          <div className="w-xl h-full flex flex-col gap-4">
            <ChatBox messagelist = {messagelist} setMessageList={setMessageList} showoptions={showoptions} setShowModal={setShowModal} setShowOptions={setShowOptions} />
            <SearchBar/>
          </div>
          {showModal&&<FoodModal items = {messagelist}  setShowModal={setShowModal}/>}
        </main>
      </PersistGate>
    </Provider>
  )
}
export default App
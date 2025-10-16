import ChatBox from "./components/ChatBox"
import SearchBar from "./components/SearchBar"
import "react-activity/dist/library.css"
import { Provider} from "react-redux"
import {PersistGate} from "redux-persist/integration/react"
import store,{persistor} from "../utils/store"
import UserCheck from "./components/UserCheck"
import Comfirmation from "./components/Comfirmation"

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <main className='w-screen h-screen font-outfit relative overflow-hidden bg-primary flex flex-col justify-center items-center'>
          <UserCheck/>
          <div className="absolute font-black capitalize top-4 left-4 text-2xl font-squada">
            Mori cafe
          </div>
          <div className="w-xl h-full flex flex-col gap-4">
            <ChatBox />
            <SearchBar/>
          </div>
          <Comfirmation/>
        </main>
      </PersistGate>
    </Provider>
  )
}
export default App
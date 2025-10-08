import ChatBox from "./components/ChatBox"
import SearchBar from "./components/SearchBar"
import "react-activity/dist/library.css"
import { Provider } from "react-redux"
import {PersistGate} from "redux-persist/integration/react"
import store,{persistor} from "../store/store"

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <main className='w-screen h-screen font-baskerville relative overflow-hidden bg-primary flex flex-col justify-center items-center'>
          <div className="absolute top-4 left-4 text-2xl font-squada">
            Mori cafe
          </div>
          <div className="w-xl h-full flex flex-col">
            <ChatBox/>
            <SearchBar/>
          </div>
        </main>
      </PersistGate>
    </Provider>
  )
}
export default App

import "react-activity/dist/library.css"
import { Provider} from "react-redux"
import {PersistGate} from "redux-persist/integration/react"
import store,{persistor} from "../utils/store"
import { BrowserRouter, Route, Routes } from "react-router"
import Home from "./pages/Home/Home"
import ChatPage from "./pages/ChatPage/ChatPage"




function App() {

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/chat" element={<ChatPage/>}/>
          </Routes>        
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}
export default App
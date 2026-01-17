import { RxDownload } from "react-icons/rx";

import NavBar from "./NavBar";
import Background from "./Background";


export default function IntroPage() {
  return (
    <div className="w-screen max-w-screen overflow-hidden flex flex-col min-h-[100dvh] p-6 font-outfit items-center relative">
            <NavBar/>
            <div className="flex-1 w-full pt-36 flex flex-col items-center text-center text-secondary-100 gap-8">
                <p className="font-reader text-4xl sm:text-5xl max-w-full w-[600px] font-light capitalize">
                    A cross-platform <span className="text-secondary-300">coffee</span> ordering app
                </p>
                <p className="w-[600px] max-w-full font-light">
                    Meet Mori, an intelligent food ordering chatbot that guides you through the Mori Café menu, lets you customise your orders, receive personalized food suggestions, handle payment, and more, all through an intuitive interface.
                </p>
                <p className="w-[600px] max-w-full font-light text-muted">
                    Available on Mac, Windows, and Android
                </p>
                <button className="p-1.5 max-w-full cursor-pointer hover:bg-secondary-100 text-background h-[64px] flex items-center sm:gap-6 gap-2 rounded-full font-light bg-primary">
                    <div className="bg-secondary-200 text-secondary-100 size-[50px] aspect-square flex justify-center items-center rounded-full">
                        <RxDownload size={27}/>
                    </div>
                    <p className="text-left mr-2 sm:mr-6 text-base sm:text-lg">Download Mori Cafe App</p> 
                </button>
            </div>
            <Background/>
    </div>
  )
}

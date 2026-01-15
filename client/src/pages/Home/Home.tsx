import Bestsellers from "../ChatPage/components/Bestsellers/Bestsellers";
import Category from "../ChatPage/components/Category/Category";
import IntroPage from "../ChatPage/components/HeroSection/HeroSection";
import OurCafe from "../ChatPage/components/OurCafe/OurCafe";





export default function Home() {
  return (
    <div className="flex flex-col overflow-x-hidden text-lg justify-center items-center" >
        <IntroPage/>
        
        <Category/>
        <Bestsellers/>
        <OurCafe/>
    </div>
  )
}

import Bestsellers from "../ChatPage/components/Bestsellers/Bestsellers";
import Category from "../ChatPage/components/Category/Category";
import Footer from "../ChatPage/components/Footer/Footer";
import IntroPage from "../ChatPage/components/HeroSection/IntroPage";
import Highlights from "../ChatPage/components/Highlights/Highlights";
import OurCafe from "../ChatPage/components/OurCafe/OurCafe";





export default function Home() {
  return (
    <div className="flex flex-col overflow-x-hidden sm:text-lg justify-center items-center" >
        <IntroPage/>
        <Highlights/>
        <Category/>
        <Bestsellers/>
        <OurCafe/>
        <Footer/>
    </div>
  )
}

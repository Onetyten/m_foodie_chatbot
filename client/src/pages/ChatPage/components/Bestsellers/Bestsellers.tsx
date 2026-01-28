
import { bestSellers } from '../../../../data/categoryData'
import { Swiper,SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination ,Autoplay,EffectCoverflow,Navigation} from 'swiper/modules';
import BestsellerItem from './BestsellerItem';
import sectionDivider from "../../../../assets/svg/section-4-intro-divder.svg"




export default function Bestsellers() {
    
    
  return (
    <div className='w-full z-30 min-h-[100vh] section flex relative bg-background flex-col gap-16 py-20 px-6 sm:px-[15%] justify-start items-start p-14'>
        
        <img src={sectionDivider} alt="" className="object-cover left-0 z-20 absolute bottom-full h-auto w-screen" />
        <p className="text-4xl sm:text-5xl font-reader text-white">OUR <span className="text-primary">BEST SELLERS</span></p>
        
        <Swiper slidesPerView={3} spaceBetween={6} loop={true} pagination={{clickable: true,}} modules={[Pagination,Autoplay,EffectCoverflow,Navigation]} autoplay={{delay:5000, disableOnInteraction:false}} breakpoints={{0: {slidesPerView: 1},1028:{slidesPerView: 3}}}  coverflowEffect={{ rotate: 0, stretch: 0, depth: 100, modifier: 2.5, slideShadows: true}}  className="flex w-full gap-2 flex-wrap justify-center items-center">
                {bestSellers.map((food,index)=>{
                    return(
                        <SwiperSlide className='flex w-full pb-12 justify-center items-center'>
                            <BestsellerItem food={food} key={index}/>
                        </SwiperSlide>
                    )
                })}
        </Swiper>
        {/* <div className="overlay absolute inset-0 bg-muted/0 pointer-events-none" ></div> */}
    </div>
  )
}

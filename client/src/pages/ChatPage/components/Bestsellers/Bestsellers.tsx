
import { bestSellers } from '../../../../data/categoryData'
import { Swiper,SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination ,Autoplay,EffectCoverflow,Navigation} from 'swiper/modules';
import BestsellerItem from './BestsellerItem';



export default function Bestsellers() {
    
    
  return (
    <div className='w-full flex bg-background flex-col gap-16 pb-20 px-6 sm:px-[15%] justify-between items-start p-14'>
        
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
    </div>
  )
}

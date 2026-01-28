import { categoryData } from "../../../../data/categoryData"
import CategoryItem from "./CategoryItem"
import sectionDivider from "../../../../assets/svg/section-3-intro-divder.svg"





export default function Category() {
  return (
    <div className='w-full section z-20 flex min-h-[100dvh] flex-col relative items-start bg-secondary-100 gap-16 sm:pb-32 md:pb-[20%] sm:pt-20 px-6 sm:px-[15%] justify-start p-14'>
        <img src={sectionDivider} alt="" className="object-cover left-0 z-20 absolute bottom-full h-auto w-screen" />
        <p className="text-4xl sm:text-5xl font-reader text-white">SHOP BY <span className="text-secondary-200">CATEGORY</span></p>
        <div className='flex flex-col lg:flex-row gap-8 py-10 justify-between items-center w-full '>
            {categoryData.map((item,index)=>{
                return(
                    <CategoryItem item={item} index={index} key={index}/>
                )
            })}
        </div>
        <div className="overlay absolute inset-0 bg-muted/0 pointer-events-none" ></div>
    </div>
  )
}

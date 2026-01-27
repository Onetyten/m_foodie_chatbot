import { categoryData } from "../../../../data/categoryData"
import CategoryItem from "./CategoryItem"




export default function Category() {
  return (
    <div className='w-full flex flex-col items-start bg-background  to-secondary-200 gap-16 sm:pb-32 sm:pt-0 px-6 sm:px-[15%] justify-start p-14'>
        <p className="text-4xl sm:text-5xl font-reader text-white">SHOP BY <span className="text-primary">CATEGORY</span></p>
        <div className='flex flex-col lg:flex-row gap-8 py-10 justify-between items-center w-full '>
            {categoryData.map((item,index)=>{
                return(
                    <CategoryItem item={item} index={index} key={index}/>
                )
            })}
        </div>
    </div>
  )
}

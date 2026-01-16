import { categoryData } from "../../../../data/categoryData"
import CategoryItem from "./CategoryItem"




export default function Category() {
  return (
    <div className='w-full flex flex-col items-start bg-background to-90% to-secondary-200 gap-16 py-32 px-64 justify-start p-14'>
        <p className="text-5xl font-reader text-white">SHOP BY <span className="text-primary">CATEGORY</span></p>
        <div className='flex gap-8 py-10 justify-between w-full '>
            {categoryData.map((item,index)=>{
                return(
                    <CategoryItem item={item} index={index} key={index}/>
                )
            })}
        </div>
    </div>
  )
}

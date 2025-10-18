import {motion} from 'framer-motion'
interface optionType{
  name:string,
  onClick:()=>void
}

interface propType{
  options:optionType[]
}


export default function OptionsInput(props:propType) {
  const {options} = props
  return (
    <div className="w-full justify-end flex">
      <div className="flex gap-2 max-w-8/12 justify-end">
        {options.map((item,index)=>{
          return(
            <motion.div initial={{opacity:0,x:50}} animate={{opacity:100, x:0}} transition={{duration:0.2, delay:index*0.1, ease:['easeOut']}} onClick={item.onClick} key={index} className="p-2 border border-primary select-none text-primary text-nowrap rounded-sm backdrop-blur-md cursor-pointer hover:bg-secondary-200/10 ">
              {item.name}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
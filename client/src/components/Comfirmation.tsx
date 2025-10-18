import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../utils/store'
import { clearDeleteCartItem } from '../../store/cartDeleteSlice'
import { deleteOrder } from '../../store/OrderCartList'
import api from '../../utils/api'

export default function Comfirmation() {
    const deletedItem = useSelector((state:RootState)=>state.cartDel.cartDel)
    const dispatch = useDispatch()

    async function handleDelete() {
        if (!deletedItem) return
        const itemId = deletedItem._id
        dispatch(deleteOrder(deletedItem._id))
        dispatch(clearDeleteCartItem())
        await api.delete(`/order/cart/delete/${itemId}`)
        return
    }

  return (
    deletedItem&&
    <div className='fixed w-full h-full flex justify-center items-center z-60 bg-secondary-300/50'>
        <div className='w-96 max-w-full mx-6 bg-white p-6 gap-4 flex flex-col justify-center items-center text-sm sm:text-md rounded-md'>
            <p className='text-center text-secondary-100'>
                Are you sure you want to remove {deletedItem.foodId.name} from your tab
            </p>
            <div className='flex gap-1 w-full text-xs sm:text-sm'>
                <div onClick={()=>{dispatch(clearDeleteCartItem())}} className="rounded-sm flex-1 flex justify-center p-2 cursor-pointer hover:bg-secondary-300/10 items-center gap-6 border border-secondary-100">
                    No
                </div>
                <div onClick={handleDelete}
                    className="rounded-sm flex-1 bg-red-500 hover:bg-red-600 text-white cursor-pointer flex justify-center p-2 items-center gap-6">
                    Yes
                </div>
            </div>
        </div>
    </div>
  )
}

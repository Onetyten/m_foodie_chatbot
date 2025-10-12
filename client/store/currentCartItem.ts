import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { cartType } from "../types/type"

interface CartState {
  cart: cartType | null
}

const initialState: CartState = {
  cart: null,
}

const currentCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCurrentCart: (state, action: PayloadAction<cartType>) => {
        console.log("🔵 SET_CURRENT_CART CALLED WITH:", action.payload)
        console.log("🔵 CUSTOMISATION LENGTH:", action.payload.customisation.length)
        console.trace("🔵 CALLED FROM:")
        state.cart = action.payload
    },
    updateCustomisation: (state, action: PayloadAction<cartType["customisation"]>) => {
        console.log("🟡 UPDATE_CUSTOMISATION CALLED WITH:", action.payload)
        console.trace("🟡 CALLED FROM:")
        if (state.cart) {
            state.cart.customisation = action.payload
        }
    },
    clearCurrentCart: (state) => {
        console.log("🔴 CLEAR_CURRENT_CART CALLED")
        console.trace("🔴 CALLED FROM:")
        state.cart = null
    },
  },
})

export const { setCurrentCart, updateCustomisation, clearCurrentCart } = currentCartSlice.actions
export default currentCartSlice.reducer


import storage from 'redux-persist/lib/storage'
import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {persistReducer, persistStore} from 'redux-persist'

const persistConfig = {
    key:'root',
    version:1,
    storage,
    whitelist:[]
}

const reducer = combineReducers({

})

const persistedReducer = persistReducer(persistConfig,reducer)

const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:false
    })
})

export default store
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
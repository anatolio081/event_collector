import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import sessionReducer from './session'
import tabReducer from './tab'

const store = configureStore({
    reducer: {
        session: sessionReducer,
        tab: tabReducer
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false
    }),
    devTools: import.meta.env.MODE !== "development" ? false : true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
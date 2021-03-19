import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import sessionReducer from './session'

const store = configureStore({
    reducer: {
        session: sessionReducer
    },
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['session/setSession'],
        }
    }),
    devTools: import.meta.env.MODE !== "development" ? false : true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
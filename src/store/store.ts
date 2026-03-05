import { configureStore } from '@reduxjs/toolkit'
import { translateParamsSlice } from './translateParamsSlice'
import { translateApi } from './translateApi'

export const store = configureStore({
  reducer: {
    translateParams: translateParamsSlice.reducer,
    [translateApi.reducerPath]: translateApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(translateApi.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
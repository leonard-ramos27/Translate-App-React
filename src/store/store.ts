import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { translateParamsSlice } from './translateParamsSlice'
import { translateApi } from './translateApi'

const rootReducer = combineReducers({
  translateParams: translateParamsSlice.reducer,
  [translateApi.reducerPath]: translateApi.reducer,
})


export function setupStore(preloadedState?: PreloadedState){
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(translateApi.middleware),
    preloadedState
  })
}

export const store = setupStore()

export type PreloadedState = Parameters<typeof rootReducer>[0]
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
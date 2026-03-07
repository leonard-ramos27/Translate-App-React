import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface TranslateParamsState {
  originalText: string,
  sourceLang: string,
  targetLang: string,
}

const initialState: TranslateParamsState = {
  originalText: "Hello, how are you?",
  sourceLang: "en",
  targetLang: "fr",
}

export const translateParamsSlice = createSlice({
  name: 'translateParams',
  initialState,
  reducers: {
    setOriginalText: (state, action: PayloadAction<string>) => {
      state.originalText = action.payload
    },
    setSourceLang: (state, action: PayloadAction<string>) => {
      state.sourceLang = action.payload
    },
    setTargetLang: (state, action: PayloadAction<string>) => {
      state.targetLang = action.payload
    },
    setSwitchLang: (state, action:PayloadAction<string>) => {
      const sourceLang = state.sourceLang
      state.sourceLang = state.targetLang
      state.targetLang = sourceLang
      state.originalText = action.payload
    }
  },
})

export const { setOriginalText, setSourceLang, setTargetLang, setSwitchLang } = translateParamsSlice.actions

export default translateParamsSlice.reducer
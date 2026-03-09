import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const translateApi = createApi({
  reducerPath: 'translateApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.mymemory.translated.net/' }),
  endpoints: (builder) => ({
    translateText: builder.query({
      query: ({originalText, sourceLang, targetLang}) => `get?q=${originalText}&langpair=${sourceLang}|${targetLang}`,
    }),
  }),
})

export const { useTranslateTextQuery } = translateApi
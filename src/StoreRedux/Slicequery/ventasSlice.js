import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const sawerg = createApi({
    reducerPath: "Apiswager",
    baseQuery: fetchBaseQuery({ baseUrl: 'https://.com/api/v2' }),
    endpoints: (builder) => ({
        getEventos: builder.query({
            query: (name) => "",
        })
    })
})
export const { useGetEventosQuery } = sawerg
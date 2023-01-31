import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const sawerg = createApi({
    reducerPath: "Apiswager",
    baseQuery: fetchBaseQuery({
        prepareHeaders: (headers) => {
            headers.set("Accept", "application/json")
            headers.set("Content-type", "appliation/json"),
                headers.set("Authorization", 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ==');
            return headers;
        },
        baseUrl: 'https://rec.netbot.ec/ms_login/'
    }),

    endpoints: (builder) => ({
        getEventos: builder.query({
            query: (parms) => "listareventos/" + parms,
        }),
        getPubicidad:builder.query({
            query: () =>"api/v1/listar_publicidad",
        }),
        getRegistroCompra: builder.mutation({
            query: parms => ({
                url: '/listarRegistros',
                method: 'POST',
                body: parms
            }),
            invalidatesTags:['Post']

        })

    })
})
export const { useGetEventosQuery, useGetRegistroCompraMutation, useGetPubicidadQuery } = sawerg
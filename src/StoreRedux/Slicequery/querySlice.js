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
        baseUrl: 'https://api.t-ickets.com/ms_login/'
    }),

    endpoints: (builder) => ({
        getEventos: builder.query({
            query: (parms) => "listareventos/" + parms,
        }),
        getPubicidad: builder.query({
            query: () => "api/v1/listar_publicidad",
        }),
        getBoletos:builder.query({
            query: () =>"ticket_admin"
        }),
        getSuscritor:builder.query({
            query: () =>"api/v1/listas_suscriptor"
        }),
        getRegistroCompra: builder.mutation({
            query: parms => ({
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
                },
                url: '/listarRegistros',
                method: 'POST',
                body: parms
            })
        }),
        getLocalidad:builder.query({
            query: () =>"/api/v1/listar_localidades/"
        })

    })
})
export const { useGetEventosQuery, useGetRegistroCompraMutation, useGetPubicidadQuery,useGetBoletosQuery
,useGetSuscritorQuery,useGetLocalidadQuery } = sawerg
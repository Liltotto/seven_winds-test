import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICreateOutlayRowArgs, IDeleteOutlayRowArgs, IOutplay, IUpdateOutlayRowArgs } from "../models/IOutlay";


export const outlayAPI = createApi({
    reducerPath: 'outlayAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://185.244.172.108:8081/v1/outlay-rows/entity'}),
    tagTypes: ['OutlayRow'],
    endpoints: (build) => ({
        getAllOutlayRows: build.query<IOutplay[], number>({
            query: (eID) => ({
                url: `/${eID}/row/list`,
            }),
            providesTags: ['OutlayRow']
        }),
        createOutlayRow: build.mutation<IOutplay, ICreateOutlayRowArgs>({
            query: ({eID, body}) => ({
                url: `/${eID}/row/create`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['OutlayRow']
        }),
        updateOutlayRow: build.mutation<IOutplay, IUpdateOutlayRowArgs>({
            query: ({eID, rID, body}) => ({
                url: `/${eID}/row/${rID}/update`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['OutlayRow']
        }),
        deleteOutlayRow: build.mutation<IOutplay, IDeleteOutlayRowArgs>({
            query: ({eID, rID}) => ({
                url: `/${eID}/row/${rID}/delete`,
                method: 'DELETE'
            }),
            invalidatesTags: ['OutlayRow']
        })
    })
})


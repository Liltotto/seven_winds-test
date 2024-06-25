import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICreateOutlayRowArgs, IDeleteOutlayRowArgs, IOutlay, IUpdateOutlayRowArgs } from "../models/IOutlay";


export const outlayAPI = createApi({
    reducerPath: 'outlayAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://185.244.172.108:8081/v1/outlay-rows/entity/'}),
    tagTypes: ['OutlayRow'],
    endpoints: (build) => ({
        getAllOutlayRows: build.query<IOutlay[], number>({
            query: (eID) => ({
                url: `/${eID}/row/list`,
            }),
            providesTags: ['OutlayRow']
        }),
        createOutlayRow: build.mutation<IOutlay, ICreateOutlayRowArgs>({
            query: ({eID, body}) => ({
                url: `/${eID}/row/create`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['OutlayRow']
        }),
        updateOutlayRow: build.mutation<IOutlay, IUpdateOutlayRowArgs>({
            query: ({eID, rID, body}) => ({
                url: `/${eID}/row/${rID}/update`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['OutlayRow']
        }),
        deleteOutlayRow: build.mutation<IOutlay, IDeleteOutlayRowArgs>({
            query: ({eID, rID}) => ({
                url: `/${eID}/row/${rID}/delete`,
                method: 'DELETE'
            }),
            invalidatesTags: ['OutlayRow']
        })
    })
})


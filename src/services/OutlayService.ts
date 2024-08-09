import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ICreateOutlayRowArgs,
  IDeleteOutlayRowArgs,
  IOutlay,
  IOutlayReturn,
  IUpdateOutlayRowArgs,
} from "../models/IOutlay";

export const outlayAPI = createApi({
  reducerPath: "outlayAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://185.244.172.108:8081/v1/outlay-rows/entity",
  }),
  endpoints: (build) => ({
    getAllOutlayRows: build.query<IOutlay[], number>({
      query: (eID) => ({
        url: `/${eID}/row/list`,
      }),
    }),
    createOutlayRow: build.mutation<IOutlayReturn, ICreateOutlayRowArgs>({
      query: ({ eID, body }) => ({
        url: `/${eID}/row/create`,
        method: "POST",
        body,
      }),
    }),
    updateOutlayRow: build.mutation<IOutlayReturn, IUpdateOutlayRowArgs>({
      query: ({ eID, rID, body }) => ({
        url: `/${eID}/row/${rID}/update`,
        method: "POST",
        body,
      }),
    }),
    deleteOutlayRow: build.mutation<IOutlayReturn, IDeleteOutlayRowArgs>({
      query: ({ eID, rID }) => ({
        url: `/${eID}/row/${rID}/delete`,
        method: "DELETE",
      }),
    }),
  }),
});

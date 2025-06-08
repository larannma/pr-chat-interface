import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Matrix } from "@/types"

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://10.10.169.1:8080" }),
  tagTypes: ["Matrix"],
  endpoints: (builder) => ({
    getMatrices: builder.query<Matrix[], void>({
      query: () => "/admin/v1/matrix",
      transformResponse: (response: { matrixs: { name: string; groups: Matrix["groups"] }[] }) =>
        response.matrixs.map((entry, index) => ({
          id: index + 1,
          title: entry.name,
          groups: entry.groups,
        })),
      providesTags: ["Matrix"],
    }),

    createMatrix: builder.mutation<Matrix, Partial<Matrix>>({
      query: (newMatrix) => {
        const { title, ...rest } = newMatrix
        return {
          url: "/admin/v1/matrix",
          method: "POST",
          body: {
            name: title, // отправляем как name
            ...rest,
          },
        }
      },
      invalidatesTags: ["Matrix"],
    }),
  }),
})

export const { useGetMatricesQuery, useCreateMatrixMutation } = api

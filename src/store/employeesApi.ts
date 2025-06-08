import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Employee } from "@/types";

export const employeesApi = createApi({
  reducerPath: "employeesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://10.10.169.1:8080" }),
  endpoints: (builder) => ({
    getEmployees: builder.query<Employee[], void>({
      query: () => "/admin/v1/results-perf-review",
    }),
  }),
});

export const { useGetEmployeesQuery } = employeesApi;

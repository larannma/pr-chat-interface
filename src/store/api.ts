import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Matrix } from "@/types"

// ---- In-memory mock groups from server ----
const mockGroups: Matrix["groups"] = [
  {
    name: "Automation",
    description: "Инструменты для автоматизации",
    type: "hard",
    skills: [
      { name: "Ansible" },
      { name: "Terraform" },
      { name: "Gitlab-CI" },
    ],
  },
  {
    name: "Monitoring",
    description: "Средства мониторинга и логирования",
    type: "hard",
    skills: [
      { name: "Prometheus" },
      { name: "Grafana" },
      { name: "Zabbix" },
    ],
  },
  {
    name: "Soft Skills",
    type: "soft",
    skills: [
      { name: "Коммуникация" },
      { name: "Презентация задач" },
    ],
  },
]

// ---- Custom base query that returns mock groups ----
const mockBaseQuery = async () => {
  return { data: [{ groups: mockGroups }] } // обернуто как будто пришло с бэка
}

// ---- RTK Query API ----
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://10.10.169.1:8080" }),
  endpoints: (builder) => ({
    getMatrices: builder.query<Matrix[], void>({
      query: () => "/admin/v1/matrix",
      transformResponse: (response: { groups: Matrix["groups"] }[]) =>
        response.map((entry, index) => ({
          id: index + 1,
          title: `DevOps Matrix`,
          groups: entry.groups,
        })),
    }),

    createMatrix: builder.mutation<Matrix, Partial<Matrix>>({
      query: (newMatrix) => ({
        url: "/matrices",
        method: "POST",
        body: newMatrix,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const { data: createdMatrix } = await queryFulfilled
        dispatch(
          api.util.updateQueryData("getMatrices", undefined, (draft) => {
            draft.push(createdMatrix)
          })
        )
      },
    }),
  }),
})

export const { useGetMatricesQuery, useCreateMatrixMutation } = api

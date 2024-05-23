import { api as index } from '..'

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getEBook: build.query({
      query: () => ({
        url: '/api/book/getAllPopularAudBooks',
        method: 'GET'
      }),
      providesTags: ['eBook']
    })
  })
})

export const { useGetEBookQuery } = api

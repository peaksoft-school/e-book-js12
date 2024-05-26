import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getAudioBook: build.query<
			BOOK.GetAudioBookResponse,
			BOOK.GetAudioBookRequest
		>({
			query: () => ({
				url: '/api/book/getAllPopularAudBooks',
				method: 'GET'
			}),
			providesTags: ['audioBook']
		})
	})
});

export const { useGetAudioBookQuery } = api;

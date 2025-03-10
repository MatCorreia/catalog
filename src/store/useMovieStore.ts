import { create } from "zustand";
import { getMovies } from "../services/movieService";
import { Movie } from "../@types/moviesModel";

interface MovieStore {
    movies: Movie[];
    page: number;
    totalPages: number;
    loading: boolean;
    error: string | null;
    cache: Map<string, { data: Movie[]; timestamp: number }>;
    fetchMovies: (page: number) => Promise<void>;
    setPage: (page: number) => void;
}

const CACHE_EXPIRATION_TIME = 5 * 60 * 1000;

export const useMovieStore = create<MovieStore>((set, get) => ({
    movies: [],
    page: 1,
    totalPages: 1,
    loading: false,
    error: null,
    cache: new Map(),

    fetchMovies: async (page: number) => {
        const { cache } = get();
        const cacheKey = `movies-${page}`;
        const cachedData = cache.get(cacheKey);

        if ((cachedData && Date.now() - cachedData.timestamp < CACHE_EXPIRATION_TIME)) {
            set({ movies: cachedData.data, page });
            return;
        }

        set({ loading: true, error: null });

        try {
            const response = await getMovies(page);
            set((state) => {
                const newCache = new Map(state.cache);
                newCache.set(cacheKey, { data: response.results, timestamp: Date.now() });

                if (newCache.size > 10) {
                    const firstKey = newCache.keys().next().value;
                    newCache.delete(String(firstKey));
                }

                return {
                    movies: response.results,
                    page: response.page,
                    totalPages: Math.min(response.total_pages, 500),
                    cache: newCache,
                };
            });
        } catch (err: unknown) {
            let errorMessage = "Erro ao listar filmes";

            if (err instanceof Error) {
                errorMessage = err.message || errorMessage;
            }

            set({ error: errorMessage });
            console.error("Erro ao listar filmes:", errorMessage);
        } finally {
            set({ loading: false });
        }
    },

    setPage: (page: number) => {
        const { fetchMovies } = get();
        fetchMovies(page);
        set({ page });
    },
}));
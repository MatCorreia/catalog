import { create } from "zustand";
import { getDetailsMovies } from "../services/detailsService";

interface MovieStore {
    movie: any;
    loading: boolean;
    error: string | null;
    cache: Map<string, { data: any; timestamp: number }>;
    fetchDetailsMovie: (id: number) => Promise<void>;
}

const CACHE_EXPIRATION_TIME = 5 * 60 * 1000;

export const useDetailsMovieStore = create<MovieStore>((set, get) => ({
    movie: {},
    loading: false,
    error: null,
    cache: new Map(),

    fetchDetailsMovie: async (id: number) => {
        const { cache } = get();
        const cacheKey = `movie-${id}`;
        const cachedData = cache.get(cacheKey);

        if ((cachedData && Date.now() - cachedData.timestamp < CACHE_EXPIRATION_TIME)) {
            set({ movie: cachedData.data });
            return;
        }

        set({ loading: true, error: null });

        try {
            const response = await getDetailsMovies(id);
            set((state) => {
                const newCache = new Map(state.cache);
                newCache.set(cacheKey, { data: response, timestamp: Date.now() });

                if (newCache.size > 10) {
                    const firstKey = newCache.keys().next().value;
                    newCache.delete(String(firstKey));
                }

                return {
                    movie: response,
                    cache: newCache,
                };
            });
        } catch (err: unknown) {
            let errorMessage = "Erro ao listar detalhes do filme";

            if (err instanceof Error) {
                errorMessage = err.message || errorMessage;
            }

            set({ error: errorMessage });
            console.error("Erro ao listar detalhes do filme:", errorMessage);
        } finally {
            set({ loading: false });
        }
    }
}));
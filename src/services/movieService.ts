import { ApiResponse } from "../@types/apiModel";
import { Movie } from "../@types/moviesModel";
import api from "./api";

export const getMovies = async (page: number): Promise<ApiResponse<Movie[]>> => {
    try {
        const response = await api.get(`/3/movie/popular?page=${page}`);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Erro ao listar filmes');
        } else {
            throw new Error('Erro desconhecido ao listar filmes');
        }
    }
};
import { ApiResponse } from "../@types/apiModel";
import { DetailsMovie } from "../@types/detailsMovieModel";
import api from "./api";

export const getDetailsMovies = async (id: number): Promise<ApiResponse<DetailsMovie>> => {
    try {
        const response = await api.get(`/3/movie/${id}`);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Erro ao listar os detalhes do filme');
        } else {
            throw new Error('Erro desconhecido ao listar os detalhes do filme');
        }
    }
};
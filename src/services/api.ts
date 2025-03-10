import axios from "axios";
import { AuthEnum } from "../enum/enum";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/",
    timeout: 30000,
    headers: {
        "Content-Type": "application/json;charset=utf-8",
    },
});

api.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzBlNzI5Y2M2ZGQ1OTY5NzJiODhkYTMwZjQwMTk5YiIsIm5iZiI6MTc0MTM3OTIyNS42MDUsInN1YiI6IjY3Y2I1Njk5N2M5NjdlMDRkNTViOGIyNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o7mMGEpBeeEbUcmbxUVOofHQcQNpnCWx2pKfQYAGdks`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                sessionStorage.removeItem(AuthEnum.LOGGEDUSER);
                window.location.href = "/";
            }

            return Promise.reject(error.response.data);
        } else {
            return Promise.reject({ message: "Erro de conexão." });
        }
    }
);

export default api;
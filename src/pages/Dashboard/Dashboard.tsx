import { lazy, Suspense, useEffect } from "react";
import { MainLayout } from "../../layouts/MainLayout/MainLayout";
import { useMovieStore } from "../../store/useMovieStore";
import { Pagination } from "../../components/Pagination/Pagination";
import { SkeletonCard } from "../../components/Skeleton/Skeleton";
import { Button } from "../../components/Button/Button";

import './Dashboard.css';
import { useNavigate } from "react-router-dom";

const Card = lazy(() => import("../../components/Card/Card"));

export const Dashboard = () => {
    const navigate = useNavigate();

    const { movies, loading, page, totalPages, error, fetchMovies } = useMovieStore();

    useEffect(() => {
        fetchMovies(page);
    }, []);

    const ListSeletonCard = () => {
        return Array.from({ length: 20 }).map((_, index) => (
            <SkeletonCard key={index} />
        ));
    };

    function DetailsMovie(id: number) {
        navigate(`/dashboard/movie/${id}`)
    }

    return (
        <MainLayout>
            <h2 className="bg-title-dashboard">Filmes</h2>

            {error ? (
                <div className="error-message">
                    <p>{error}</p>
                    <Button 
                        btnType="button"
                        content="Tente Novamente"
                        isClick={true}
                        click={() => fetchMovies(page)}
                    />
                </div>
            ) : (
                <section className="bg-col-movies">
                    <Suspense fallback={<ListSeletonCard />}>
                        {loading ? (
                            <ListSeletonCard />
                        ) : (
                            movies?.map((item) => (
                                <div key={item.id} onClick={() => DetailsMovie(item.id)}>
                                    <Card
                                        imgName={item.poster_path}
                                        title={item.title}
                                    />
                                </div>
                            ))
                        )}
                    </Suspense>
                </section>
            )}

            {totalPages > 1 && <Pagination />}
        </MainLayout>
    );
};
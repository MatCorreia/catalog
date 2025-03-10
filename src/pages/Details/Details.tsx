import { useParams } from 'react-router-dom';
import { MainLayout } from '../../layouts/MainLayout/MainLayout';
import { Suspense, useEffect } from 'react';
import { useDetailsMovieStore } from '../../store/useDetailsMovieStore';

import './Details.css'
import { SkeletonDetails } from '../../components/Skeleton/Skeleton';
import { Button } from '../../components/Button/Button';

export const Details = () => {
    const { id } = useParams();

    const { movie, loading, error, fetchDetailsMovie } = useDetailsMovieStore();

    useEffect(() => {
        fetchDetailsMovie(Number(id));
    }, [])

    return (
        <MainLayout>
            {error ? (
                <div className="error-message">
                    <p>{error}</p>
                    <Button
                        btnType="button"
                        content="Tente Novamente"
                        isClick={true}
                        click={() => fetchDetailsMovie(Number(id))}
                    />
                </div>
            ) : (
                <Suspense fallback={<SkeletonDetails />}>
                    {loading ? (
                        <SkeletonDetails />
                    ) : (
                        <div className="movie-details">
                            <h1>{movie.title}</h1>
                            <div className="movie-details-content">
                                <div className="movie-details-img">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                                        alt={movie.title}
                                        className="movie-poster"
                                    />
                                </div>
                                <div className="movie-info">
                                    <p><strong>Release Date:</strong> {new Date(movie.release_date).toLocaleDateString()}</p>
                                    <p><strong>Genres:</strong> {movie?.genres?.map((genre: any) => genre.name).join(', ')}</p>
                                    <p><strong>Overview:</strong> {movie.overview}</p>
                                    <p><strong>Vote Average:</strong> {movie.vote_average}</p>
                                    <p><strong>Status:</strong> {movie.status}</p>
                                    <p><strong>Revenue:</strong> {movie.revenue}</p>
                                    <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
                                </div>
                            </div>

                            <div className="movie-details-footer">
                                <div className="movie-details-companies">
                                    <strong>Production Companies:</strong>
                                    <ul>
                                        {movie?.production_companies?.map((company: any) => (
                                            <li key={company.id}>
                                                <img
                                                    className="company-logo"
                                                    src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
                                                    alt={company.name}
                                                />
                                                {company.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="movie-details-languages">
                                    <strong>Spoken Languages:</strong>
                                    <ul>
                                        {movie?.spoken_languages?.map((language: any) => (
                                            <li key={language.iso_639_1}>{language.name}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="movie-details-countries">
                                    <strong>Production Countries:</strong>
                                    <ul>
                                        {movie?.production_countries?.map((country: any) => (
                                            <li key={country.iso_3166_1}>{country.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </Suspense>
            )}
        </MainLayout>
    )
}
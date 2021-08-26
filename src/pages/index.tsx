import type { GetStaticProps, NextPage } from "next";
import { useState } from "react";
import { useEffect } from "react";
import { MdPlaylistAdd } from "react-icons/md";

import Header from "../Components/Header";
import { api } from "../services/api";

import styles from "../styles/styles.module.scss";

interface HomeProps {
  movies: {
    original_title: string;
    backdrop_path: string;
    overview: string;
    vote_average: string;
    genre_ids: GenreProps[] | number[];
    genre_string?: string;
    id: string;
  }[];
}

interface GenreProps {
  id: number;
  name: string;
}

const Home = ({ movies }: HomeProps) => {
  const GenreSpan = () => {
    const genres = movies[0].genre_ids as GenreProps[];

    return (
      <span>
        {genres.map((genre, index) => {
          return index !== 0 ? ` | ${genre.name}` : `${genre.name}`;
        })}
      </span>
    );
  };

  return (
    <main className={styles.container}>
      <div
        className={styles.heroImage}
        style={{
          background: `linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/original/${movies[0].backdrop_path})`,
          backgroundPosition: "right",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <Header />

        <div className={styles.heroInformation}>
          <h1>{movies[0].original_title}</h1>
          <GenreSpan />
          <button>
            <span>Add to list</span>
            <div>
              <MdPlaylistAdd />
            </div>
          </button>
          <p>{movies[0].overview}</p>
        </div>

        <div className={styles.cardsRow}>
          {movies.slice(1, 6).map((movie) => (
            <div
              key={movie.id}
              className={styles.card}
              style={{
                background: `url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div>
                <p>{movie.original_title}</p>

                <span>{movie.vote_average}/10</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const movieResponse = await api.get("/trending/movie/day");
  const genreResponse = await api.get("/genre/movie/list");

  const trendMovies: HomeProps["movies"] = movieResponse.data.results.slice(
    0,
    6
  );
  const moviesGenres = genreResponse.data.genres;

  const parsedTrendMovies = trendMovies.map((trendMovie) => {
    const newGenre: GenreProps[] = trendMovie.genre_ids.map(
      (trendMovieGenre) => {
        const genres = moviesGenres.find(
          (movieGenre: GenreProps) => movieGenre.id === trendMovieGenre
        );

        return genres;
      }
    );

    return {
      ...trendMovie,
      genre_ids: newGenre,
    };
  });

  return {
    props: {
      movies: parsedTrendMovies,
    },
  };
};

export default Home;

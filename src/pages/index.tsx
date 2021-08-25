import type { GetStaticProps, NextPage } from "next";
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
    id: string;
  }[];
}

const Home = ({ movies }: HomeProps) => {
  return (
    <main className={styles.container}>
      <div
        className={styles.heroImage}
        style={{
          background: `linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/original/${movies[0].backdrop_path})`,
          backgroundPosition: "right",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Header />

        <div className={styles.heroInformation}>
          <h1>{movies[0].original_title}</h1>
          <span>Crime | Drama | Mystery</span>
          <button>
            <span>Adicionar a lista</span>
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
  const response = await api.get("/trending/movie/day");

  const trendMovies = response.data.results.slice(0, 6);

  return {
    props: {
      movies: trendMovies,
    },
  };
};

export default Home;

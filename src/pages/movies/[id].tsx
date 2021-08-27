import { useRouter } from "next/router";
import { useEffect } from "react";

function Movie() {
  const router = useRouter();

  useEffect(() => {
    // todo
    console.log(router.query.movieId);
  }, [router]);

  return <h1>Teste de filme dinâmico</h1>;
}

export default Movie;

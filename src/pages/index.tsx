import type { NextPage } from "next";
import Head from "next/head";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { trpc } from "../utils/trpc";
import { Header } from "../components/Header";
import { PokemonCard } from "../components/PokemonCard";

const Home: NextPage = () => {
  const { ref, inView } = useInView();

  const {
    data: pokemon,
    refetch,
    isFetching,
  } = trpc.useQuery(["pokemon.get-one"], {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });

  const { data: pokemons, fetchNextPage } = trpc.useInfiniteQuery(
    ["pokemon.get-infinite", {}],
    {
      getNextPageParam: (lastPage) => lastPage.nextOffset,
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <>
      <Head>
        <title>Pokedex - Gotta catch &apos;em all</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="max-w-8xl mx-auto flex flex-col flex-1 items-center min-h-[calc(100vh)-4.5rem] pt-4 px-4 sm:px-6 lg:px-8">
        {/* <div className="md:col-span-2 lg:col-span-1 md:sticky md:top-[5.5rem] md:h-[calc(100vh-4.5rem)] mx-auto text-center">
            {isFetching && <p>Fetching...</p>}
            {pokemon && !isFetching && <PokemonCard pokemon={pokemon} />}
            <button
              type="button"
              onClick={() => refetch()}
              className="bg-pink-500 px-4 py-1.5 rounded text-white hover:bg-pink-400 mt-4 text-xs uppercase font-semibold"
            >
              Fetch random
            </button>
          </div> */}

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-fit md:col-span-2 lg:col-span-3 mx-auto">
          {pokemons?.pages.map((page, index) => {
            return (
              <Fragment key={index}>
                {page.results.map((pokemon) => (
                  <li key={pokemon.id}>
                    <PokemonCard pokemon={pokemon} />
                  </li>
                ))}
              </Fragment>
            );
          })}
        </ul>
        <div ref={ref}></div>
      </main>
    </>
  );
};

export default Home;

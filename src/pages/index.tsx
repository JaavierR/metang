import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const {
    data: pokemon,
    isLoading,
    error,
    refetch,
  } = trpc.useQuery(["pokemon.get-one"], {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  function newPokemon(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    refetch();
  }

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-5xl leading-normal font-extrabold text-gray-700">
          Random <span className="text-purple-300">Pokemon</span> App
        </h1>

        <button
          type="button"
          onClick={newPokemon}
          className="bg-purple-500 hover:bg-purple-600 px-4 py-1 rounded mt-6 text-white text-xs font-semibold uppercase"
        >
          Fetch new
        </button>

        {isLoading && <p>Loading...</p>}
        {error && <p>{error.message}</p>}
        {pokemon && (
          <div className="flex flex-col rounded-md p-10 bg-gray-50 shadow-md mt-10 max-w-xs w-full">
            <img
              className="w-40 h-40 mx-auto"
              src={pokemon.sprite}
              alt={`${pokemon.name} stats`}
            />
            <div>
              <h1 className="text-3xl font-bold text-zinc-900 capitalize text-center">
                {pokemon.name}
              </h1>
              <div className="text-center space-x-2 mt-4 text-sm font-semibold">
                {pokemon.types.map((type) => (
                  <span
                    key={type}
                    className="bg-green-100 text-green-500 rounded-2xl px-4 py-1"
                  >
                    {type}
                  </span>
                ))}
              </div>
              <div className="mt-4">
                <h2 className="text-xl font-medium">Stats</h2>
                <div className="mt-4">
                  {pokemon.stats.map((stat) => (
                    <div key={stat.name} className="flex justify-between">
                      <p className="font-semibold capitalize">{stat.name}: </p>
                      <p>{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Home;

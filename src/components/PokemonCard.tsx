/* eslint-disable @next/next/no-img-element */
import { RandomPokemon } from "../server/router/pokemon";
import Badge from "./Badge";

function PokemonCard({ pokemon }: { pokemon: RandomPokemon }) {
  return (
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
            <Badge key={type}>{type}</Badge>
          ))}
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-medium">Stats</h2>
          <ul className="mt-4">
            {pokemon.stats.map((stat) => (
              <li key={stat.name} className="flex justify-between">
                <p className="font-semibold capitalize">{stat.name}: </p>
                <p>{stat.value}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;

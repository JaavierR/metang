/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import { Pokemon } from "../server/router/pokemon";
import { colours } from "../utils/pokemon-info";

export function PokemonListItem({ pokemon }: { pokemon: Pokemon }) {
  return (
    <li className="flex space-x-4 [perspective:1000px]">
      <div className="bg-white w-[23rem] shadow shadow-stone-900/10 rounded-md flex flex-col items-center justify-center pb-4 pt-1">
        <div className="relative">
          <div className="absolute w-24 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <img
              src={pokemon.sprite}
              alt={`${pokemon.name} stats`}
              className="max-w-full block"
            />
          </div>
          <span className="font-medium text-[6.25rem] leading-none text-stone-100 px-14">
            {"#"}
            {`00${pokemon.id}`.slice(-3)}
          </span>
        </div>
        <div className="text-center space-y-1.5">
          <div className="text-center">
            <h1 className="text-xl capitalize font-medium text-stone-700">
              {pokemon.name}
            </h1>
            <p className="text-sm -mt-0.5">{pokemon.genus}</p>
          </div>

          <div className="uppercase text-sm space-x-2 font-bold">
            {pokemon.types.map((type) => (
              <span
                key={type}
                className={clsx([
                  colours[type],
                  "not:first:before:content-['hola'] before:bg-gray-500 before:rounded-full",
                ])}
              >
                {type}
              </span>
            ))}
          </div>

          <div className="space-x-2 text-sm font-medium text-stone-700">
            {pokemon.abilities?.map((ability) => (
              <span key={ability} className="capitalize inline-block">
                {ability}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white shadow shadow-stone-900/10 rounded-md flex flex-col items-center justify-center px-10 pb-4 pt-1">
        <ul className="w-72 space-y-1 text-sm">
          {pokemon.stats.map((stat) => (
            <li
              key={stat.name}
              className="grid grid-cols-[repeat(15,minmax(0,1fr))] gap-4 items-center"
            >
              <p className="font-semibold col-span-6 text-right capitalize text-stone-600">
                {stat.name}
              </p>
              <p className="col-span-2">{stat.value}</p>
              <div className="col-span-7 w-full h-1.5 rounded-full bg-stone-200">
                <div
                  className={clsx([
                    "h-1.5 rounded-full",
                    { "bg-red-400": stat.value < 50 },
                    { "bg-orange-400": stat.value >= 50 && stat.value < 100 },
                    {
                      "bg-yellow-400": stat.value >= 100 && stat.value < 150,
                    },
                    { "bg-green-400": stat.value >= 150 },
                  ])}
                  style={{ width: `${(stat.value / 255) * 100}%` }}
                ></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

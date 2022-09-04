/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";
import { Pokemon } from "../server/router/pokemon";
import { colours } from "../utils/pokemon-info";

function ChevronDown() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ChevronUp() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path
        fillRule="evenodd"
        d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  const [isOpen, setIsOpen] = useState(false);
  const [parent] = useAutoAnimate<HTMLDivElement>({
    easing: "ease-in-out",
    duration: 200,
  });

  return (
    <li>
      <div
        className="bg-white shadow shadow-stone-900/10 rounded-md flex flex-col items-center justify-center pb-4 pt-1"
        ref={parent}
      >
        <div>
          <div className="relative">
            <div className="absolute w-24 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <img
                src={pokemon.sprite}
                alt={`${pokemon.name} stats`}
                className="max-w-full block"
              />
            </div>
            <span className="font-medium text-[6.25rem] leading-none text-stone-200/50 px-16 [font-feature-settings:'tnum']">
              {"#"}
              {`00${pokemon.id}`.slice(-3)}
            </span>
          </div>
          <div className="text-center space-y-2">
            <div className="text-center">
              <h1 className="text-xl capitalize font-medium text-stone-700">
                {pokemon.name}
              </h1>
              <p className="text-sm -mt-0.5">{pokemon.genus}</p>
            </div>

            <div className="uppercase text-sm space-x-2 font-bold">
              {pokemon.types.map((type) => (
                <span key={type} className={colours[type]}>
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

        {isOpen && (
          <ul className="w-72 space-y-1 text-sm mt-4">
            {pokemon.stats.map((stat) => (
              <li
                key={stat.name}
                className="grid grid-cols-[repeat(16,minmax(0,1fr))] gap-4 items-center"
              >
                <p className="font-semibold col-span-7 text-right capitalize text-stone-600">
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
        )}

        <button
          className="mt-4 uppercase font-semibold text-xs text-stone-500 flex items-center hover:text-stone-900"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>Stats</span> {isOpen ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>
    </li>
  );
}

/* eslint-disable @next/next/no-img-element */
function typeColor(type) {
  if (type === "grass") {
    return "text-green-500";
  }
  if (type === "fire") {
    return "text-red-500";
  }

  if (type === "water") {
    return "text-blue-500";
  }

  if (type === "poison") {
    return "text-purple-500";
  }
}

export function PokemonListItem({ pokemon }) {
  return (
    <li>
      <div className="bg-white shadow rounded-md flex flex-col items-center justify-center px-10 pb-4 pt-1">
        <div className="relative">
          <div className="absolute w-24 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <img
              src={pokemon.sprite}
              alt={`${pokemon.name} stats`}
              className="max-w-full block"
            />
          </div>
          <span className="font-medium text-[6.25rem] leading-none text-stone-100">
            {"#"}
            {`00${pokemon.id}`.slice(-3)}
          </span>
        </div>

        <div className="text-center">
          <h1 className="text-xl capitalize font-medium text-stone-800">
            {pokemon.name}
          </h1>
          <p className="text-sm -mt-0.5">{pokemon.genus}</p>
        </div>

        <div className="uppercase text-sm space-x-2 font-bold mt-2">
          {pokemon.types.map((type) => (
            <span key={type} className={typeColor(type)}>
              {type}
            </span>
          ))}
        </div>

        <div className="space-x-2 text-sm font-medium">
          {pokemon.abilities.map((ability) => (
            <span key={ability} className="capitalize inline-block">
              {ability}
            </span>
          ))}
        </div>
      </div>
    </li>
  );
}

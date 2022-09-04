import { createRouter } from "./context";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { getRandomPokemon } from "../../utils/getRandomPokemon";

const randomPokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  types: z.string().array(),
  sprite: z.string(),
  stats: z
    .object({
      name: z.string(),
      value: z.number(),
    })
    .array(),
});

export type RandomPokemon = z.infer<typeof randomPokemonSchema>;

export const pokemonRouter = createRouter()
  .query("get-one", {
    input: z
      .object({
        id: z.number().min(1).max(898),
      })
      .nullish(),
    output: randomPokemonSchema,
    async resolve({ input }) {
      const id = input ? input.id : getRandomPokemon();

      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

      if (!res.ok) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Pokemon not found",
        });
      }

      const { name, types, stats, sprites } = await res.json();

      const pokemon = {
        id,
        name,
        types: types.map((type: { type: { name: string } }) => type.type.name),
        sprite: sprites.other["official-artwork"].front_default,
        stats: stats.map(
          (stat: { stat: { name: string }; base_stat: number }) => ({
            name: stat.stat.name,
            value: stat.base_stat,
          })
        ),
      };

      return pokemon;
    },
  })
  .query("get-infinite", {
    input: z.object({
      limit: z.number().min(10).max(100).nullish(),
      cursor: z.number().nullish(),
    }),
    async resolve({ input }) {
      const limit = input.limit ?? 10;
      const cursor = input.cursor ?? 1;

      const promises1 = [];
      const promises2 = [];

      for (let index = cursor; index <= cursor + limit; index++) {
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${index}`;
        const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${index}`;

        promises1.push(fetch(pokemonUrl).then((res) => res.json()));
        promises2.push(fetch(speciesUrl).then((res) => res.json()));
      }

      const pokemons = await Promise.all(promises1);
      const species = await Promise.all(promises2);
      console.log({ species });

      const results = pokemons.map((pokemon, idx) => ({
        name: pokemon.name,
        id: pokemon.id,
        types: pokemon.types.map(
          (type: { type: { name: string } }) => type.type.name
        ),
        abilities: pokemon.abilities.map(
          (ability: { ability: { name: string } }) => ability.ability.name
        ),
        sprite: pokemon.sprites["front_default"],
        genus: species[idx].genera.find(
          (gen: { language: { name: string } }) => gen.language.name === "en"
        ).genus,
      }));

      return {
        results,
        nextOffset: cursor + limit,
      };
    },
  });

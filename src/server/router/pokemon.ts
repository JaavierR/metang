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
      const cursor = input.cursor ?? 0;

      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${cursor}`
      );

      if (!res.ok) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Pokemons not found",
        });
      }

      // TODO: parse response to add images
      const { results } = await res.json();

      return {
        results,
        nextOffset: cursor + limit,
      };
    },
  });

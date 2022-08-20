import { createRouter } from "./context";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const pokemonRouter = createRouter().query("get-one", {
  input: z.object({
    id: z.number().min(1).max(898),
  }),
  output: z.object({
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
  }),
  async resolve({ input }) {
    const { id } = input;

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
});

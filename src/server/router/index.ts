// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { pokemonRouter } from "./pokemon";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("pokemon.", pokemonRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

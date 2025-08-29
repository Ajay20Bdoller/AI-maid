import type { Config } from "drizzle-kit";

export default {
  schema: "./src/schema.ts",   // tu apni schema file kahan rakhega
  out: "./drizzle",            // migrations isi folder me aayengi
  dialect: "postgresql",       // kyunki tu Neon (Postgres) use kar raha hai
  dbCredentials: {
    url: process.env.DATABASE_URL!, // Neon ka connection string
  },
} satisfies Config;



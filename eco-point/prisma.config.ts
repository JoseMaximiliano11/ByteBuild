import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // DIRECT_URL requerida para introspección (db pull/push) — PgBouncer no la soporta
    url: process.env["DIRECT_URL"],
  },
});

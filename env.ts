import { z } from "zod";

const envSchema = z.object({
	DATABASE_URL: z.string(),
});

envSchema.parse(process.env);

declare module "bun" {
	interface Env extends z.infer<typeof envSchema> {}
}

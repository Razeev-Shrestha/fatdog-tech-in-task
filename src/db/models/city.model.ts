import { relations } from "drizzle-orm";
import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";
import { users } from "./users.model";

/**
 * Table
 */
export const cities = pgTable("cities", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name").notNull().unique(),
	createdAt: timestamp("created_at", {
		mode: "date",
		precision: 6,
		withTimezone: true,
	})
		.notNull()
		.defaultNow(),
	updatedAt: timestamp("updated_at", {
		mode: "date",
		precision: 6,
		withTimezone: true,
	})
		.notNull()
		.$onUpdateFn(() => new Date()),
});

/**
 * Schema
 */

export const insertCitySchema = createInsertSchema(cities);

export const selectCitySchema = createSelectSchema(cities);

/**
 * Type
 */

export type InsertCity = z.infer<typeof insertCitySchema>;

export type SelectCity = z.infer<typeof selectCitySchema>;

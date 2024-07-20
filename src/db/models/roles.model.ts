import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";

/**
 *Table
 */
export const roles = pgTable("roles", {
	id: serial("id").primaryKey().notNull(),
	title: varchar("title", { length: 50 }).notNull(),
	description: varchar("description", { length: 256 }).notNull(),
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
export const insertRoleSchema = createInsertSchema(roles);

export const selectRoleSchema = createSelectSchema(roles);

/**
 * Type
 */

export type InsertRole = z.infer<typeof insertRoleSchema>;

export type SelectRole = z.infer<typeof selectRoleSchema>;

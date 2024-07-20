import {
	integer,
	pgTable,
	serial,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";
import { roles } from "./roles.model";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";
import { relations } from "drizzle-orm";

/**
 * Table
 */
export const users = pgTable("users", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 128 }).notNull(),
	roleId: integer("role_id")
		.notNull()
		.references(() => roles.id, { onDelete: "cascade" }),
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

export const insertUserSchema = createInsertSchema(users);

export const selectUserSchema = createSelectSchema(users);

/**
 * Type
 */

export type InsertUser = z.infer<typeof insertUserSchema>;

export type SelectUser = z.infer<typeof selectUserSchema>;

/**
 * Relations
 */

export const userRelations = relations(users, ({ one }) => ({
	role: one(roles, { references: [roles.id], fields: [users.roleId] }),
}));

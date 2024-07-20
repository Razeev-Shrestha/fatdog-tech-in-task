import { integer, pgTable, primaryKey, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users.model";
import { cities } from "./city.model";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";
import { relations } from "drizzle-orm";

/**
 * Table
 */
export const usersToCities = pgTable(
	"users_to_cities",
	{
		userId: integer("user_id")
			.notNull()
			.references(() => users.id, {
				onDelete: "cascade",
			}),
		cityId: integer("city_id")
			.notNull()
			.references(() => cities.id, {
				onDelete: "cascade",
			}),
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
	},
	(t) => ({
		pk: primaryKey({
			columns: [t.userId, t.cityId],
		}),
	}),
);

/**
 * Schema
 */

export const insertUsersToCitiesSchema = createInsertSchema(usersToCities);

export const selectUsersToCitiesSchema = createSelectSchema(usersToCities);

/**
 * Type
 */

export type InsertUsersToCities = z.infer<typeof insertUsersToCitiesSchema>;

export type SelectUsersToCities = z.infer<typeof selectUsersToCitiesSchema>;

/**
 * Relations
 */

export const usersToCitiesRelations = relations(usersToCities, ({ one }) => ({
	user: one(users, { references: [users.id], fields: [usersToCities.userId] }),
	city: one(cities, {
		references: [cities.id],
		fields: [usersToCities.cityId],
	}),
}));

import { db } from "@/db";
import {
	type InsertUser,
	type InsertUsersToCities,
	users,
	usersToCities,
} from "@/db/models";
import { and, eq } from "drizzle-orm";

export const getUsers = async () => {
	return db.query.users.findMany({
		columns: { roleId: false },
		with: {
			role: {
				columns: { id: true, title: true },
			},
		},
	});
};

export const getUserByName = async (name: string) => {
	return db.select().from(users).where(eq(users.name, name));
};

export const createUser = async (data: InsertUser) => {
	return db.insert(users).values(data).returning();
};

export const updateUser = async (id: number, data: Partial<InsertUser>) => {
	return db.update(users).set(data).where(eq(users.id, id)).returning();
};

export const deleteUser = async (id: number) => {
	return db.delete(users).where(eq(users.id, id)).returning();
};

export const addUsersToCity = (body: InsertUsersToCities) => {
	return db.insert(usersToCities).values(body).returning();
};

export const deleteUserFromCity = async (userId: number, cityId: number) => {
	return db
		.delete(usersToCities)
		.where(
			and(eq(usersToCities.userId, userId), eq(usersToCities.cityId, cityId)),
		)
		.returning();
};

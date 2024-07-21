import { db } from "@/db";
import { type InsertRole, roles } from "@/db/models";

export const getRoles = async () => {
	return db.query.roles.findMany();
};

export const createRole = async (data: InsertRole) => {
	return db.insert(roles).values(data).returning();
};

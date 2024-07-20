import { db } from "@/db";
import {
	cities,
	roles,
	users,
	usersToCities,
	type InsertCity,
} from "@/db/models";
import { eq, sql } from "drizzle-orm";

export const getCities = async () => {
	return db.query.cities.findMany();
};

export const getCityByName = async (name: string) => {
	return db.select().from(cities).where(eq(cities.name, name));
};

export const createCity = async (data: InsertCity) => {
	return db.insert(cities).values(data).returning();
};

export const updateCity = async (id: number, data: Partial<InsertCity>) => {
	return db.update(cities).set(data).where(eq(cities.id, id)).returning();
};

export const deleteCity = async (id: number) => {
	return db.delete(cities).where(eq(cities.id, id)).returning();
};

export const getCitiesWithUsers = async () => {
	return db.execute(sql`
			SELECT c.id,c.name,r.id AS role_id,r.title,u.id AS user_id,u.name AS user_name FROM ${usersToCities} uc
			LEFT JOIN ${cities} c ON uc.city_id =c.id
			LEFT JOIN ${users} u ON uc.user_id = u.id
			LEFT JOIN ${roles} r ON u.role_id = r.id			
		
		`);
};

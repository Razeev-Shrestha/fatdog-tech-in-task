import { db } from '@/db'
import { cities, roles, users, usersToCities, type InsertCity } from '@/db/models'
import { eq, sql } from 'drizzle-orm'

export const getCities = async () => {
	return db.query.cities.findMany()
}

export const getCityByName = async (name: string) => {
	return db.select().from(cities).where(eq(cities.name, name))
}

export const createCity = async (data: InsertCity) => {
	return db.insert(cities).values(data).returning()
}

export const updateCity = async (id: number, data: Partial<InsertCity>) => {
	return db.update(cities).set(data).where(eq(cities.id, id)).returning()
}

export const deleteCity = async (id: number) => {
	return db.delete(cities).where(eq(cities.id, id)).returning()
}

export const getCitiesWithUsers = async () => {
	return db.execute(sql`
		SELECT c.*,r.title,u.name as user_name,u.id as user_id,u.role_id FROM ${cities} c 
		LEFT JOIN ${usersToCities} uc ON c.id = uc.city_id
		LEFT JOIN ${users} u ON uc.user_id = u.id
		LEFT JOIN ${roles} r ON u.role_id = r.id
		`)
}

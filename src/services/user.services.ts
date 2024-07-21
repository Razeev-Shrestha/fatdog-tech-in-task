import { db } from '@/db'
import { type InsertUser, type InsertUsersToCities, roles, users, usersToCities } from '@/db/models'
import { and, eq, sql } from 'drizzle-orm'

export const getUsers = async () => {
	// return db.query.users.findMany({
	// 	columns: { roleId: false },
	// 	with: {
	// 		role: {
	// 			columns: { id: true, title: true },
	// 		},
	// 	},
	// });

	return db.execute(sql`
		SELECT u.*,r.title FROM ${users} u 
		LEFT JOIN ${usersToCities} uc ON u.id = uc.user_id
		LEFT JOIN ${roles} r ON u.role_id = r.id
		WHERE uc.user_id IS NULL
		`)
}

export const getUserByName = async (name: string) => {
	return db.select().from(users).where(eq(users.name, name))
}

export const createUser = async (data: InsertUser) => {
	return db.insert(users).values(data).returning()
}

export const updateUser = async (id: number, data: Partial<InsertUser>) => {
	return db.update(users).set(data).where(eq(users.id, id)).returning()
}

export const deleteUser = async (id: number) => {
	return db.delete(users).where(eq(users.id, id)).returning()
}

export const addUsersToCity = (body: InsertUsersToCities) => {
	return db.insert(usersToCities).values(body).returning()
}

export const deleteUserFromCity = async (userId: number, cityId: number) => {
	return db
		.delete(usersToCities)
		.where(and(eq(usersToCities.userId, userId), eq(usersToCities.cityId, cityId)))
		.returning()
}

import type { InsertCity } from '@/db/models'
import { createCity, getCitiesWithUsers, getCityByName } from '@/services'

import { type NextRequest, NextResponse } from 'next/server'

export const getCitiesController = async () => {
	try {
		const response = await getCitiesWithUsers()

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const city = response.rows.reduce((acc: any, item: any) => {
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			let city = acc.find((city: any) => city.id === item.id)
			if (!city) {
				city = {
					id: item.id,
					name: item.name,
					users: [],
				}
				acc.push(city)
			}
			if (item.user_id) {
				city.users.push({
					id: item.user_id,
					name: item.user_name,
					role: {
						id: item.role_id,
						title: item.title,
					},
				})
			}

			return acc
		}, [])

		return NextResponse.json(
			{
				payload: city,
				message: 'Cities fetched successfully.',
				success: true,
			},
			{ status: 200 }
		)
	} catch (err) {
		console.error(err)
		return NextResponse.json({ payload: null, message: 'Internal server error.', success: false }, { status: 500 })
	}
}

export const createCityController = async (req: NextRequest) => {
	try {
		const body = (await req.json()) as InsertCity

		const { name } = body

		const result = await getCityByName(name)

		if (result.length > 0) {
			return NextResponse.json({ payload: null, message: 'City already exists.', success: false }, { status: 400 })
		}

		const city = await createCity(body)

		return NextResponse.json(
			{
				payload: city,
				message: 'City created successfully.',
				success: true,
			},
			{ status: 201 }
		)
	} catch (err) {
		console.error(err)
		return NextResponse.json({ payload: null, message: 'Internal server error.', success: false }, { status: 500 })
	}
}

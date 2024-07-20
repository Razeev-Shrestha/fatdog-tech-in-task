import type { InsertUser, InsertUsersToCities } from "@/db/models";
import { getParams } from "@/lib/getParams";
import {
	addUsersToCity,
	createUser,
	deleteUser,
	deleteUserFromCity,
	getUserByName,
	getUsers,
} from "@/services";
import { type NextRequest, NextResponse } from "next/server";

export const getUsersController = async () => {
	try {
		const users = await getUsers();

		return NextResponse.json(
			{ payload: users, message: "Users fetched successfully.", success: true },
			{ status: 200 },
		);
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{ payload: null, message: "Internal server error.", success: false },
			{ status: 500 },
		);
	}
};

export const createUserController = async (req: NextRequest) => {
	try {
		const body = (await req.json()) as InsertUser;

		const result = await getUserByName(body.name);

		if (result.length > 0) {
			return NextResponse.json(
				{ payload: null, message: "User already exists.", success: false },
				{ status: 400 },
			);
		}

		const user = await createUser(body);

		return NextResponse.json(
			{ payload: user, message: "User created successfully.", success: true },
			{ status: 201 },
		);
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{ payload: null, message: "Internal server error.", success: false },
			{ status: 500 },
		);
	}
};

export const deleteUserController = async (req: NextRequest) => {
	try {
		const { id } = getParams(req.url);
		const user = await deleteUser(id);

		return NextResponse.json(
			{ payload: user, message: "User deleted successfully.", success: true },
			{ status: 200 },
		);
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{ payload: null, message: "Internal server error.", success: false },
			{ status: 500 },
		);
	}
};

export const createUserByCityController = async (req: NextRequest) => {
	try {
		const body = (await req.json()) as { user: InsertUser; cityId: number };

		const result = await getUserByName(body.user.name);

		if (result.length > 0) {
			return NextResponse.json(
				{ payload: null, message: "User already exists.", success: false },
				{ status: 400 },
			);
		}

		const user = await createUser(body.user);

		await addUsersToCity({
			userId: user[0].id,
			cityId: body.cityId,
		});

		return NextResponse.json(
			{
				payload: { user: body.user, city: { id: body.cityId } },
				message: "User created successfully.",
				success: true,
			},
			{ status: 201 },
		);
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{ payload: null, message: "Internal server error.", success: false },
			{ status: 500 },
		);
	}
};

export const addUsersToCityController = async (req: NextRequest) => {
	try {
		const body = (await req.json()) as InsertUsersToCities;

		await addUsersToCity(body);

		return NextResponse.json(
			{
				payload: null,
				message: "User added to city successfully.",
				success: true,
			},
			{ status: 200 },
		);
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{ payload: null, message: "Internal server error.", success: false },
			{ status: 500 },
		);
	}
};

export const deleteUserFromCityController = async (req: NextRequest) => {
	try {
		const { userId, cityId } = await req.json();

		await deleteUserFromCity(userId, cityId);

		return NextResponse.json(
			{
				payload: null,
				message: "User deleted from city successfully.",
				success: true,
			},
			{ status: 200 },
		);
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{ payload: null, message: "Internal server error.", success: false },
			{ status: 500 },
		);
	}
};

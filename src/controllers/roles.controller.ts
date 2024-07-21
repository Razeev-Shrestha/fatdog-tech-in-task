import type { InsertRole } from "@/db/models";
import { createRole, getRoles } from "@/services";
import { type NextRequest, NextResponse } from "next/server";

export const getRolesController = async () => {
	try {
		const roles = await getRoles();

		return NextResponse.json(
			{ payload: roles, message: "Roles fetched successfully.", success: true },
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

export const createRoleController = async (req: NextRequest) => {
	try {
		const body = (await req.json()) as InsertRole;

		const role = await createRole(body);

		return NextResponse.json(
			{ payload: role, message: "Role created successfully.", success: true },
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

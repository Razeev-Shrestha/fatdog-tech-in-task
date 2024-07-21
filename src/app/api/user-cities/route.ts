import {
	addUsersToCityController,
	createUserByCityController,
	deleteUserFromCityController,
} from "@/controllers";

export const POST = createUserByCityController;

export const DELETE = deleteUserFromCityController;

export const PUT = addUsersToCityController;

import type { InsertUser, SelectCity, SelectRole, SelectUser } from '@/db/models'
import { fetcher, mutator } from '@/lib/api-handlers'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { CreateUserByCityType } from '../_schema'

export type ApiResponseType<T> = {
	success: boolean
	message: string
	payload: T
}

export type UserCities = {
	id: number
	name: string
	users: {
		id: number
		name: string
		role: {
			id: number
			title: string
		}
	}[]
}

export const useGetUsers = () => {
	return useQuery<ApiResponseType<SelectUser[]>>({
		queryKey: ['users'],
		queryFn: async () => await fetcher({ url: '/users' }),
	})
}

export const useGetRoles = () => {
	return useQuery<ApiResponseType<SelectRole[]>>({
		queryKey: ['roles'],
		queryFn: async () => await fetcher({ url: '/roles' }),
	})
}

export const useGetCities = () => {
	return useQuery<ApiResponseType<SelectCity[]>>({
		queryKey: ['cities'],
		queryFn: async () => await fetcher({ url: '/cities' }),
	})
}

export const useGetUsersByCity = () => {
	return useQuery<ApiResponseType<UserCities[]>>({
		queryKey: ['users-by-cities'],
		queryFn: async () => await fetcher({ url: '/cities' }),
	})
}

export const useCreateUser = () => {
	return useMutation<ApiResponseType<unknown>, unknown, InsertUser>({
		mutationKey: ['create-user'],
		mutationFn: async data => await mutator({ url: '/users', method: 'POST', payload: data }),
	})
}

export const useCreateUserByCity = () => {
	return useMutation<ApiResponseType<unknown>, unknown, CreateUserByCityType>({
		mutationKey: ['create-user-by-city'],
		mutationFn: async data => await mutator({ url: '/user-cities', method: 'POST', payload: data }),
	})
}

export const useAddUserToCity = () => {
	return useMutation<ApiResponseType<unknown>, unknown, { userId: number; cityId: number }>({
		mutationKey: ['add-user-to-city'],
		mutationFn: async data => await mutator({ url: '/user-cities', method: 'PUT', payload: data }),
	})
}

export const useDeleteUserFromCity = () => {
	return useMutation<ApiResponseType<unknown>, unknown, { userId: number; cityId: number }>({
		mutationKey: ['delete-user-from-city'],
		mutationFn: async data => await mutator({ url: '/user-cities', method: 'DELETE', payload: data }),
	})
}

export const useDeleteUser = () => {
	return useMutation<ApiResponseType<unknown>, unknown, { id: number }>({
		mutationKey: ['delete-user'],
		mutationFn: async ({ id }) => await mutator({ url: `/users/${id}`, method: 'DELETE', payload: null }),
	})
}

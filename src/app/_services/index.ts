import type { InsertUser, SelectCity, SelectRole, SelectUser } from '@/db/models'
import { fetcher, mutator } from '@/lib/api-handlers'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { CreateUserByCityType } from '../_schema'

type ApiResponseType<T> = {
	success: boolean
	message: string
	payload: T
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

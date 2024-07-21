import { FormSelect } from '@/components/forms/form-select'
import { useGetCities, useGetRoles } from '../_services'
import type { InsertUser } from '@/db/models'
import { useMemo } from 'react'
import type { CreateUserByCityType } from '../_schema'

export const SelectRole = () => {
	const { data } = useGetRoles()

	const options = useMemo(() => {
		if (!data) return []
		return data.payload.map(role => ({
			label: role.title,
			value: role.id,
		}))
	}, [data])

	return <FormSelect<InsertUser> name='roleId' label='Role' placeHolder='Select Role' options={options} isRequired />
}

export const SelectCity = () => {
	const { data } = useGetCities()

	const options = useMemo(() => {
		if (!data) return []
		return data.payload.map(city => ({
			label: city.name,
			value: city.id,
		}))
	}, [data])

	return (
		<FormSelect<CreateUserByCityType>
			name='cityId'
			label='City'
			placeHolder='Select City'
			options={options}
			isRequired
		/>
	)
}

export const SelectRoleForUser = () => {
	const { data } = useGetRoles()

	const options = useMemo(() => {
		if (!data) return []
		return data.payload.map(role => ({
			label: role.title,
			value: role.id,
		}))
	}, [data])

	return (
		<FormSelect<CreateUserByCityType>
			name='user.roleId'
			label='Role'
			placeHolder='Select Role'
			options={options}
			isRequired
		/>
	)
}

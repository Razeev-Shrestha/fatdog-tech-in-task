import { type FieldValues, useForm as useRHF, type UseFormProps } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ZodEffects, ZodObject, ZodRawShape, ZodTypeAny } from 'zod'

export const useForm = <T extends FieldValues>(
	options: Omit<UseFormProps<T>, 'resolver'>,
	resolverSchema: ZodTypeAny | ZodObject<ZodRawShape> | ZodEffects<ZodObject<ZodRawShape>>
) => useRHF<T>({ ...options, resolver: zodResolver(resolverSchema) })

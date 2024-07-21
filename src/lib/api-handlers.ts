interface ApiProps extends RequestInit {
	url: string
}

export const fetcher = async <T>({ url, ...props }: ApiProps): Promise<T> => {
	try {
		const response = await fetch(`/api${url}`, { method: 'GET', ...props })

		if (!response.ok) {
			throw new Error('An error occurred while fetching data.')
		}

		return (await response.json()) as T
	} catch (err) {
		if (err instanceof Error) throw new Error(err.message, { cause: err.cause })
		throw new Error('An error occurred while fetching data.')
	}
}

interface MutatorProps<T> extends ApiProps {
	payload: T
}

export const mutator = async <PayloadType, ResponseType>({
	url,
	payload,
	...props
}: MutatorProps<PayloadType>): Promise<ResponseType> => {
	try {
		const response = await fetch(`/api${url}`, {
			body: JSON.stringify(payload),
			headers: {
				'Content-Type': 'application/json',
				accept: 'application/json',
				...props.headers,
			},
			...props,
		})

		if (!response.ok) {
			throw new Error('An error occurred.')
		}

		return (await response.json()) as ResponseType
	} catch (err) {
		if (err instanceof Error) throw new Error(err.message, { cause: err.cause })
		throw new Error('An error occurred.')
	}
}
